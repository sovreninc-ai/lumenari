"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Copy,
  Loader2,
  Plus,
  Trash2,
  X,
  AlertTriangle,
} from "lucide-react";

interface ApiKey {
  id: string;
  name: string;
  key_prefix: string;
  last_used_at: string | null;
  created_at: string;
  revoked_at: string | null;
}

interface ApiKeysManagerProps {
  accountId: string;
  accessToken: string;
  initialKeys: ApiKey[];
}

export function ApiKeysManager({
  accountId,
  accessToken,
  initialKeys,
}: ApiKeysManagerProps) {
  const [keys, setKeys] = useState<ApiKey[]>(initialKeys);
  const [showCreate, setShowCreate] = useState(false);
  const [newKeyName, setNewKeyName] = useState("Production");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [revealedKey, setRevealedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [revoking, setRevoking] = useState<string | null>(null);
  const [confirmRevoke, setConfirmRevoke] = useState<string | null>(null);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(t);
  }, [copied]);

  async function createKey() {
    setCreating(true);
    setCreateError(null);
    try {
      const res = await fetch("/api/account/api-keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          account_id: accountId,
          access_token: accessToken,
          name: newKeyName.trim() || "Untitled",
        }),
      });
      const data = (await res.json()) as {
        error?: string;
        id?: string;
        name?: string;
        key_prefix?: string;
        created_at?: string;
        key?: string;
      };
      if (!res.ok || !data.key) {
        throw new Error(data.error ?? "Could not create key");
      }
      setRevealedKey(data.key);
      setKeys((prev) => [
        {
          id: data.id!,
          name: data.name!,
          key_prefix: data.key_prefix!,
          last_used_at: null,
          created_at: data.created_at!,
          revoked_at: null,
        },
        ...prev,
      ]);
      setShowCreate(false);
      setNewKeyName("Production");
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setCreating(false);
    }
  }

  async function revokeKey(id: string) {
    setRevoking(id);
    try {
      const res = await fetch(
        `/api/account/api-keys/${id}?a=${accountId}&t=${accessToken}`,
        { method: "DELETE" },
      );
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error ?? "Could not revoke key");
      }
      setKeys((prev) =>
        prev.map((k) =>
          k.id === id ? { ...k, revoked_at: new Date().toISOString() } : k,
        ),
      );
      setConfirmRevoke(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setRevoking(null);
    }
  }

  async function copyKey() {
    if (!revealedKey) return;
    try {
      await navigator.clipboard.writeText(revealedKey);
      setCopied(true);
    } catch {
      // Older browsers — surface a manual select.
    }
  }

  const activeKeys = keys.filter((k) => !k.revoked_at);
  const revokedKeys = keys.filter((k) => k.revoked_at);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold">API keys</h2>
        <button
          onClick={() => setShowCreate(true)}
          className="inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] text-white px-4 py-2 text-sm font-medium hover:bg-black transition-colors"
        >
          <Plus className="w-4 h-4" />
          Generate new key
        </button>
      </div>

      {activeKeys.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-[var(--muted)] mb-4">
            No keys yet. Create one to start calling the API.
          </p>
          <button
            onClick={() => setShowCreate(true)}
            className="btn-primary"
          >
            <Plus className="w-4 h-4" />
            Generate your first key
          </button>
        </div>
      ) : (
        <ul className="space-y-3">
          {activeKeys.map((k) => (
            <li
              key={k.id}
              className="rounded-2xl border border-[var(--hairline)] bg-white p-4 sm:p-5 flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <p className="font-semibold truncate">{k.name}</p>
                <p className="text-sm text-[var(--muted)] font-mono truncate">
                  {k.key_prefix}…
                </p>
                <p className="text-xs text-[var(--muted)] mt-1">
                  Created {formatDate(k.created_at)}
                  {k.last_used_at
                    ? ` · last used ${formatDate(k.last_used_at)}`
                    : " · never used"}
                </p>
              </div>
              {confirmRevoke === k.id ? (
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => revokeKey(k.id)}
                    disabled={revoking === k.id}
                    className="inline-flex items-center gap-1.5 rounded-full bg-red-600 text-white px-3 py-1.5 text-xs font-semibold hover:bg-red-700 disabled:opacity-60"
                  >
                    {revoking === k.id ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Trash2 className="w-3 h-3" />
                    )}
                    Confirm revoke
                  </button>
                  <button
                    onClick={() => setConfirmRevoke(null)}
                    className="text-xs text-[var(--muted)] hover:text-[var(--foreground)]"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmRevoke(k.id)}
                  aria-label={`Revoke ${k.name}`}
                  className="text-[var(--muted)] hover:text-red-600 transition-colors p-2 -m-2"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {revokedKeys.length > 0 ? (
        <details className="mt-8">
          <summary className="text-sm text-[var(--muted)] cursor-pointer hover:text-[var(--foreground)]">
            Revoked keys ({revokedKeys.length})
          </summary>
          <ul className="mt-4 space-y-2">
            {revokedKeys.map((k) => (
              <li
                key={k.id}
                className="rounded-xl border border-[var(--hairline)] bg-[var(--surface)] p-3 px-4 text-sm flex items-center justify-between gap-3"
              >
                <span className="text-[var(--muted)] line-through truncate">
                  {k.name} · <span className="font-mono">{k.key_prefix}…</span>
                </span>
                <span className="text-xs text-[var(--muted)] flex-shrink-0">
                  Revoked {formatDate(k.revoked_at!)}
                </span>
              </li>
            ))}
          </ul>
        </details>
      ) : null}

      {/* Generate-key modal */}
      {showCreate ? (
        <Modal onClose={() => (creating ? undefined : setShowCreate(false))}>
          <h3 className="text-lg font-semibold mb-2">New API key</h3>
          <p className="text-sm text-[var(--muted)] mb-5">
            Give the key a name so you can recognize it later.
          </p>
          <label htmlFor="keyName" className="block text-sm font-medium mb-2">
            Name
          </label>
          <input
            id="keyName"
            type="text"
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
            maxLength={60}
            className="input"
            placeholder="Production"
          />
          {createError ? (
            <p className="mt-3 text-sm text-red-600" role="alert">
              {createError}
            </p>
          ) : null}
          <div className="mt-6 flex justify-end gap-2">
            <button
              onClick={() => setShowCreate(false)}
              disabled={creating}
              className="btn-ghost text-sm h-10 px-4"
            >
              Cancel
            </button>
            <button
              onClick={createKey}
              disabled={creating || newKeyName.trim().length === 0}
              className="btn-primary text-sm h-10 px-4 disabled:opacity-60"
            >
              {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {creating ? "Generating…" : "Generate key"}
            </button>
          </div>
        </Modal>
      ) : null}

      {/* Reveal-key modal — shown ONCE */}
      {revealedKey ? (
        <Modal onClose={() => setRevealedKey(null)}>
          <div className="flex items-start gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold">Save your key now.</h3>
              <p className="text-sm text-[var(--muted)] mt-1">
                This is the only time we&apos;ll show the full key. We store
                only a hash — we can&apos;t recover it for you.
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-[var(--hairline)] bg-[var(--surface)] p-4 mb-4">
            <code className="block font-mono text-sm break-all">
              {revealedKey}
            </code>
          </div>
          <div className="flex justify-between items-center">
            <button
              onClick={copyKey}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] bg-white px-4 py-2 text-sm font-medium hover:bg-[var(--surface)] transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-600" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy to clipboard
                </>
              )}
            </button>
            <button
              onClick={() => setRevealedKey(null)}
              className="btn-primary text-sm h-10 px-4"
            >
              I&apos;ve saved it
            </button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}

function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-white p-6 sm:p-7 shadow-2xl relative"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 text-[var(--muted)] hover:text-[var(--foreground)] p-2"
        >
          <X className="w-4 h-4" />
        </button>
        {children}
      </div>
    </div>
  );
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}
