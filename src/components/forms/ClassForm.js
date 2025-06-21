import React, { useState } from 'react';
import { Calendar, Clock, Users, MapPin, User, DollarSign } from 'lucide-react';
import './ClassForm.css';

const ClassForm = ({ onSubmit, initialData = null, onCancel, trainers = [] }) => {
  const [formData, setFormData] = useState({
    className: initialData?.className || '',
    description: initialData?.description || '',
    trainerId: initialData?.trainerId || '',
    trainerName: initialData?.trainerName || '',
    date: initialData?.date || '',
    startTime: initialData?.startTime || '',
    endTime: initialData?.endTime || '',
    duration: initialData?.duration || '',
    maxCapacity: initialData?.maxCapacity || '',
    currentEnrollment: initialData?.currentEnrollment || 0,
    location: initialData?.location || '',
    category: initialData?.category || 'fitness',
    difficulty: initialData?.difficulty || 'beginner',
    price: initialData?.price || '',
    requirements: initialData?.requirements || '',
    recurring: initialData?.recurring || false,
    recurringType: initialData?.recurringType || 'weekly'
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Auto-calculate duration when start and end times change
    if (name === 'startTime' || name === 'endTime') {
      const startTime = name === 'startTime' ? value : formData.startTime;
      const endTime = name === 'endTime' ? value : formData.endTime;
      
      if (startTime && endTime) {
        const start = new Date(`2000-01-01T${startTime}`);
        const end = new Date(`2000-01-01T${endTime}`);
        const diffMs = end - start;
        const diffMins = Math.floor(diffMs / 60000);
        
        if (diffMins > 0) {
          setFormData(prev => ({
            ...prev,
            duration: `${diffMins} minutes`
          }));
        }
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.className.trim()) newErrors.className = 'Class name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.trainerId && !formData.trainerName.trim()) {
      newErrors.trainerId = 'Trainer is required';
    }
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.startTime) newErrors.startTime = 'Start time is required';
    if (!formData.endTime) newErrors.endTime = 'End time is required';
    if (!formData.maxCapacity || formData.maxCapacity < 1) {
      newErrors.maxCapacity = 'Max capacity must be at least 1';
    }
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.price || formData.price < 0) {
      newErrors.price = 'Price must be a valid amount';
    }
    
    // Validate time logic
    if (formData.startTime && formData.endTime) {
      const start = new Date(`2000-01-01T${formData.startTime}`);
      const end = new Date(`2000-01-01T${formData.endTime}`);
      if (end <= start) {
        newErrors.endTime = 'End time must be after start time';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="class-form-container">
      <div className="form-header">
        <Calendar className="form-header-icon" />
        <h2 className="form-title">
          {initialData ? 'Edit Class' : 'Create New Class'}
        </h2>
      </div>

      <div className="form-content">
        <div className="form-grid">
          <div className="form-field">
            <label className="form-label">
              Class Name <span className="required-asterisk">*</span>
            </label>
            <input
              type="text"
              name="className"
              value={formData.className}
              onChange={handleChange}
              className={`form-input ${errors.className ? 'error' : ''}`}
              placeholder="e.g., Morning Yoga, HIIT Training"
            />
            {errors.className && <p className="error-message">{errors.className}</p>}
          </div>

          <div className="form-field">
            <label className="form-label">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-select"
            >
              <option value="fitness">Fitness</option>
              <option value="yoga">Yoga</option>
              <option value="cardio">Cardio</option>
              <option value="strength">Strength Training</option>
              <option value="dance">Dance</option>
              <option value="martial-arts">Martial Arts</option>
              <option value="swimming">Swimming</option>
              <option value="pilates">Pilates</option>
              <option value="crossfit">CrossFit</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="form-field form-grid-full">
          <label className="form-label">
            Description <span className="required-asterisk">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`form-textarea ${errors.description ? 'error' : ''}`}
            placeholder="Describe the class, what to expect, benefits, etc."
            rows="3"
          />
          {errors.description && <p className="error-message">{errors.description}</p>}
        </div>

        <div className="form-grid">
          <div className="form-field">
            <label className="form-label form-label-icon">
              <User className="w-4 h-4" />
              Trainer <span className="required-asterisk">*</span>
            </label>
            {trainers.length > 0 ? (
              <select
                name="trainerId"
                value={formData.trainerId}
                onChange={handleChange}
                className={`form-select ${errors.trainerId ? 'error' : ''}`}
              >
                <option value="">Select Trainer</option>
                {trainers.map(trainer => (
                  <option key={trainer.id} value={trainer.id}>
                    {trainer.name}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                name="trainerName"
                value={formData.trainerName}
                onChange={handleChange}
                className={`form-input ${errors.trainerId ? 'error' : ''}`}
                placeholder="Enter trainer's name"
              />
            )}
            {errors.trainerId && <p className="error-message">{errors.trainerId}</p>}
            {errors.trainerName && <p className="error-message">{errors.trainerName}</p>}
          </div>
          
          <div className="form-field">
            <label className="form-label">
              Date <span className="required-asterisk">*</span>
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`form-input ${errors.date ? 'error' : ''}`}
              placeholder="Select class date"
            />
            {errors.date && <p className="error-message">{errors.date}</p>}
          </div>
          
          <div className="form-field">
            <label className="form-label">
              Start Time <span className="required-asterisk">*</span>
            </label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className={`form-input ${errors.startTime ? 'error' : ''}`}
              placeholder="Select class start time"
            />
            {errors.startTime && <p className="error-message">{errors.startTime}</p>}
          </div>
          
          <div className="form-field">
            <label className="form-label">
              End Time <span className="required-asterisk">*</span>
            </label>
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className={`form-input ${errors.endTime ? 'error' : ''}`}
              placeholder="Select class end time"
            />
            {errors.endTime && <p className="error-message">{errors.endTime}</p>}
          </div>
          
          <div className="form-field">
            <label className="form-label">
              Duration
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="form-input"
              placeholder="Auto-calculated based on start and end times"
              readOnly
            />
          </div>
          
          <div className="form-field">
            <label className="form-label">
              Max Capacity <span className="required-asterisk">*</span>
            </label>
            <input
              type="number"
              name="maxCapacity"
              value={formData.maxCapacity}
              onChange={handleChange}
              className={`form-input ${errors.maxCapacity ? 'error' : ''}`}
              placeholder="Enter maximum number of participants"
            />
            {errors.maxCapacity && <p className="error-message">{errors.maxCapacity}</p>}
          </div>
          
          <div className="form-field">
            <label className="form-label">
              Current Enrollment
            </label>
            <input
              type="number"
              name="currentEnrollment"
              value={formData.currentEnrollment}
              onChange={handleChange}
              className="form-input"
              placeholder="Current number of enrolled participants"
              readOnly
            />
          </div>
          
          <div className="form-field">
            <label className="form-label">
              Location <span className="required-asterisk">*</span>
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={`form-input ${errors.location ? 'error' : ''}`}
              placeholder="Enter class location"
            />
            {errors.location && <p className="error-message">{errors.location}</p>}
          </div>
          
          <div className="form-field">
            <label className="form-label">
              Difficulty Level
            </label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="form-select"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
          </div>
          
          <div className="form-field">
            <label className="form-label">
              Price <span className="required-asterisk">*</span>
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={`form-input ${errors.price ? 'error' : ''}`}
              placeholder="Enter class price"
            />
            {errors.price && <p className="error-message">{errors.price}</p>}
          </div>
        </div>

        <div className="checkbox-container">
          <input
            type="checkbox"
            name="recurring"
            checked={formData.recurring}
            onChange={handleChange}
            className="form-checkbox"
          />
          <label className="checkbox-label">
            Recurring Class
          </label>
        </div>
        
        {formData.recurring && (
          <div className="conditional-field">
            <label className="form-label">
              Recurring Type
            </label>
            <select
              name="recurringType"
              value={formData.recurringType}
              onChange={handleChange}
              className="form-select"
            >
              <option value="weekly">Weekly</option>
              <option value="bi-weekly">Bi-weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        )}
        
        <div className="button-container">
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-cancel"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            {initialData ? 'Update Class' : 'Create Class'}
          </button>
        </div>
      </div>  
    </div>
  );
}; 

export default ClassForm;