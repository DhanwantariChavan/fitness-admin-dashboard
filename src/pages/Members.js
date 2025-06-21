import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import Table from '../components/common/Table';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import MemberForm from '../components/forms/MemberForm';
import Loading from '../components/common/Loading';
import './Members.css';
import { useNavigate } from 'react-router-dom';


const Members = () => {
  const { members, loading, setMembers } = useData();

  const [editingMember, setEditingMember] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const navigate = useNavigate();


  if (loading) {
    return <Loading />;
  }

  // Filter members based on status
  const filteredMembers = members.filter(member => {
    if (filterStatus === 'all') return true;
    return member.status === filterStatus;
  });

  const memberColumns = [
    {
      key: 'name',
      label: 'Name',
      render: (value, member) => (
        <div className="member-info">
          <div className="member-avatar">{value.charAt(0)}</div>
          <div>
            <div className="member-name">{value}</div>
            <div className="member-email">{member.email}</div>
          </div>
        </div>
      )
    },
    {
      key: 'membershipType',
      label: 'Membership',
      render: (value) => (
        <span className={`membership-badge ${value.toLowerCase()}`}>
          {value}
        </span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span className={`status-badge ${value}`}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      )
    },
    {
      key: 'joinDate',
      label: 'Join Date',
      render: (value) => new Date(value).toLocaleDateString()
    },
    {
      key: 'lastVisit',
      label: 'Last Visit',
      render: (value) => new Date(value).toLocaleDateString()
    },
    {
      key: 'phone',
      label: 'Phone'
    }
  ];

  const handleAddMember = (memberData) => {
    const newMember = {
      ...memberData,
      id: Date.now(),
      joinDate: new Date().toISOString().split('T')[0],
      status: 'active'
    };
    setMembers([...members, newMember]);
  };

  const handleEditMember = (member) => {
    setEditingMember(member);
  };

  const handleUpdateMember = (updatedData) => {
    const updatedMembers = members.map(member =>
      member.id === editingMember.id
        ? { ...member, ...updatedData }
        : member
    );
    setMembers(updatedMembers);
    setEditingMember(null);
  };

  const handleDeleteMember = (member) => {
    if (window.confirm(`Are you sure you want to delete ${member.name}?`)) {
      const updatedMembers = members.filter(m => m.id !== member.id);
      setMembers(updatedMembers);
    }
  };

  // Calculate statistics
  const stats = {
    total: members.length,
    active: members.filter(m => m.status === 'active').length,
    inactive: members.filter(m => m.status === 'inactive').length,
    premium: members.filter(m => m.membershipType === 'Premium').length,
    basic: members.filter(m => m.membershipType === 'Basic').length
  };

  return (
    <div className="members-page">
      <div className="page-header">
        <div>
          <h1>Members Management</h1>
          <p>Manage gym members, memberships, and member information</p>
        </div>
        <Button onClick={() => navigate('/members/new')}>
  Add New Member
</Button>

      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <Card
          title="Total Members"
          value={stats.total}
          icon="👥"
          className="stat-card"
        />
        <Card
          title="Active Members"
          value={stats.active}
          icon="✅"
          className="stat-card active"
        />
        <Card
          title="Premium Members"
          value={stats.premium}
          icon="⭐"
          className="stat-card premium"
        />
        <Card
          title="Basic Members"
          value={stats.basic}
          icon="📝"
          className="stat-card basic"
        />
      </div>

      {/* Filters */}
      <div className="page-filters">
        <div className="filter-group">
          <label htmlFor="statusFilter">Filter by Status:</label>
          <select
            id="statusFilter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Members</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Members Table */}
      <Card title="Members List">
        <Table
          data={filteredMembers}
          columns={memberColumns}
          onEdit={handleEditMember}
          onDelete={handleDeleteMember}
          searchable={true}
          sortable={true}
        />
      </Card>


  
    </div>
  );
};

export default Members;