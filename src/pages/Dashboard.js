import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Line, AreaChart, Area } from 'recharts';
import "./Dashboard.css"; 
import { useNavigate } from 'react-router-dom';
import Calendar from '../components/calendar/Calendar';

const Dashboard = () => {
  const [activeView, setActiveView] = useState('overview');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  // Load dark mode preference from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      setIsDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  // Apply dark mode class to document body
  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Enhanced sample data for charts
  const membershipData = [
    { month: 'Jan', members: 120, target: 100 },
    { month: 'Feb', members: 135, target: 120 },
    { month: 'Mar', members: 150, target: 140 },
    { month: 'Apr', members: 180, target: 160 },
    { month: 'May', members: 195, target: 180 },
    { month: 'Jun', members: 210, target: 200 }
  ];

  const classData = [
    { name: 'Yoga', value: 35, color: isDarkMode ? '#3b82f6' : '#1e40af' },
    { name: 'Cardio', value: 25, color: isDarkMode ? '#10b981' : '#059669' },
    { name: 'Strength', value: 20, color: isDarkMode ? '#f87171' : '#dc2626' },
    { name: 'Pilates', value: 20, color: isDarkMode ? '#a78bfa' : '#7c3aed' }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 12000, expenses: 8000 },
    { month: 'Feb', revenue: 15000, expenses: 9000 },
    { month: 'Mar', revenue: 18000, expenses: 10000 },
    { month: 'Apr', revenue: 22000, expenses: 12000 },
    { month: 'May', revenue: 25000, expenses: 13000 },
    { month: 'Jun', revenue: 28000, expenses: 14000 }
  ];

  // Enhanced tasks for Kanban with more details
  const kanbanTasks = {
    todo: [
      { id: 1, title: 'Schedule new yoga classes', priority: 'high', assignee: 'Sarah', dueDate: '2024-06-25' },
      { id: 2, title: 'Equipment maintenance check', priority: 'medium', assignee: 'Mike', dueDate: '2024-06-28' },
      { id: 3, title: 'Update member profiles', priority: 'low', assignee: 'Lisa', dueDate: '2024-07-01' }
    ],
    inProgress: [
      { id: 4, title: 'Trainer certification review', priority: 'high', assignee: 'John', dueDate: '2024-06-24' },
      { id: 5, title: 'Monthly report preparation', priority: 'medium', assignee: 'Emma', dueDate: '2024-06-30' }
    ],
    completed: [
      { id: 6, title: 'New member orientation', priority: 'low', assignee: 'Tom', dueDate: '2024-06-20' },
      { id: 7, title: 'Equipment purchase approval', priority: 'high', assignee: 'Sarah', dueDate: '2024-06-22' }
    ]
  };

  const stats = {
    totalMembers: 210,
    activeClasses: 12,
    trainers: 8,
    revenue: 28000,
    growth: '+12%',
    classGrowth: '+5%',
    trainerGrowth: '+2%',
    revenueGrowth: '+18%'
  };

  const StatCard = ({ title, value, growth, icon, iconColor }) => (
    <div className="stat-card">
      <div className="stat-card-content">
        <div className="stat-card-inner">
          <div className="stat-card-info">
            <p className="stat-card-title">{title}</p>
            <p className="stat-card-value">{value}</p>
            <div className="stat-card-growth">
              <span className={`growth-badge ${growth.startsWith('+') ? 'positive' : 'negative'}`}>
                <svg className="growth-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d={growth.startsWith('+') ? "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" : "M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"} clipRule="evenodd" />
                </svg>
                {growth}
              </span>
              <span className="growth-text">vs last month</span>
            </div>
          </div>
          <div className={`stat-card-icon ${iconColor}`}>
            {icon}
          </div>
        </div>
      </div>
      <div className={`stat-card-bottom ${iconColor}`}></div>
    </div>
  );

  // Dark Mode Toggle Button Component
  const DarkModeToggle = () => (
    <button 
      className="dark-mode-toggle"
      onClick={toggleDarkMode}
      aria-label="Toggle dark mode"
    >
      <div className={`toggle-track ${isDarkMode ? 'dark' : 'light'}`}>
        <div className={`toggle-thumb ${isDarkMode ? 'dark' : 'light'}`}>
          <span className="toggle-icon">
            {isDarkMode ? '🌙' : '☀️'}
          </span>
        </div>
      </div>
    </button>
  );

  const getChartColors = () => ({
    grid: isDarkMode ? '#374151' : '#f1f5f9',
    text: isDarkMode ? '#d1d5db' : '#64748b',
    background: isDarkMode ? '#1f2937' : 'white',
    border: isDarkMode ? '#374151' : '#e2e8f0'
  });

  const renderOverview = () => (
    <div className="dashboard-content">
      {/* Stats Cards */}
      <div className="stats-grid">
        <StatCard
          title="Total Members"
          value={stats.totalMembers}
          growth={stats.growth}
          icon="👥"
          iconColor="blue"
        />
        <StatCard
          title="Active Classes"
          value={stats.activeClasses}
          growth={stats.classGrowth}
          icon="🏃‍♀️"
          iconColor="emerald"
        />
        <StatCard
          title="Trainers"
          value={stats.trainers}
          growth={stats.trainerGrowth}
          icon="💪"
          iconColor="purple"
        />
        <StatCard
          title="Monthly Revenue"
          value={`$${stats.revenue.toLocaleString()}`}
          growth={stats.revenueGrowth}
          icon="💰"
          iconColor="amber"
        />
      </div>

      {/* Quick Actions */}
      <div className="content-card">
        <div className="card-header">
          <h3 className="card-title">Quick Actions</h3>
          <div className="card-divider"></div>
        </div>
        <div className="quick-actions-grid">
          {[
            { label: 'Add New Member', icon: '👤', colorClass: 'blue', path: '/members/new' },
            { label: 'Add New Class', icon: '🏃‍♀️', colorClass: 'emerald', path: '/classes/new' },
            { label: 'Add New Trainer', icon: '💪', colorClass: 'purple', path: '/trainers/new' },
            { label: 'View Calendar', icon: '📅', colorClass: 'amber', path: '/calendar' }
          ].map((action, index) => (
            <button
              key={index}
              className={`quick-action-btn ${action.colorClass}`}
              onClick={() => {
                if (action.path) {
                  navigate(action.path);
                } else if (action.action === 'calendar') {
                  setActiveView('calendar');
                }
              }}
            >
              <span className="action-icon">{action.icon}</span>
              <span className="action-label">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="content-card">
        <div className="card-header">
          <h3 className="card-title">Recent Activity</h3>
        </div>
        <div className="activity-list">
          {[
            { icon: '👤', text: 'New member John Doe joined', time: '2 hours ago', colorClass: 'blue' },
            { icon: '🏃‍♀️', text: 'Yoga class completed successfully', time: '3 hours ago', colorClass: 'emerald' },
            { icon: '⚠️', text: 'Treadmill #5 needs maintenance', time: '5 hours ago', colorClass: 'amber' },
            { icon: '💰', text: 'Monthly revenue target achieved', time: '1 day ago', colorClass: 'purple' }
          ].map((activity, index) => (
            <div key={index} className="activity-item">
              <div className={`activity-icon ${activity.colorClass}`}>
                {activity.icon}
              </div>
              <div className="activity-content">
                <p className="activity-text">{activity.text}</p>
                <p className="activity-time">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCharts = () => {
    const colors = getChartColors();
    
    return (
      <div className="dashboard-content">
        <div className="charts-grid">
          {/* Membership Growth */}
          <div className="chart-card">
            <div className="chart-header">
              <h3 className="chart-title">Membership Growth</h3>
              <div className="chart-legend">
                <div className="legend-item">
                  <div className="legend-dot blue"></div>
                  <span className="legend-text">Members</span>
                </div>
                <div className="legend-item">
                  <div className="legend-dot gray"></div>
                  <span className="legend-text">Target</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={membershipData}>
                <defs>
                  <linearGradient id="memberGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
                <XAxis dataKey="month" stroke={colors.text} fontSize={12} />
                <YAxis stroke={colors.text} fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: colors.background, 
                    border: `1px solid ${colors.border}`, 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    color: colors.text
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="members" 
                  stroke="#3b82f6" 
                  strokeWidth={2} 
                  fill="url(#memberGradient)" 
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke={colors.text} 
                  strokeWidth={2} 
                  strokeDasharray="5 5" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Class Distribution */}
          <div className="chart-card">
            <div className="chart-header">
              <h3 className="chart-title">Class Distribution</h3>
              <span className="chart-subtitle">Current Month</span>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={classData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  innerRadius={50}
                  dataKey="value"
                  label={({name, value}) => `${name}: ${value}%`}
                  labelLine={false}
                >
                  {classData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Percentage']}
                  contentStyle={{ 
                    backgroundColor: colors.background, 
                    border: `1px solid ${colors.border}`,
                    color: colors.text
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="pie-legend">
              {classData.map((entry, index) => (
                <div key={index} className="pie-legend-item">
                  <div className="pie-legend-dot" style={{backgroundColor: entry.color}}></div>
                  <span className="pie-legend-text">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="chart-card full-width">
          <div className="chart-header">
            <h3 className="chart-title">Revenue & Expenses</h3>
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-dot emerald"></div>
                <span className="legend-text">Revenue</span>
              </div>
              <div className="legend-item">
                <div className="legend-dot red"></div>
                <span className="legend-text">Expenses</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={revenueData} barGap={8}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
              <XAxis dataKey="month" stroke={colors.text} fontSize={12} />
              <YAxis stroke={colors.text} fontSize={12} />
              <Tooltip 
                formatter={(value, name) => [`$${value.toLocaleString()}`, name === 'revenue' ? 'Revenue' : 'Expenses']}
                contentStyle={{ 
                  backgroundColor: colors.background, 
                  border: `1px solid ${colors.border}`, 
                  borderRadius: '8px', 
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  color: colors.text
                }}
              />
              <Bar dataKey="revenue" fill="#10b981" radius={[2, 2, 0, 0]} />
              <Bar dataKey="expenses" fill="#f87171" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const renderKanban = () => (
    <div className="dashboard-content">
      <div className="kanban-header">
        <h3 className="kanban-title">Task Management</h3>
      </div>
      
      <div className="kanban-board">
        {/* To Do Column */}
        <div className="kanban-column">
          <div className="kanban-column-header">
            <div className="column-header-left">
              <div className="column-dot red"></div>
              <h4 className="column-title">To Do</h4>
            </div>
            <span className="task-count red">
              {kanbanTasks.todo.length}
            </span>
          </div>
          <div className="kanban-tasks">
            {kanbanTasks.todo.map(task => (
              <div key={task.id} className="kanban-task red">
                <div className="task-header">
                  <h5 className="task-title">{task.title}</h5>
                  <span className={`priority-badge ${task.priority}`}>
                    {task.priority}
                  </span>
                </div>
                <div className="task-meta">
                  <span>👤 {task.assignee}</span>
                  <span>📅 {task.dueDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* In Progress Column */}
        <div className="kanban-column">
          <div className="kanban-column-header">
            <div className="column-header-left">
              <div className="column-dot amber"></div>
              <h4 className="column-title">In Progress</h4>
            </div>
            <span className="task-count amber">
              {kanbanTasks.inProgress.length}
            </span>
          </div>
          <div className="kanban-tasks">
            {kanbanTasks.inProgress.map(task => (
              <div key={task.id} className="kanban-task amber">
                <div className="task-header">
                  <h5 className="task-title">{task.title}</h5>
                  <span className={`priority-badge ${task.priority}`}>
                    {task.priority}
                  </span>
                </div>
                <div className="task-meta">
                  <span>👤 {task.assignee}</span>
                  <span>📅 {task.dueDate}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: '60%'}}></div>
                </div>
                <span className="progress-text">60% Complete</span>
              </div>
            ))}
          </div>
        </div>

        {/* Completed Column */}
        <div className="kanban-column">
          <div className="kanban-column-header">
            <div className="column-header-left">
              <div className="column-dot emerald"></div>
              <h4 className="column-title">Completed</h4>
            </div>
            <span className="task-count emerald">
              {kanbanTasks.completed.length}
            </span>
          </div>
          <div className="kanban-tasks">
            {kanbanTasks.completed.map(task => (
              <div key={task.id} className="kanban-task emerald completed">
                <div className="task-header">
                  <h5 className="task-title completed">{task.title}</h5>
                  <span className="done-badge">
                    ✓ Done
                  </span>
                </div>
                <div className="task-meta">
                  <span>👤 {task.assignee}</span>
                  <span>✅ {task.dueDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <div className="header-content">
            <div className="header-text">
              <h1 className="header-title">
                Admin Dashboard
              </h1>
              <p className="header-subtitle">Welcome back! Here's what's happening today.</p>
            </div>
            <DarkModeToggle />
          </div>
        </div>

        {/* Navigation */}
        <div className="glass-navigation-bar">
          <ul className="glass-nav-list">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'charts', label: 'Analytics', icon: '📈' },
              { id: 'kanban', label: 'Tasks', icon: '📋' },
              { id: 'calendar', label: 'Calendar', icon: '📅' }
            ].map(item => (
              <li key={item.id} className="glass-nav-element">
                <button
                  className={`crystal-nav-control ${activeView === item.id ? 'active-state' : ''}`}
                  onClick={() => setActiveView(item.id)}
                >
                  <span className="premium-nav-symbol">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Content */}
        <div className="dashboard-main">
          {activeView === 'overview' && renderOverview()}
          {activeView === 'charts' && renderCharts()}
          {activeView === 'kanban' && renderKanban()}
          {activeView === 'calendar' && <Calendar />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;