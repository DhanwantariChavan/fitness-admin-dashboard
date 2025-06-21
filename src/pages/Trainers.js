import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import Table from '../components/common/Table';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import { useNavigate } from 'react-router-dom';
import './Trainers.css';

const Trainers = () => {
  const { trainers, classes, loading } = useData();
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const navigate = useNavigate();

  if (loading) {
    return <Loading />;
  }

  const trainerColumns = [
    {
      key: 'name',
      label: 'Trainer',
      render: (value, trainer) => (
        <div className="trainer-info">
          <div className="trainer-avatar">{value.charAt(0)}</div>
          <div>
            <div className="trainer-name">{value}</div>
            <div className="trainer-email">{trainer.email}</div>
          </div>
        </div>
      )
    },
    {
      key: 'specialization',
      label: 'Specialization',
      render: (value) => (
        <div className="specializations">
          {value.split(', ').map(spec => (
            <span key={spec} className="spec-badge">{spec}</span>
          ))}
        </div>
      )
    },
    {
      key: 'experience',
      label: 'Experience'
    },
    {
      key: 'rating',
      label: 'Rating',
      render: (value) => (
        <div className="rating">
          <span className="rating-stars">
            {'★'.repeat(Math.floor(value))}{'☆'.repeat(5 - Math.floor(value))}
          </span>
          <span className="rating-value">{value}</span>
        </div>
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
      key: 'phone',
      label: 'Contact'
    }
  ];

  // Calculate trainer statistics
  const getTrainerStats = (trainer) => {
    const trainerClasses = classes.filter(c => c.instructor === trainer.name);
    const totalEnrollments = trainerClasses.reduce((sum, c) => sum + c.enrolled, 0);
    const avgCapacity = trainerClasses.length > 0 
      ? Math.round(trainerClasses.reduce((sum, c) => sum + (c.enrolled / c.capacity * 100), 0) / trainerClasses.length)
      : 0;

    return {
      totalClasses: trainerClasses.length,
      totalEnrollments,
      avgCapacity,
      upcomingClasses: trainerClasses.filter(c => new Date(c.date) > new Date()).length
    };
  };

  const stats = {
    totalTrainers: trainers.length,
    activeTrainers: trainers.filter(t => t.status === 'active').length,
    averageRating: (trainers.reduce((sum, t) => sum + t.rating, 0) / trainers.length).toFixed(1),
    totalClasses: classes.length
  };

  return (
    <div className="trainers-page">
      <div className="page-header">
        <div>
          <h1>Trainers Management</h1>
          <p>Manage fitness trainers, schedules, and performance</p>
        </div>
         <Button onClick={() => navigate('/trainers/new')}>
      Add New Trainer
    </Button>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <Card
          title="Total Trainers"
          value={stats.totalTrainers}
          icon="💪"
          className="stat-card"
        />
        <Card
          title="Active Trainers"
          value={stats.activeTrainers}
          icon="✅"
          className="stat-card active"
        />
        <Card
          title="Average Rating"
          value={`${stats.averageRating} ★`}
          icon="⭐"
          className="stat-card rating"
        />
        <Card
          title="Total Classes"
          value={stats.totalClasses}
          icon="🏃"
          className="stat-card classes"
        />
      </div>

      {/* Main Content */}
      <div className="trainers-content">
        <div className="trainers-table-section">
          <Card title="Trainers List">
            <Table
              data={trainers}
              columns={trainerColumns}
              searchable={true}
              sortable={true}
              onEdit={(trainer) => setSelectedTrainer(trainer)}
            />
          </Card>
        </div>

        {/* Trainer Performance */}
        <div className="trainer-performance">
          <Card title="Top Performing Trainers">
            <div className="performance-list">
              {trainers
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 5)
                .map(trainer => {
                  const trainerStats = getTrainerStats(trainer);
                  return (
                    <div key={trainer.id} className="performance-item">
                      <div className="performance-trainer">
                        <div className="trainer-avatar">{trainer.name.charAt(0)}</div>
                        <div>
                          <div className="trainer-name">{trainer.name}</div>
                          <div className="trainer-rating">
                            {'★'.repeat(Math.floor(trainer.rating))} {trainer.rating}
                          </div>
                        </div>
                      </div>
                      <div className="performance-stats">
                        <div className="stat-item">
                          <span className="stat-value">{trainerStats.totalClasses}</span>
                          <span className="stat-label">Classes</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-value">{trainerStats.totalEnrollments}</span>
                          <span className="stat-label">Students</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-value">{trainerStats.avgCapacity}%</span>
                          <span className="stat-label">Avg Fill</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </Card>
        </div>
      </div>

      {/* Specialization Overview */}
      <div className="specialization-overview">
        <Card title="Specialization Distribution">
          <div className="specialization-grid">
            {[...new Set(trainers.flatMap(t => t.specialization.split(', ')))]
              .map(spec => {
                const count = trainers.filter(t => t.specialization.includes(spec)).length;
                return (
                  <div key={spec} className="spec-item">
                    <div className="spec-name">{spec}</div>
                    <div className="spec-count">{count} trainers</div>
                  </div>
                );
              })}
          </div>
        </Card>
      </div>

      {/* Weekly Schedule Preview */}
      <Card title="This Week's Schedule">
        <div className="schedule-preview">
          {classes
            .filter(c => {
              const classDate = new Date(c.date);
              const today = new Date();
              const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
              return classDate >= today && classDate <= weekFromNow;
            })
            .sort((a, b) => new Date(a.date + 'T' + a.time) - new Date(b.date + 'T' + b.time))
            .map(classItem => (
              <div key={classItem.id} className="schedule-item">
                <div className="schedule-time">
                  <div className="schedule-date">{new Date(classItem.date).toLocaleDateString()}</div>
                  <div className="schedule-hour">{classItem.time}</div>
                </div>
                <div className="schedule-class">
                  <div className="class-name">{classItem.name}</div>
                  <div className="class-instructor">with {classItem.instructor}</div>
                </div>
                <div className="schedule-capacity">
                  {classItem.enrolled}/{classItem.capacity}
                </div>
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
};

export default Trainers;