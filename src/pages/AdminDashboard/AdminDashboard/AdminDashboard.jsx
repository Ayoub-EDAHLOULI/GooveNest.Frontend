import "./AdminDashboard.scss";

function AdminDashboard() {
  // Mock data - replace with real data from your API
  const stats = [
    { title: "Total Users", value: "12,458", change: "+12%", trend: "up" },
    { title: "Active Artists", value: "1,245", change: "+5%", trend: "up" },
    { title: "Songs Uploaded", value: "56,789", change: "+23%", trend: "up" },
    { title: "Reports", value: "42", change: "-8%", trend: "down" },
  ];

  const recentActivities = [
    {
      id: 1,
      user: "Artist123",
      action: "uploaded a new song",
      time: "2 mins ago",
    },
    {
      id: 2,
      user: "MusicFan99",
      action: "created a playlist",
      time: "15 mins ago",
    },
    {
      id: 3,
      user: "DJCool",
      action: "applied for artist verification",
      time: "1 hour ago",
    },
    {
      id: 4,
      user: "System",
      action: "scheduled maintenance",
      time: "3 hours ago",
    },
  ];

  return (
    <div className="admin-dashboard">
      <h1>Dashboard Overview</h1>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div className="stat-card" key={index}>
            <h3>{stat.title}</h3>
            <div className="stat-value">{stat.value}</div>
            <div className={`stat-change ${stat.trend}`}>
              {stat.change} {stat.trend === "up" ? "↑" : "↓"}
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="recent-activities">
          <h2>Recent Activities</h2>
          <ul>
            {recentActivities.map((activity) => (
              <li key={activity.id}>
                <span className="user">{activity.user}</span>
                <span className="action">{activity.action}</span>
                <span className="time">{activity.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button className="action-btn">Verify Artists</button>
            <button className="action-btn">Review Content</button>
            <button className="action-btn">View Reports</button>
            <button className="action-btn">Manage Users</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
