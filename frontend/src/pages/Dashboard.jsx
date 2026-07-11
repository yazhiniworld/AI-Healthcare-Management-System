import { useMemo, useState } from "react";
import {
	FaUserInjured,
	FaUserMd,
	FaCalendarCheck,
	FaClock,
	FaHeartbeat,
	FaClipboardList,
	FaBell,
	FaPlus,
	FaChartLine,
} from "react-icons/fa";
import "./Dashboard.css";

const statsData = [
	{ label: "Total Patients", value: "1,284", icon: FaUserInjured, accent: "#36b4ff" },
	{ label: "Total Doctors", value: "86", icon: FaUserMd, accent: "#4f46e5" },
	{ label: "Appointments", value: "482", icon: FaCalendarCheck, accent: "#0ea5e9" },
	{ label: "Pending", value: "38", icon: FaClock, accent: "#f97316" },
];

const quickActions = [
	{ title: "Schedule Check-In", icon: FaClipboardList },
	{ title: "Add Patient", icon: FaUserInjured },
	{ title: "New Appointment", icon: FaCalendarCheck },
	{ title: "Review Labs", icon: FaHeartbeat },
];

const recentActivity = [
	{ label: "Follow-up set", detail: "Patient Ana K. booked for 28 June", time: "2h ago" },
	{ label: "New doctor added", detail: "Dr. Patel joined Cardiology team", time: "5h ago" },
	{ label: "Appointment confirmed", detail: "John M. appointment confirmed", time: "1d ago" },
	{ label: "Patient discharged", detail: "Patient Lila S. discharged with summary", time: "2d ago" },
];

function Dashboard() {
	const [activeFilter, setActiveFilter] = useState("Weekly");
	const filteredActivity = useMemo(
		() => recentActivity.filter((item) => item.label.toLowerCase().includes(activeFilter.toLowerCase())),
		[activeFilter]
	);

	return (
		<div className="dashboard-page">
			<section className="dashboard-hero glass-card">
				<div className="hero-copy">
					<p className="eyebrow">HealthPlus AI Dashboard</p>
					<h1>Welcome back, clinician.</h1>
					<p className="hero-text">
						Your hospital operations are secure, optimized, and ready for the day.
					</p>
				</div>
				<div className="hero-metrics">
					<div className="hero-metric-card">
						<p>Patient Satisfaction</p>
						<h2>94.3%</h2>
						<span className="metric-chip success">+3.8%</span>
					</div>
					<div className="hero-metric-card soft">
						<p>AI Accuracy</p>
						<h2>98.1%</h2>
						<span className="metric-chip neutral">Stable</span>
					</div>
				</div>
			</section>

			<section className="dashboard-grid">
				<div className="overview-cards">
					{statsData.map((stat) => {
						const Icon = stat.icon;
						return (
							<div key={stat.label} className="info-card" style={{ borderTopColor: stat.accent }}>
								<div className="info-card-header">
									<Icon className="info-icon" />
									<span>{stat.label}</span>
								</div>
								<h2>{stat.value}</h2>
								<p>Updated just now</p>
							</div>
						);
					})}
				</div>

				<div className="insights-panel">
					<div className="section-header">
						<div>
							<p className="eyebrow">Quick Actions</p>
							<h2>Action center</h2>
						</div>
						<button className="ghost-btn">View schedule</button>
					</div>

					<div className="action-grid">
						{quickActions.map((action) => {
							const Icon = action.icon;
							return (
								<button key={action.title} className="action-chip">
									<Icon />
									{action.title}
								</button>
							);
						})}
					</div>

					<div className="section-card">
						<div className="section-top">
							<h3>Recent activity</h3>
							<div className="chip-group">
								<button
									className={activeFilter === "Weekly" ? "chip active" : "chip"}
									onClick={() => setActiveFilter("Weekly")}
								>
									Weekly
								</button>
								<button
									className={activeFilter === "Monthly" ? "chip active" : "chip"}
									onClick={() => setActiveFilter("Monthly")}
								>
									Monthly
								</button>
							</div>
						</div>

						<div className="activity-list">
							{filteredActivity.map((item) => (
								<div key={item.label} className="activity-row">
									<div>
										<p className="activity-title">{item.label}</p>
										<p className="activity-detail">{item.detail}</p>
									</div>
									<span>{item.time}</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default Dashboard;
