(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/admin-charts.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AdminBarChart",
    ()=>AdminBarChart,
    "AdminLineChart",
    ()=>AdminLineChart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/chart.js/dist/chart.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$chartjs$2d$2$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-chartjs-2/dist/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Chart"].register(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["CategoryScale"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LinearScale"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["PointElement"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LineElement"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BarElement"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Title"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Tooltip"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Legend"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Filler"]);
const ACCENT = "#0f172a";
const ACCENT_FILL = "rgba(15, 23, 42, 0.06)";
const GRID = "rgba(15, 23, 42, 0.06)";
const TICK = "#64748b";
function lineOptions(yLabel) {
    return {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: "#ffffff",
                titleColor: "#0f172a",
                bodyColor: "#0f172a",
                borderColor: "#e5e7eb",
                borderWidth: 1,
                padding: 10,
                displayColors: false
            }
        },
        scales: {
            x: {
                ticks: {
                    color: TICK,
                    font: {
                        size: 11
                    },
                    maxRotation: 0
                },
                grid: {
                    display: false
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: TICK,
                    font: {
                        size: 11
                    }
                },
                grid: {
                    color: GRID
                },
                title: yLabel ? {
                    display: true,
                    text: yLabel,
                    color: TICK,
                    font: {
                        size: 11
                    }
                } : undefined
            }
        }
    };
}
function AdminLineChart({ data, yLabel }) {
    _s();
    const chartData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AdminLineChart.useMemo[chartData]": ()=>({
                labels: data.map({
                    "AdminLineChart.useMemo[chartData]": (d)=>d.x
                }["AdminLineChart.useMemo[chartData]"]),
                datasets: [
                    {
                        data: data.map({
                            "AdminLineChart.useMemo[chartData]": (d)=>d.y
                        }["AdminLineChart.useMemo[chartData]"]),
                        borderColor: ACCENT,
                        backgroundColor: ACCENT_FILL,
                        borderWidth: 2,
                        tension: 0.25,
                        fill: true,
                        pointRadius: 0,
                        pointHoverRadius: 4,
                        pointHoverBackgroundColor: ACCENT
                    }
                ]
            })
    }["AdminLineChart.useMemo[chartData]"], [
        data
    ]);
    if (data.length === 0) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Empty, {}, void 0, false, {
        fileName: "[project]/src/components/admin-charts.tsx",
        lineNumber: 116,
        columnNumber: 33
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "relative",
            height: 220,
            width: "100%"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$chartjs$2d$2$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
            data: chartData,
            options: lineOptions(yLabel)
        }, void 0, false, {
            fileName: "[project]/src/components/admin-charts.tsx",
            lineNumber: 119,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/admin-charts.tsx",
        lineNumber: 118,
        columnNumber: 5
    }, this);
}
_s(AdminLineChart, "i4eYYg6GOj65klTCDK4mhi4wfgw=");
_c = AdminLineChart;
function AdminBarChart({ data }) {
    _s1();
    const chartData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AdminBarChart.useMemo[chartData]": ()=>({
                labels: data.map({
                    "AdminBarChart.useMemo[chartData]": (d)=>d.label
                }["AdminBarChart.useMemo[chartData]"]),
                datasets: [
                    {
                        data: data.map({
                            "AdminBarChart.useMemo[chartData]": (d)=>d.value
                        }["AdminBarChart.useMemo[chartData]"]),
                        backgroundColor: ACCENT,
                        borderRadius: 6,
                        maxBarThickness: 36
                    }
                ]
            })
    }["AdminBarChart.useMemo[chartData]"], [
        data
    ]);
    const barOpts = {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        indexAxis: "y",
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: "#ffffff",
                titleColor: "#0f172a",
                bodyColor: "#0f172a",
                borderColor: "#e5e7eb",
                borderWidth: 1,
                padding: 10,
                displayColors: false
            }
        },
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    color: TICK,
                    font: {
                        size: 11
                    }
                },
                grid: {
                    color: GRID
                }
            },
            y: {
                ticks: {
                    color: TICK,
                    font: {
                        size: 11
                    }
                },
                grid: {
                    display: false
                }
            }
        }
    };
    if (data.length === 0) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Empty, {}, void 0, false, {
        fileName: "[project]/src/components/admin-charts.tsx",
        lineNumber: 170,
        columnNumber: 33
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "relative",
            height: 240,
            width: "100%"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$chartjs$2d$2$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
            data: chartData,
            options: barOpts
        }, void 0, false, {
            fileName: "[project]/src/components/admin-charts.tsx",
            lineNumber: 173,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/admin-charts.tsx",
        lineNumber: 172,
        columnNumber: 5
    }, this);
}
_s1(AdminBarChart, "i4eYYg6GOj65klTCDK4mhi4wfgw=");
_c1 = AdminBarChart;
function Empty() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-[180px] flex items-center justify-center text-[var(--muted)] text-sm",
        children: "No data yet."
    }, void 0, false, {
        fileName: "[project]/src/components/admin-charts.tsx",
        lineNumber: 180,
        columnNumber: 5
    }, this);
}
_c2 = Empty;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "AdminLineChart");
__turbopack_context__.k.register(_c1, "AdminBarChart");
__turbopack_context__.k.register(_c2, "Empty");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_admin-charts_tsx_0ktfcdg._.js.map