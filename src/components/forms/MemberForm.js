import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, MapPin, CreditCard } from 'lucide-react';
import './MemberForm.css';

const MemberForm = ({ onSubmit, initialData = null, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    dateOfBirth: initialData?.dateOfBirth || '',
    address: initialData?.address || '',
    membershipType: initialData?.membershipType || 'basic',
    emergencyContact: initialData?.emergencyContact || '',
    emergencyPhone: initialData?.emergencyPhone || '',
    medicalConditions: initialData?.medicalConditions || '',
    joinDate: initialData?.joinDate || new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.emergencyContact.trim()) newErrors.emergencyContact = 'Emergency contact is required';
    if (!formData.emergencyPhone.trim()) newErrors.emergencyPhone = 'Emergency phone is required';
    
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
    <div className="member-form-container">
      <div className="form-header">
        <User className="form-header-icon" />
        <h2 className="form-title">
          {initialData ? 'Edit Member' : 'Add New Member'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="form-content">
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">
              First Name *
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`form-input ${errors.firstName ? 'error' : ''}`}
              placeholder="Enter first name"
            />
            {errors.firstName && <p className="error-message">{errors.firstName}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">
              Last Name *
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`form-input ${errors.lastName ? 'error' : ''}`}
              placeholder="Enter last name"
            />
            {errors.lastName && <p className="error-message">{errors.lastName}</p>}
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label className="form-label-with-icon">
              <Mail className="form-label-icon" />
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? 'error' : ''}`}
              placeholder="Enter email address"
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label className="form-label-with-icon">
              <Phone className="form-label-icon" />
              Phone *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`form-input ${errors.phone ? 'error' : ''}`}
              placeholder="Enter phone number"
            />
            {errors.phone && <p className="error-message">{errors.phone}</p>}
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label className="form-label-with-icon">
              <Calendar className="form-label-icon" />
              Date of Birth *
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className={`form-input ${errors.dateOfBirth ? 'error' : ''}`}
            />
            {errors.dateOfBirth && <p className="error-message">{errors.dateOfBirth}</p>}
          </div>

          <div className="form-group">
            <label className="form-label-with-icon">
              <Calendar className="form-label-icon" />
              Join Date
            </label>
            <input
              type="date"
              name="joinDate"
              value={formData.joinDate}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>

        <div className="form-group form-group-full">
          <label className="form-label-with-icon">
            <MapPin className="form-label-icon" />
            Address *
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`form-textarea ${errors.address ? 'error' : ''}`}
            placeholder="Enter full address"
            rows="3"
          />
          {errors.address && <p className="error-message">{errors.address}</p>}
        </div>

        <div className="form-group form-group-full">
          <label className="form-label-with-icon">
            <CreditCard className="form-label-icon" />
            Membership Type
          </label>
          <select
            name="membershipType"
            value={formData.membershipType}
            onChange={handleChange}
            className="form-select"
          >
            <option value="basic">Basic - $29/month</option>
            <option value="premium">Premium - $49/month</option>
            <option value="vip">VIP - $79/month</option>
            <option value="annual">Annual - $299/year</option>
          </select>
        </div>

        <div className="emergency-section">
          <h3 className="emergency-title">Emergency Contact Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">
                Emergency Contact Name *
              </label>
              <input
                type="text"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                className={`form-input ${errors.emergencyContact ? 'error' : ''}`}
                placeholder="Enter emergency contact name"
              />
              {errors.emergencyContact && <p className="error-message">{errors.emergencyContact}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">
                Emergency Phone *
              </label>
              <input
                type="tel"
                name="emergencyPhone"
                value={formData.emergencyPhone}
                onChange={handleChange}
                className={`form-input ${errors.emergencyPhone ? 'error' : ''}`}
                placeholder="Enter emergency phone number"
              />
              {errors.emergencyPhone && <p className="error-message">{errors.emergencyPhone}</p>}
            </div>
          </div>
        </div>

        <div className="form-group form-group-full">
          <label className="form-label">
            Medical Conditions / Notes
          </label>
          <textarea
            name="medicalConditions"
            value={formData.medicalConditions}
            onChange={handleChange}
            className="form-textarea"
            placeholder="Any medical conditions, allergies, or special notes..."
            rows="3"
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
          >
            {initialData ? 'Update Member' : 'Add Member'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MemberForm;