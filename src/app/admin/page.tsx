import { redirect } from "next/navigation";
import Link from "next/link";
import { getAdminEmail } from "@/lib/admin-auth";
import { loadAdminStats } from "@/lib/admin-stats";
import { formatUSD } from "@/data/kits";
import { AdminLineChart, AdminBarChart } from "@/components/admin-charts";

/**
 * /admin — founder dashboard.
 *
 * Server-only page. Email must match `ADMIN_EMAIL` env or `admin_users`
 * table; otherwise redirect to /.
 *
 * Stats are queried server-side via `loadAdminStats()`. The /api/admin/stats
 * route is available for future async refresh.
 */

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = {
  title: "Lumenari — Founder dashboard",
  robots: "noindex, nofollow",
};

export default async function AdminPage() {
  const email = await getAdminEmail();
  if (!email) {
    redirect("/");
  }

  const stats = await loadAdminStats();
  const { kpis } = stats;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-12 space-y-10">
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <span className="eyebrow">Operator view</span>
          <h1 className="display text-3xl sm:text-4xl mt-2">
            Founder dashboard
          </h1>
          <p className="text-[var(--muted)] text-sm mt-1">
            Signed in as {email}
          </p>
        </div>
        <Link
          href="/kits"
          className="text-sm font-medium hover:text-[var(--accent-strong)]"
        >
          Back to storefront →
        </Link>
      </header>

      {/* KPI grid */}
      <section
        aria-label="Top metrics"
        className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4"
      >
        <KPI label="Today's revenue" value={formatUSD(kpis.revenueTodayCents)} />
        <KPI label="This month" value={formatUSD(kpis.revenueMonthCents)} />
        <KPI label="This year" value={formatUSD(kpis.revenueYearCents)} />
        <KPI label="Customers" value={kpis.totalCustomers.toLocaleString()} />
        <KPI label="Active Pro+" value={kpis.activeProPlus.toLocaleString()} />
        <KPI label="Pro+ MRR" value={formatUSD(kpis.proPlusMRRCents)} />
        <KPI label="Newsletter" value={kpis.newsletterListSize.toLocaleString()} />
        <KPI
          label="Conv. 30d"
          value={`${(kpis.conversionRate30d * 100).toFixed(1)}%`}
        />
        <KPI
          label="Pro+ churn 30d"
          value={`${(kpis.proChurnRate30d * 100).toFixed(1)}%`}
        />
      </section>

      {/* Charts */}
      <section
        aria-label="Trends"
        className="grid grid-cols-1 lg:grid-cols-2 gap-5"
      >
        <ChartCard title="Revenue — last 30 days">
          <AdminLineChart
            data={stats.revenueTrend30d.map((p) => ({
              x: p.date,
              y: p.cents / 100,
            }))}
            yLabel="USD"
          />
        </ChartCard>
        <ChartCard title="New customers — last 90 days">
          <AdminLineChart
            data={stats.customerTrend90d.map((p) => ({
              x: p.date,
              y: p.newCustomers,
            }))}
            yLabel="Customers"
          />
        </ChartCard>
        <ChartCard title="Top kits — 30 days (by sale count)" className="lg:col-span-2">
          <AdminBarChart
            data={stats.topKits30d.map((k) => ({
              label: k.name,
              value: k.saleCount,
              sublabel: formatUSD(k.revenueCents),
            }))}
          />
        </ChartCard>
      </section>

      {/* Tables */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <TableCard title="Top kits by revenue (30d)">
          <table className="w-full text-sm">
            <thead className="text-left text-[var(--muted)]">
              <tr>
                <th className="px-4 py-2 font-medium">Kit</th>
                <th className="px-4 py-2 font-medium text-right">Sales</th>
                <th className="px-4 py-2 font-medium text-right">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {stats.topKits30d.length === 0 ? (
                <tr>
                  <td className="px-4 py-3 text-[var(--muted)]" colSpan={3}>
                    No sales in the last 30 days.
                  </td>
                </tr>
              ) : null}
              {stats.topKits30d.map((k) => (
                <tr key={k.slug} className="border-t border-[var(--hairline)]">
                  <td className="px-4 py-2 truncate max-w-[18rem]">
                    {k.name}
                  </td>
                  <td className="px-4 py-2 text-right">{k.saleCount}</td>
                  <td className="px-4 py-2 text-right">
                    {formatUSD(k.revenueCents)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableCard>

        <TableCard title="Active Pro+ subscribers">
          <table className="w-full text-sm">
            <thead className="text-left text-[var(--muted)]">
              <tr>
                <th className="px-4 py-2 font-medium">Email</th>
                <th className="px-4 py-2 font-medium">Tier</th>
                <th className="px-4 py-2 font-medium text-right">MRR</th>
              </tr>
            </thead>
            <tbody>
              {stats.activePro.length === 0 ? (
                <tr>
                  <td className="px-4 py-3 text-[var(--muted)]" colSpan={3}>
                    No active Pro+ subscribers yet.
                  </td>
                </tr>
              ) : null}
              {stats.activePro.map((p) => (
                <tr
                  key={p.email + p.startedAt}
                  className="border-t border-[var(--hairline)]"
                >
                  <td className="px-4 py-2 truncate max-w-[14rem]">{p.email}</td>
                  <td className="px-4 py-2 capitalize">{p.tier}</td>
                  <td className="px-4 py-2 text-right">
                    {formatUSD(p.mrrCents)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableCard>

        <TableCard title="Recent purchases (25)">
          <table className="w-full text-sm">
            <thead className="text-left text-[var(--muted)]">
              <tr>
                <th className="px-4 py-2 font-medium">Email</th>
                <th className="px-4 py-2 font-medium">Kits</th>
                <th className="px-4 py-2 font-medium text-right">Amount</th>
                <th className="px-4 py-2 font-medium text-right">When</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentPurchases.length === 0 ? (
                <tr>
                  <td className="px-4 py-3 text-[var(--muted)]" colSpan={4}>
                    No purchases yet.
                  </td>
                </tr>
              ) : null}
              {stats.recentPurchases.map((p) => (
                <tr key={p.id} className="border-t border-[var(--hairline)]">
                  <td className="px-4 py-2 truncate max-w-[12rem]">{p.email}</td>
                  <td className="px-4 py-2 text-[var(--muted)]">
                    {p.kitIds.slice(0, 2).join(", ")}
                    {p.kitIds.length > 2 ? ` +${p.kitIds.length - 2}` : ""}
                  </td>
                  <td className="px-4 py-2 text-right">
                    {p.amountCents !== null ? formatUSD(p.amountCents) : "—"}
                  </td>
                  <td className="px-4 py-2 text-right text-[var(--muted)]">
                    {formatRelative(p.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableCard>

        <TableCard title="Recent newsletter signups (25)">
          <table className="w-full text-sm">
            <thead className="text-left text-[var(--muted)]">
              <tr>
                <th className="px-4 py-2 font-medium">Email</th>
                <th className="px-4 py-2 font-medium">Source</th>
                <th className="px-4 py-2 font-medium text-right">When</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentLeads.length === 0 ? (
                <tr>
                  <td className="px-4 py-3 text-[var(--muted)]" colSpan={3}>
                    No signups yet.
                  </td>
                </tr>
              ) : null}
              {stats.recentLeads.map((l) => (
                <tr
                  key={l.email + l.createdAt}
                  className="border-t border-[var(--hairline)]"
                >
                  <td className="px-4 py-2 truncate max-w-[14rem]">
                    {l.email}
                    {l.converted ? (
                      <span className="ml-2 inline-block px-1.5 py-0.5 rounded-full text-[10px] uppercase tracking-wide bg-emerald-100 text-emerald-700">
                        converted
                      </span>
                    ) : null}
                  </td>
                  <td className="px-4 py-2 text-[var(--muted)]">{l.source}</td>
                  <td className="px-4 py-2 text-right text-[var(--muted)]">
                    {formatRelative(l.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableCard>
      </section>
    </div>
  );
}

function KPI({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[var(--hairline)] bg-white p-4 sm:p-5">
      <p className="text-xs uppercase tracking-wide text-[var(--muted)] mb-1">
        {label}
      </p>
      <p className="text-xl sm:text-2xl font-semibold">{value}</p>
    </div>
  );
}

function ChartCard({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-[var(--hairline)] bg-white p-4 sm:p-5 ${className}`}
    >
      <h3 className="text-sm font-medium mb-3 text-[var(--muted)]">{title}</h3>
      {children}
    </div>
  );
}

function TableCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[var(--hairline)] bg-white overflow-hidden">
      <h3 className="text-sm font-medium px-4 py-3 border-b border-[var(--hairline)] text-[var(--muted)]">
        {title}
      </h3>
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}

function formatRelative(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  if (ms < 60_000) return "just now";
  const min = Math.round(ms / 60_000);
  if (min < 60) return `${min}m ago`;
  const hr = Math.round(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.round(hr / 24);
  if (day < 14) return `${day}d ago`;
  return new Date(iso).toLocaleDateString("en-CA");
}
