import { Redis } from "@upstash/redis";

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN,
});

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminDashboard({ searchParams }) {
    const { key } = searchParams;
    const validKey = process.env.ADMIN_PASSWORD || "admin123";

    // Simple Security Check
    if (key !== validKey) {
        return (
            <div style={{ background: "#080810", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, sans-serif" }}>
                <div style={{ textAlign: "center", background: "#0F0F1A", padding: "40px", borderRadius: "16px", border: "1px solid rgba(239, 68, 68, 0.2)" }}>
                    <h1 style={{ color: "#EF4444", fontSize: "24px", marginBottom: "10px" }}>⛔ Access Denied</h1>
                    <p style={{ color: "rgba(237, 237, 245, 0.52)" }}>Unauthorized access. Please provide the correct admin key.</p>
                </div>
            </div>
        );
    }

    // Fetch Data
    const userEmails = await redis.zrange("users:index", 0, -1, { rev: true });
    let users = [];
    if (userEmails.length > 0) {
        const pipeline = redis.pipeline();
        userEmails.forEach((e) => pipeline.get(`profile:${e}`));
        const results = await pipeline.exec();
        users = results.map(u => typeof u === "string" ? JSON.parse(u) : u).filter(Boolean);
    }

    // Metrics
    const total = users.length;
    const verifiedCount = users.filter((u) => u.verified).length;
    const pendingCount = total - verifiedCount;
    const convRate = total > 0 ? ((verifiedCount / total) * 100).toFixed(1) : "0.0";
    const totalRevenueStr = await redis.get("revenue:total");
    const totalRevenue = totalRevenueStr ? parseFloat(totalRevenueStr).toFixed(2) : "0.00";

    return (
        <div style={{ background: "#080810", minHeight: "100vh", color: "#EDEDF5", fontFamily: "Inter, sans-serif", padding: "40px 20px" }}>
            <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", paddingBottom: "20px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "linear-gradient(135deg, #F5B800, #D97706)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>
                            👑
                        </div>
                        <div>
                            <h1 style={{ fontSize: "24px", margin: 0, fontWeight: 800 }}>Admin Dashboard</h1>
                            <p style={{ color: "rgba(237, 237, 245, 0.52)", fontSize: "14px", margin: "4px 0 0 0" }}>Live Player Acquisition & Verification Metrics</p>
                        </div>
                    </div>
                    <a href="/" style={{ color: "rgba(237, 237, 245, 0.52)", textDecoration: "none", fontSize: "14px", border: "1px solid rgba(255,255,255,0.1)", padding: "8px 16px", borderRadius: "8px" }}>
                        View Live Site ↗
                    </a>
                </div>

                {/* Top Metric Cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "40px" }}>
                    <Card title="Total Earned" value={`$${totalRevenue}`} color="#F43F5E" />
                    <Card title="Total Signups" value={total} color="#60A5FA" />
                    <Card title="Verified Users" value={verifiedCount} color="#22C55E" />
                    <Card title="Conversion Rate" value={`${convRate}%`} color="#A78BFA" />
                </div>

                {/* Data Table */}
                <div style={{ background: "#0F0F1A", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", overflow: "hidden" }}>
                    <div style={{ padding: "20px", borderBottom: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between" }}>
                        <h2 style={{ fontSize: "18px", margin: 0, fontWeight: 700 }}>Recent Signups</h2>
                        <div style={{ fontSize: "12px", color: "rgba(237, 237, 245, 0.52)", display: "flex", alignItems: "center", gap: "6px" }}>
                            <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: "#22C55E", boxShadow: "0 0 8px #22C55E" }}></span>
                            Live Feed
                        </div>
                    </div>
                    <div style={{ overflowX: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                            <thead style={{ background: "#141422", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                                <tr>
                                    <Th>Player</Th>
                                    <Th>Email & Offer</Th>
                                    <Th>Joined</Th>
                                    <Th>Status & Payout</Th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} style={{ padding: "40px", textAlign: "center", color: "rgba(237, 237, 245, 0.52)" }}>
                                            No signups yet. Start sending traffic!
                                        </td>
                                    </tr>
                                ) : (
                                    users.map((user, i) => (
                                        <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                                            <Td>
                                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>
                                                        {getFlag(user.country)}
                                                    </div>
                                                    <div>
                                                        <div style={{ fontWeight: 600, fontSize: "14px" }}>{user.fname} {user.lname}</div>
                                                    </div>
                                                </div>
                                            </Td>
                                            <Td style={{ color: "rgba(237, 237, 245, 0.52)", fontSize: "14px" }}>
                                                <div style={{ marginBottom: "6px" }}>{user.email}</div>
                                                <div style={{ fontSize: "11px", color: "rgba(237, 237, 245, 0.3)", maxWidth: "200px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                                    {user.completedOffer ? `Completed: ${user.completedOffer}` : "No offer recorded"}
                                                </div>
                                            </Td>
                                            <Td style={{ color: "rgba(237, 237, 245, 0.52)", fontSize: "12px" }}>
                                                {new Date(user.timestamp).toLocaleString()}
                                            </Td>
                                            <Td>
                                                {user.verified ? (
                                                    <div>
                                                        <span style={{ background: "rgba(34, 197, 94, 0.1)", color: "#22C55E", border: "1px solid rgba(34, 197, 94, 0.2)", padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", display: "inline-block", marginBottom: "6px" }}>
                                                            ✓ Verified
                                                        </span>
                                                        {user.payout > 0 && (
                                                            <div style={{ fontSize: "12px", color: "#F43F5E", fontWeight: 700, marginLeft: "4px" }}>
                                                                + ${parseFloat(user.payout).toFixed(2)}
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <span style={{ background: "rgba(245, 184, 0, 0.1)", color: "#F5B800", border: "1px solid rgba(245, 184, 0, 0.2)", padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>
                                                        ⏳ Pending
                                                    </span>
                                                )}
                                            </Td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}

// Helpers
function Card({ title, value, color }) {
    return (
        <div style={{ background: "#0F0F1A", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "14px", padding: "20px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "4px", background: color }}></div>
            <div style={{ fontSize: "13px", color: "rgba(237, 237, 245, 0.52)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>{title}</div>
            <div style={{ fontSize: "36px", fontWeight: 800, color: "#EDEDF5" }}>{value}</div>
        </div>
    );
}

function Th({ children }) {
    return <th style={{ padding: "16px 20px", color: "rgba(237, 237, 245, 0.52)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600 }}>{children}</th>;
}

function Td({ children, style = {} }) {
    return <td style={{ padding: "16px 20px", ...style }}>{children}</td>;
}

function getFlag(countryCode) {
    const flags = { US: "🇺🇸", GB: "🇬🇧", CA: "🇨🇦", AU: "🇦🇺", NZ: "🇳🇿", IE: "🇮🇪" };
    return flags[countryCode] || "🌍";
}
