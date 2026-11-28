import { useAuth } from "../context/AuthContext.jsx";

const dashboardContent = {
  ADMIN: {
    title: "Clinic Overview",
    subtitle: "Here is what is happening at your clinic today.",
    stats: [
      ["Total Patients", "—", "Registered patient records", "♙"],
      ["Today's Appointments", "—", "Scheduled visits today", "▣"],
      ["Today's Revenue", "—", "Payments collected today", "₹"],
      ["Pending Payments", "—", "Outstanding balances", "◷"],
      ["Active Doctors", "—", "Doctors on the clinic roster", "♧"],
      ["Appointments Waiting", "—", "Patients awaiting consultation", "⌛"]
    ],
    panelTitle: "Clinic activity",
    panelText: "Recent patient registrations, appointment updates and billing activity will appear here when the modules are connected."
  },
  RECEPTIONIST: {
    title: "Reception Workspace",
    subtitle: "Manage today's patient visits and front-desk activities.",
    stats: [
      ["Today's Appointments", "—", "Scheduled visits", "▣"],
      ["Waiting Patients", "—", "Patients checked in", "⌛"],
      ["New Registrations", "—", "Patients registered today", "♙"],
      ["Payments Collected", "—", "Payments received today", "₹"]
    ],
    panelTitle: "Today's front-desk schedule",
    panelText: "Today's appointment list and patient check-in activity will appear here when the appointment module is connected."
  },
  DOCTOR: {
    title: "Clinical Workspace",
    subtitle: "Your appointments and patient care overview.",
    stats: [
      ["Today's Appointments", "—", "Your scheduled visits", "▣"],
      ["Waiting Patients", "—", "Checked-in patients", "⌛"],
      ["Completed Visits", "—", "Consultations completed today", "✓"],
      ["Follow-ups", "—", "Upcoming patient reviews", "◷"]
    ],
    panelTitle: "My appointment schedule",
    panelText: "Your daily appointments, patient records and follow-up list will appear here when those modules are connected."
  }
};

function DashboardHome() {
  const { auth } = useAuth();
  const content = dashboardContent[auth?.role] || dashboardContent.ADMIN;
  const displayName = auth?.fullName || auth?.username || "there";

  return (
    <div className="dashboard-home">
      <div className="page-heading">
        <div>
          <p className="eyebrow">DENTALCARE ERP / {auth?.role || "WORKSPACE"}</p>
          <h1>Good day, {displayName}</h1>
          <p>{content.subtitle}</p>
        </div>
        <div className="today-chip">Today <strong>{new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</strong></div>
      </div>

      <section className="stats-grid">
        {content.stats.map(([label, value, note, icon]) => (
          <article className="stat-card" key={label}>
            <div className="stat-top"><span>{label}</span><span className="stat-icon">{icon}</span></div>
            <strong className="stat-value">{value}</strong>
            <p>{note}</p>
          </article>
        ))}
      </section>

      <section className="dashboard-panels">
        <article className="content-panel main-panel">
          <div className="panel-heading"><div><h2>{content.panelTitle}</h2><p>Live information will be connected in the relevant module.</p></div><span className="panel-symbol">▤</span></div>
          <div className="empty-state"><span>▦</span><strong>No live data yet</strong><p>{content.panelText}</p></div>
        </article>
        <article className="content-panel quick-panel">
          <h2>Quick information</h2>
          <div className="quick-row"><span>Signed-in role</span><strong>{auth?.role}</strong></div>
          <div className="quick-row"><span>Account</span><strong>{displayName}</strong></div>
          <div className="quick-row"><span>Authentication</span><strong>JWT secured</strong></div>
        </article>
      </section>
    </div>
  );
}

export default DashboardHome;