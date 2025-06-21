import React, { useState, useEffect } from 'react';
import CalendarEvent from './CalendarEvent';
import './Calendar.css';

const Calendar = ({ events = [], onEventClick, onDateClick, selectedDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);

  // Sample data - can be removed when real data is available
  const sampleEvents = [
    {
      id: 1,
      title: 'Morning Yoga',
      date: '2025-06-21',
      time: '7:00 AM',
      type: 'class'
    },
    {
      id: 2,
      title: 'Personal Training',
      date: '2025-06-21',
      time: '2:00 PM',
      type: 'workout'
    },
    {
      id: 3,
      title: 'Team Meeting',
      date: '2025-06-22',
      time: '10:00 AM',
      type: 'meeting'
    },
    {
      id: 4,
      title: 'Zumba Class',
      date: '2025-06-23',
      time: '6:00 PM',
      type: 'class'
    },
    {
      id: 5,
      title: 'Equipment Maintenance',
      date: '2025-06-24',
      time: '9:00 AM',
      type: 'maintenance'
    },
    {
      id: 6,
      title: 'CrossFit Session',
      date: '2025-06-25',
      time: '5:00 PM',
      type: 'workout'
    },
    {
      id: 7,
      title: 'Pilates Class',
      date: '2025-06-26',
      time: '8:00 ',
      type: 'class'
    },
    {
      id: 8,
      title: 'Staff Meeting',
      date: '2025-06-27',
      time: '3:00 ',
      type: 'meeting'
    },
    {
      id: 9,
      title: 'Cardio Workout',
      date: '2025-06-28',
      time: '12:00 ',
      type: 'workout'
    },
    {
      id: 10,
      title: 'Nutrition Workshop',
      date: '2025-06-29',
      time: '11:00 ',
      type: 'class'
    }
  ];

  // Use sample events if no events provided
  const eventsToUse = events.length > 0 ? events : sampleEvents;

  useEffect(() => {
    generateCalendarDays();
  }, [currentDate]);

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    // First day of the week for the first day of month
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDay = new Date(startDate);
    
    // Generate 42 days (6 weeks) for calendar grid
    for (let i = 0; i < 42; i++) {
      days.push({
        date: new Date(currentDay),
        isCurrentMonth: currentDay.getMonth() === month,
        isToday: isToday(currentDay),
        isSelected: selectedDate && isSameDay(currentDay, selectedDate),
        events: getEventsForDate(currentDay)
      });
      currentDay.setDate(currentDay.getDate() + 1);
    }
    
    setCalendarDays(days);
  };

  const isToday = (date) => {
    const today = new Date();
    return isSameDay(date, today);
  };

  const isSameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  const getEventsForDate = (date) => {
    return eventsToUse.filter(event => {
      const eventDate = new Date(event.date);
      return isSameDay(eventDate, date);
    });
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="calendar">
      <div className="calendar-header">
        <div className="calendar-nav">
          <button 
            className="nav-btn" 
            onClick={() => navigateMonth(-1)}
            aria-label="Previous month"
          >
            ←
          </button>
          <h2 className="current-month">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button 
            className="nav-btn" 
            onClick={() => navigateMonth(1)}
            aria-label="Next month"
          >
            →
          </button>
        </div>
        <button className="today-btn" onClick={goToToday}>
          Today
        </button>
      </div>

      <div className="calendar-grid">
        <div className="day-headers">
          {dayNames.map(day => (
            <div key={day} className="day-header">
              {day}
            </div>
          ))}
        </div>

        <div className="calendar-days">
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`calendar-day ${
                day.isCurrentMonth ? 'current-month' : 'other-month'
              } ${day.isToday ? 'today' : ''} ${
                day.isSelected ? 'selected' : ''
              } ${day.events.length > 0 ? 'has-events' : ''}`}
              onClick={() => onDateClick && onDateClick(day.date)}
            >
              <div className="day-number">{day.date.getDate()}</div>
              <div className="day-events">
                {day.events.slice(0, 3).map((event, eventIndex) => (
                  <CalendarEvent
                    key={eventIndex}
                    event={event}
                    onClick={() => onEventClick && onEventClick(event)}
                    compact={true}
                  />
                ))}
                {day.events.length > 3 && (
                  <div className="more-events">
                    +{day.events.length - 3} more
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;