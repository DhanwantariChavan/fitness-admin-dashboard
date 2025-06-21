import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import Table from '../components/common/Table';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import './Equipment.css';

const Equipment = () => {
  const { equipment, loading, setEquipment } = useData();
  const [view, setView] = useState('table'); // 'table' or 'kanban'

  if (loading) {
    return <Loading />;
  }

  const equipmentColumns = [
    {
      key: 'name',
      label: 'Equipment',
      render: (value, item) => (
        <div className="equipment-info">
          <div className="equipment-icon">
            {item.type === 'Cardio' ? '🏃' : '💪'}
          </div>
          <div>
            <div className="equipment-name">{value}</div>
            <div className="equipment-location">{item.location}</div>
          </div>
        </div>
      )
    },
    {
      key: 'type',
      label: 'Type',
      render: (value) => (
        <span className={`type-badge ${value.toLowerCase()}`}>
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
      key: 'lastMaintenance',
      label: 'Last Maintenance',
      render: (value) => new Date(value).toLocaleDateString()
    },
    {
      key: 'nextMaintenance',
      label: 'Next Maintenance',
      render: (value) => {
        const date = new Date(value);
        const today = new Date();
        const isOverdue = date < today;
        return (
          <span className={isOverdue ? 'overdue' : ''}>
            {date.toLocaleDateString()}
          </span>
        );
      }
    },
    {
      key: 'location',
      label: 'Location'
    }
  ];

  // Calculate statistics
  const stats = {
    total: equipment.length,
    operational: equipment.filter(e => e.status === 'operational').length,
    maintenance: equipment.filter(e => e.status === 'maintenance').length,
    outOfOrder: equipment.filter(e => e.status === 'out-of-order').length,
    overdue: equipment.filter(e => 
      new Date(e.nextMaintenance) < new Date() && e.status === 'operational'
    ).length
  };

  // Prepare data for Kanban board
  const maintenanceTasks = equipment
    .filter(e => e.status === 'maintenance' || new Date(e.nextMaintenance) < new Date())
    .map(e => ({
      id: e.id,
      title: `${e.name} Maintenance`,
      description: `Location: ${e.location}`,
      equipment: e.name,
      dueDate: e.nextMaintenance,
      priority: new Date(e.nextMaintenance) < new Date() ? 'high' : 'medium',
      status: e.status === 'maintenance' ? 'in-progress' : 'scheduled'
    }));

  const kanbanColumns = {
    scheduled: {
      title: 'Scheduled',
      tasks: maintenanceTasks.filter(t => t.status === 'scheduled')
    },
    'in-progress': {
      title: 'In Progress',
      tasks: maintenanceTasks.filter(t => t.status === 'in-progress')
    },
    completed: {
      title: 'Completed',
      tasks: []
    },
    'needs-attention': {
      title: 'Needs Attention',
      tasks: maintenanceTasks.filter(t => t.priority === 'high')
    }
  };

  const handleStatusUpdate = (equipmentId, newStatus) => {
    const updatedEquipment = equipment.map(item =>
      item.id === equipmentId ? { ...item, status: newStatus } : item
    );
    setEquipment(updatedEquipment);
  };

  return (
    <div className="equipment-page">
      <div className="page-header">
        <div>
          <h1>Equipment Management</h1>
          <p>Monitor equipment status, maintenance schedules, and performance</p>
        </div>
        <div className="header-actions">
          <div className="view-toggle">
           
          </div>
       
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <Card
          title="Total Equipment"
          value={stats.total}
          icon="🏋️"
          className="stat-card total"
        />
        <Card
          title="Operational"
          value={stats.operational}
          icon="✅"
          className="stat-card operational"
        />
        <Card
          title="Under Maintenance"
          value={stats.maintenance}
          icon="🔧"
          className="stat-card maintenance"
        />
        <Card
          title="Overdue Maintenance"
          value={stats.overdue}
          icon="⚠️"
          className="stat-card overdue"
        />
      </div>

      {/* Equipment Status Overview */}
      <div className="equipment-overview">
        <Card title="Equipment by Location">
          <div className="location-grid">
            {[...new Set(equipment.map(e => e.location))].map(location => {
              const locationEquipment = equipment.filter(e => e.location === location);
              const operational = locationEquipment.filter(e => e.status === 'operational').length;
              return (
                <div key={location} className="location-card">
                  <div className="location-name">{location}</div>
                  <div className="location-stats">
                    <div className="location-total">{locationEquipment.length} items</div>
                    <div className="location-operational">{operational} operational</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Main Content */}
      {/* {view === 'table' ? (
        <Card title="Equipment Inventory">
          <Table
            data={equipment}
            columns={equipmentColumns}
            searchable={true}
            sortable={true}
            onEdit={(item) => console.log('Edit equipment:', item)}
          />
        </Card>
      )
      } */}

      {/* Maintenance Alerts */}
      <Card title="Maintenance Alerts">
        <div className="maintenance-alerts">
          {equipment
            .filter(e => new Date(e.nextMaintenance) < new Date() || e.status === 'maintenance')
            .map(item => (
              <div key={item.id} className={`alert-item ${item.status}`}>
                <div className="alert-icon">
                  {item.status === 'maintenance' ? '🔧' : '⚠️'}
                </div>
                <div className="alert-content">
                  <div className="alert-title">{item.name}</div>
                  <div className="alert-message">
                    {item.status === 'maintenance' 
                      ? 'Currently under maintenance'
                      : `Maintenance overdue since ${new Date(item.nextMaintenance).toLocaleDateString()}`
                    }
                  </div>
                  <div className="alert-location">Location: {item.location}</div>
                </div>
                <div className="alert-actions">
                     <Button 
                        variant="secondary" 
                        onClick={() => handleStatusUpdate(item.id, 'operational')}
                    >
                        Mark as Operational
                    </Button>
                    <Button 
                        variant="danger" 
                        onClick={() => handleStatusUpdate(item.id, 'out-of-order')}
                    >
                        Mark as Out of Order
                    </Button>
                </div>
              </div>   
            ))} 
        </div>
      </Card>
    </div>
  );
}
export default Equipment;      