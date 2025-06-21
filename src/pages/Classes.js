import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import Table from '../components/common/Table';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Calendar from '../components/calendar/Calendar';
import Loading from '../components/common/Loading';
import './Classes.css';
import { useNavigate } from 'react-router-dom';


const Classes = () => {
  const { classes, trainers, loading } = useData();
  const [view, setView] = useState('table'); // 'table' or 'calendar'
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();

  if (loading) {
    return <Loading />;
  }

  const classColumns = [
    {
      key: 'name',
      label: 'Class Name',
      render: (value, classItem) => (
        <div className="class-info">
          <div className="class-name">{value}</div>
          <div className="class-type">{classItem.type}</div>
        </div>
      )
    },
    {
      key: 'instructor',
      label: 'Instructor'
    },
    {
      key: 'date',
      label: 'Date',
      render: (value) => new Date(value).toLocaleDateString()
    },
    {
      key: 'time',
      label: 'Time'
    },
    {
      key: 'duration',
      label: 'Duration',
      render: (value) => `${value} min`
    },
    {
      key: 'capacity',
      label: 'Capacity',
      render: (value, classItem) => (
        <div className="capacity-info">
          <div>{classItem.enrolled}/{value}</div>
          <div className="capacity-bar">
            <div 
              className="capacity-fill"
              style={{ width: `${(classItem.enrolled / value) * 100}%` }}
            ></div>
          </div>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (value, classItem) => {
        const now = new Date();
        const classDate = new Date(classItem.date + 'T' + classItem.time);
        let status = 'upcoming';
        
        if (classDate < now) {
          status = 'completed';
        } else if (classItem.enrolled >= classItem.capacity) {
          status = 'full';
        }
        
        return (
          <span className={`status-badge ${status}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        );
      }
    }
  ];

  // Calculate statistics
  const stats = {
    totalClasses: classes.length,
    todayClasses: classes.filter(c => 
      new Date(c.date).toDateString() === new Date().toDateString()
    ).length,
    upcomingClasses: classes.filter(c => new Date(c.date) > new Date()).length,
    totalEnrollments: classes.reduce((sum, c) => sum + c.enrolled, 0),
    averageCapacity: Math.round(
      classes.reduce((sum, c) => sum + (c.enrolled / c.capacity * 100), 0) / classes.length
    )
  };

  const classTypes = [...new Set(classes.map(c => c.type))];

  return (
    <div className="classes-page">
      <div className="page-header">
        <div>
          <h1>Classes Management</h1>
          <p>Manage fitness classes, schedules, and enrollments</p>
        </div>
        <div className="header-actions">
          <div className="view-toggle">
            <Button 
              variant={view === 'table' ? 'primary' : 'secondary'}
              onClick={() => setView('table')}
            >
              Table View
            </Button>
            <Button 
              variant={view === 'calendar' ? 'primary' : 'secondary'}
              onClick={() => setView('calendar')}
            >
              Calendar View
            </Button>
          </div>
         <Button onClick={() => navigate('/classes/new')}>
          Add New Class
        </Button>

        </div>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <Card
          title="Total Classes"
          value={stats.totalClasses}
          icon="🏃"
          className="stat-card"
        />
        <Card
          title="Classes Today"
          value={stats.todayClasses}
          icon="📅"
          className="stat-card today"
        />
        <Card
          title="Total Enrollments"
          value={stats.totalEnrollments}
          icon="👥"
          className="stat-card enrollments"
        />
        <Card
          title="Avg. Capacity"
          value={`${stats.averageCapacity}%`}
          icon="📊"
          className="stat-card capacity"
        />
      </div>

      {/* Class Types Filter */}
      <div className="class-types">
        <h3>Class Types</h3>
        <div className="type-badges">
          {classTypes.map(type => (
            <span key={type} className={`type-badge ${type.toLowerCase()}`}>
              {type}
            </span>
          ))}
        </div>
      </div>

      {/* Content based on view */}
      {view === 'table' ? (
        <Card title="Classes Schedule">
          <Table
            data={classes}
            columns={classColumns}
            searchable={true}
            sortable={true}
          />
        </Card>
      ) : (
        <Card title="Class Calendar">
          <Calendar
            events={classes.map(c => ({
              id: c.id,
              title: c.name,
              date: c.date,
              time: c.time,
              instructor: c.instructor,
              type: c.type,
              enrolled: c.enrolled,
              capacity: c.capacity
            }))}
            onEventClick={(event) => console.log('Event clicked:', event)}
          />
        </Card>
      )}

      {/* Popular Classes */}
      <div className="popular-classes">
        <Card title="Popular Classes">
          <div className="popular-list">
            {classes
              .sort((a, b) => (b.enrolled / b.capacity) - (a.enrolled / a.capacity))
              .slice(0, 5)
              .map(classItem => (
                <div key={classItem.id} className="popular-item">
                  <div className="popular-info">
                    <div className="popular-name">{classItem.name}</div>
                    <div className="popular-instructor">with {classItem.instructor}</div>
                  </div>
                  <div className="popular-stats">
                    <div className="enrollment-rate">
                      {Math.round((classItem.enrolled / classItem.capacity) * 100)}% full
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Classes;