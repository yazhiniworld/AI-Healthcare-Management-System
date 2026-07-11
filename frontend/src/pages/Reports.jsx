import { FaDollarSign, FaUsers, FaChartLine, FaCalendarCheck } from "react-icons/fa";
import "./Reports.css";

const reportCards = [
	{ label: "Monthly revenue", value: "$148.3k", trend: "+14%", icon: FaDollarSign },
	{ label: "Active patients", value: "1,284", trend: "+6%", icon: FaUsers },
	{ label: "Appointment growth", value: "42%", trend: "+8%", icon: FaChartLine },
	{ label: "Upcoming visits", value: "78", trend: "+12%", icon: FaCalendarCheck },
];

function Reports() {
	return (
		<div className="reports-page">
			<div className="page-header">
				<div>
					<p className="eyebrow">Performance Analytics</p>
					<h1>Reports hub</h1>
					<p>Review financial, patient, and appointment trends across the hospital network.</p>
				</div>
			</div>

			<div className="report-grid">
				{reportCards.map((card) => {
					const Icon = card.icon;
					return (
						<div key={card.label} className="info-card">
							<div className="info-card-header">
								<Icon className="info-icon" />
								<span>{card.label}</span>
							</div>
							<h2>{card.value}</h2>
							<span className="metric-chip success">{card.trend}</span>
						</div>
					);
				})}
			</div>

			<div className="reports-layout">
				<div className="activity-panel glass-card">
					<h2>Revenue overview</h2>
					<p>Projected revenue is on track this quarter with strong outpatient and diagnostic growth.</p>
					<div className="chart-placeholder">Revenue chart placeholder</div>
				</div>

				<div className="activity-panel glass-card">
					<h2>Patient analytics</h2>
					<p>Usage, retention, and engagement trends for clinical and administrative workflows.</p>
					<div className="chart-placeholder">Patient analytics placeholder</div>
				</div>
			</div>

			<div className="kpi-grid">
				<div className="kpi-card glass-card">
					<h3>Average stay</h3>
					<p>2.6 days</p>
				</div>
				<div className="kpi-card glass-card">
					<h3>ER response</h3>
					<p>8 min</p>
				</div>
				<div className="kpi-card glass-card">
					<h3>Patient follow ups</h3>
					<p>224 scheduled</p>
				</div>
				<div className="kpi-card glass-card">
					<h3>Care quality</h3>
					<p>94.1%</p>
				</div>
			</div>
		</div>
	);
}

export default Reports;
