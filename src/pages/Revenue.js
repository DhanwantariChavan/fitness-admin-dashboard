import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import './Revenue.css';

const Revenue = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  // Mock data for revenue trends
  const revenueData = [
    { month: 'Jan', revenue: 45000, memberships: 380, classes: 12000 },
    { month: 'Feb', revenue: 52000, memberships: 420, classes: 14000 },
    { month: 'Mar', revenue: 48000, memberships: 390, classes: 13500 },
    { month: 'Apr', revenue: 61000, memberships: 450, classes: 16000 },
    { month: 'May', revenue: 67000, memberships: 480, classes: 18000 },
    { month: 'Jun', revenue: 72000, memberships: 510, classes: 19500 }
  ];

  // Mock data for membership type breakdown
  const membershipData = [
    { name: 'Premium', value: 35, color: '#3b82f6' },
    { name: 'Standard', value: 45, color: '#10b981' },
    { name: 'Basic', value: 20, color: '#f59e0b' }
  ];

  // Mock data for location revenue
  const locationData = [
    { location: 'Downtown', revenue: 28000, members: 180 },
    { location: 'Westside', revenue: 24000, members: 160 },
    { location: 'Northside', revenue: 20000, members: 140 }
  ];

  // Mock payment tracking data
  const paymentData = [
    { id: 1, name: 'John Smith', amount: 89.99, dueDate: '2024-06-25', status: 'paid', membership: 'Premium' },
    { id: 2, name: 'Sarah Johnson', amount: 59.99, dueDate: '2024-06-22', status: 'overdue', membership: 'Standard' },
    { id: 3, name: 'Mike Davis', amount: 39.99, dueDate: '2024-06-28', status: 'pending', membership: 'Basic' },
    { id: 4, name: 'Emily Brown', amount: 89.99, dueDate: '2024-06-30', status: 'paid', membership: 'Premium' },
    { id: 5, name: 'David Wilson', amount: 59.99, dueDate: '2024-07-02', status: 'pending', membership: 'Standard' },
    { id: 6, name: 'Lisa Anderson', amount: 89.99, dueDate: '2024-06-20', status: 'overdue', membership: 'Premium' },
    { id: 7, name: 'Tom Miller', amount: 39.99, dueDate: '2024-07-05', status: 'paid', membership: 'Basic' },
    { id: 8, name: 'Rachel Green', amount: 59.99, dueDate: '2024-07-08', status: 'pending', membership: 'Standard' }
  ];

  const filteredPayments = paymentData.filter(payment =>
    payment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.membership.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedPayments = [...filteredPayments].sort((a, b) => {
    if (sortDirection === 'asc') {
      return a[sortField] > b[sortField] ? 1 : -1;
    }
    return a[sortField] < b[sortField] ? 1 : -1;
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="revenue-dashboard">
      {/* Header */}
      <div className="revenue-header">
        <h1 className="revenue-title">Revenue Analytics</h1>
        <p className="revenue-subtitle">Track financial performance and member payments</p>
      </div>

      {/* Key Metrics Cards */}
      <div className="metrics-grid">
        <div className="metric-card total-revenue">
          <div className="metric-header">
            <span className="metric-title">Total Revenue</span>
            <div className="metric-icon revenue">💰</div>
          </div>
          <div className="metric-value">$72,000</div>
          <div className="metric-change positive">
            ↗ +12.5% from last month
          </div>
        </div>

        <div className="metric-card revenue-growth">
          <div className="metric-header">
            <span className="metric-title">Revenue Growth</span>
            <div className="metric-icon growth">📈</div>
          </div>
          <div className="metric-value">+15.2%</div>
          <div className="metric-change positive">
            ↗ +3.2% from last month
          </div>
        </div>

        <div className="metric-card active-members">
          <div className="metric-header">
            <span className="metric-title">Active Members</span>
            <div className="metric-icon members">👥</div>
          </div>
          <div className="metric-value">510</div>
          <div className="metric-change positive">
            ↗ +30 new members
          </div>
        </div>

        <div className="metric-card churn-rate">
          <div className="metric-header">
            <span className="metric-title">Churn Rate</span>
            <div className="metric-icon churn">📉</div>
          </div>
          <div className="metric-value">2.1%</div>
          <div className="metric-change negative">
            ↘ -0.5% from last month
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="charts-grid">
          {/* Revenue Trends Chart */}
          <div className="chart-card">
            <div className="chart-header">
              <h3 className="chart-title">Revenue Trends</h3>
              <div className="chart-filter">
                <button 
                  className={`filter-btn ${selectedPeriod === 'month' ? 'active' : ''}`}
                  onClick={() => setSelectedPeriod('month')}
                >
                  Monthly
                </button>
                <button 
                  className={`filter-btn ${selectedPeriod === 'quarter' ? 'active' : ''}`}
                  onClick={() => setSelectedPeriod('quarter')}
                >
                  Quarterly
                </button>
                <button 
                  className={`filter-btn ${selectedPeriod === 'year' ? 'active' : ''}`}
                  onClick={() => setSelectedPeriod('year')}
                >
                  Yearly
                </button>
              </div>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    formatter={(value, name) => [formatCurrency(value), name]}
                    labelStyle={{ color: '#374151' }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                    name="Total Revenue"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="classes" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                    name="Class Revenue"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Membership Breakdown Pie Chart */}
          <div className="chart-card">
            <div className="chart-header">
              <h3 className="chart-title">Membership Types</h3>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={membershipData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {membershipData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Location Revenue Comparison */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Revenue by Location</h3>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={locationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="location" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip formatter={(value, name) => [formatCurrency(value), name]} />
                <Legend />
                <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Payment Tracking Table */}
      <div className="payment-section">
        <div className="section-header">
          <h2 className="section-title">Payment Tracking</h2>
          <div className="table-actions">
            <input
              type="text"
              placeholder="Search members..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          
          </div>
        </div>
        
        <div className="payments-table-container">
          <table className="payments-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('name')}>
                  Member Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('membership')}>
                  Membership {sortField === 'membership' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('amount')}>
                  Amount {sortField === 'amount' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('dueDate')}>
                  Due Date {sortField === 'dueDate' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('status')}>
                  Status {sortField === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedPayments.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.name}</td>
                  <td>{payment.membership}</td>
                  <td>{formatCurrency(payment.amount)}</td>
                  <td>{formatDate(payment.dueDate)}</td>
                  <td>
                    <span className={`status-badge ${payment.status}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn">View</button>
                    <button className="action-btn">Edit</button>
                    <button className="action-btn">Remind</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Location Performance Cards */}
      <div className="location-grid">
        {locationData.map((location, index) => (
          <div key={index} className="location-card">
            <div className="location-header">
              <h3 className="location-name">{location.location}</h3>
              <div className="location-status"></div>
            </div>
            <div className="location-metrics">
              <div className="location-metric">
                <div className="location-metric-value">{formatCurrency(location.revenue)}</div>
                <div className="location-metric-label">Monthly Revenue</div>
              </div>
              <div className="location-metric">
                <div className="location-metric-value">{location.members}</div>
                <div className="location-metric-label">Active Members</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Revenue;