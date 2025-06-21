import React from 'react';
import './CalendarEvent.css';

const CalendarEvent = ({ 
  event, 
  onClick, 
  compact = false,
  showDate = false 
}) => {
  const getEventTypeClass = (type) => {
    const typeMap = {
      'Yoga': 'event-yoga',
      'HIIT': 'event-hiit',
      'Cardio': 'event-cardio',
      'Strength': 'event-strength',
      'Pilates': 'event-pilates',
      'Zumba': 'event-zumba',
      'CrossFit': 'event-crossfit',
      'Swimming': 'event-swimming'
    };
    return typeMap[type] || 'event-default';
  };

  const formatTime = (time) => {
    // Handle different time formats
    if (typeof time === 'string') {
      const [hours, minutes] = time.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes} ${ampm}`;
    }
    return time;
  };

  const formatDate = (date) => {
    const eventDate = new Date(date);
    return eventDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  if (compact) {
    return (
      <div 
        className={`calendar-event compact ${getEventTypeClass(event.type)}`}
        onClick={(e) => {
          e.stopPropagation();
          onClick && onClick(event);
        }}
        title={`${event.name} - ${formatTime(event.time)}`}
      >
        <div className="event-time">{formatTime(event.time)}</div>
        <div className="event-name">{event.name}</div>
      </div>
    );
  }

  return (
    <div 
      className={`calendar-event ${getEventTypeClass(event.type)}`}
      onClick={() => onClick && onClick(event)}
    >
      <div className="event-header">
        <div className="event-title">
          <h4 className="event-name">{event.name}</h4>
          <span className="event-type">{event.type}</span>
        </div>
        <div className="event-status">
          <span className={`status-badge ${event.status || 'scheduled'}`}>
            {event.status || 'Scheduled'}
          </span>
        </div>
      </div>

      <div className="event-details">
        {showDate && (
          <div className="event-detail">
            <span className="detail-icon">📅</span>
            <span>{formatDate(event.date)}</span>
          </div>
        )}
        
        <div className="event-detail">
          <span className="detail-icon">🕐</span>
          <span>{formatTime(event.time)} ({event.duration} min)</span>
        </div>

        {event.instructor && (
          <div className="event-detail">
            <span className="detail-icon">👤</span>
            <span>{event.instructor}</span>
          </div>
        )}

        <div className="event-detail">
          <span className="detail-icon">👥</span>
          <span>{event.enrolled || 0}/{event.capacity || 0} enrolled</span>
        </div>

        {event.location && (
          <div className="event-detail">
            <span className="detail-icon">📍</span>
            <span>{event.location}</span>
          </div>
        )}
      </div>

      <div className="event-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ 
              width: `${((event.enrolled || 0) / (event.capacity || 1)) * 100}%` 
            }}
          ></div>
        </div>
        <span className="progress-text">
          {Math.round(((event.enrolled || 0) / (event.capacity || 1)) * 100)}% full
        </span>
      </div>
    </div>
  );
};

export default CalendarEvent;