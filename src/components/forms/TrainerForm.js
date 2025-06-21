import React, { useState } from 'react';
import './TrainerForm.css';

const TrainerForm = ({ onSubmit, onCancel, initialData = null }) => {
  const [formData, setFormData] = useState({
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    dateOfBirth: initialData?.dateOfBirth || '',
    gender: initialData?.gender || '',
    address: initialData?.address || '',
    city: initialData?.city || '',
    state: initialData?.state || '',
    zipCode: initialData?.zipCode || '',
    emergencyContact: initialData?.emergencyContact || '',
    emergencyPhone: initialData?.emergencyPhone || '',
    specializations: initialData?.specializations || [],
    certifications: initialData?.certifications || '',
    experience: initialData?.experience || '',
    hourlyRate: initialData?.hourlyRate || '',
    availability: initialData?.availability || {
      monday: { available: false, startTime: '', endTime: '' },
      tuesday: { available: false, startTime: '', endTime: '' },
      wednesday: { available: false, startTime: '', endTime: '' },
      thursday: { available: false, startTime: '', endTime: '' },
      friday: { available: false, startTime: '', endTime: '' },
      saturday: { available: false, startTime: '', endTime: '' },
      sunday: { available: false, startTime: '', endTime: '' }
    },
    isActive: initialData?.isActive !== undefined ? initialData.isActive : true,
    bio: initialData?.bio || '',
    profileImage: initialData?.profileImage || '',
    socialMedia: initialData?.socialMedia || {
      instagram: '',
      facebook: '',
      twitter: ''
    },
    languages: initialData?.languages || []
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const specializationOptions = [
    'Personal Training',
    'Weight Training',
    'Cardio Training',
    'Yoga',
    'Pilates',
    'CrossFit',
    'Martial Arts',
    'Swimming',
    'Dance Fitness',
    'Nutrition Counseling',
    'Rehabilitation',
    'Sports Training'
  ];

  const languageOptions = [
    'English',
    'Spanish',
    'French',
    'German',
    'Italian',
    'Portuguese',
    'Hindi',
    'Mandarin',
    'Japanese',
    'Korean'
  ];

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox' && name === 'specializations') {
      setFormData(prev => ({
        ...prev,
        specializations: checked 
          ? [...prev.specializations, value]
          : prev.specializations.filter(spec => spec !== value)
      }));
    } else if (type === 'checkbox' && name === 'languages') {
      setFormData(prev => ({
        ...prev,
        languages: checked 
          ? [...prev.languages, value]
          : prev.languages.filter(lang => lang !== value)
      }));
    } else if (name.includes('.')) {
      const [parent, child, subChild] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: subChild ? {
            ...prev[parent][child],
            [subChild]: type === 'checkbox' ? checked : value
          } : (type === 'checkbox' ? checked : value)
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.experience) newErrors.experience = 'Experience is required';
    if (!formData.hourlyRate) {
      newErrors.hourlyRate = 'Hourly rate is required';
    } else if (isNaN(formData.hourlyRate) || parseFloat(formData.hourlyRate) <= 0) {
      newErrors.hourlyRate = 'Hourly rate must be a positive number';
    }

    // Specializations validation
    if (formData.specializations.length === 0) {
      newErrors.specializations = 'At least one specialization is required';
    }

    // Emergency contact validation
    if (!formData.emergencyContact.trim()) newErrors.emergencyContact = 'Emergency contact is required';
    if (!formData.emergencyPhone.trim()) {
      newErrors.emergencyPhone = 'Emergency phone is required';
    } else if (!/^\d{10}$/.test(formData.emergencyPhone.replace(/\D/g, ''))) {
      newErrors.emergencyPhone = 'Emergency phone must be 10 digits';
    }

    // Age validation (must be 18+)
    if (formData.dateOfBirth) {
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      if (age < 18) {
        newErrors.dateOfBirth = 'Trainer must be at least 18 years old';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/\D/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  return (
    <div className={`trainer-form-container ${isLoading ? 'form-loading' : ''}`}>
      <div className="form-header">
        <svg className="form-header-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <h1 className="form-title">
          {initialData ? 'Edit Trainer' : 'Add New Trainer'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="form-content">
        {/* Personal Information Section */}
        <div className="form-section">
          <h2 className="section-title">Personal Information</h2>
          <div className="form-grid">
            <div className="form-field">
              <label className="form-label">
                <span className="form-label-icon">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  First Name <span className="required-asterisk">*</span>
                </span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`form-input ${errors.firstName ? 'error' : ''}`}
                placeholder="Enter first name"
              />
              {errors.firstName && <span className="error-message">{errors.firstName}</span>}
            </div>

            <div className="form-field">
              <label className="form-label">
                <span className="form-label-icon">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  Last Name <span className="required-asterisk">*</span>
                </span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`form-input ${errors.lastName ? 'error' : ''}`}
                placeholder="Enter last name"
              />
              {errors.lastName && <span className="error-message">{errors.lastName}</span>}
            </div>

            <div className="form-field">
              <label className="form-label">
                <span className="form-label-icon">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  Email <span className="required-asterisk">*</span>
                </span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="Enter email address"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-field">
              <label className="form-label">
                <span className="form-label-icon">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  Phone <span className="required-asterisk">*</span>
                </span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formatPhoneNumber(formData.phone)}
                onChange={(e) => handleInputChange({
                  target: { name: 'phone', value: e.target.value.replace(/\D/g, '') }
                })}
                className={`form-input ${errors.phone ? 'error' : ''}`}
                placeholder="(555) 123-4567"
                maxLength="14"
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            <div className="form-field">
              <label className="form-label">
                <span className="form-label-icon">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2.5-9H19V1h-2v1H7V1H5v1H4.5C3.67 2 3 2.67 3 3.5v17C3 21.33 3.67 22 4.5 22h15c.83 0 1.5-.67 1.5-1.5v-17C21 2.67 20.33 2 19.5 2zM19.5 20.5h-15v-13h15v13z"/>
                  </svg>
                  Date of Birth <span className="required-asterisk">*</span>
                </span>
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className={`form-input ${errors.dateOfBirth ? 'error' : ''}`}
                max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
              />
              {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
            </div>

            <div className="form-field">
              <label className="form-label">
                Gender <span className="required-asterisk">*</span>
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className={`form-select ${errors.gender ? 'error' : ''}`}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
              {errors.gender && <span className="error-message">{errors.gender}</span>}
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="form-section">
          <h2 className="section-title">Address Information</h2>
          <div className="form-grid">
            <div className="form-field form-grid-full">
              <label className="form-label">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter street address"
              />
            </div>

            <div className="form-field">
              <label className="form-label">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter city"
              />
            </div>

            <div className="form-field">
              <label className="form-label">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter state"
              />
            </div>

            <div className="form-field">
              <label className="form-label">ZIP Code</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter ZIP code"
                maxLength="10"
              />
            </div>
          </div>
        </div>

        {/* Emergency Contact Section */}
        <div className="form-section">
          <h2 className="section-title">Emergency Contact</h2>
          <div className="form-grid">
            <div className="form-field">
              <label className="form-label">
                Emergency Contact Name <span className="required-asterisk">*</span>
              </label>
              <input
                type="text"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleInputChange}
                className={`form-input ${errors.emergencyContact ? 'error' : ''}`}
                placeholder="Enter emergency contact name"
              />
              {errors.emergencyContact && <span className="error-message">{errors.emergencyContact}</span>}
            </div>

            <div className="form-field">
              <label className="form-label">
                Emergency Phone <span className="required-asterisk">*</span>
              </label>
              <input
                type="tel"
                name="emergencyPhone"
                value={formatPhoneNumber(formData.emergencyPhone)}
                onChange={(e) => handleInputChange({
                  target: { name: 'emergencyPhone', value: e.target.value.replace(/\D/g, '') }
                })}
                className={`form-input ${errors.emergencyPhone ? 'error' : ''}`}
                placeholder="(555) 123-4567"
                maxLength="14"
              />
              {errors.emergencyPhone && <span className="error-message">{errors.emergencyPhone}</span>}
            </div>
          </div>
        </div>

        {/* Professional Information Section */}
        <div className="form-section">
          <h2 className="section-title">Professional Information</h2>
          <div className="form-grid">
            <div className="form-field">
              <label className="form-label">
                Experience (Years) <span className="required-asterisk">*</span>
              </label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                className={`form-select ${errors.experience ? 'error' : ''}`}
              >
                <option value="">Select experience</option>
                <option value="0-1">0-1 years</option>
                <option value="1-3">1-3 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5-10">5-10 years</option>
                <option value="10+">10+ years</option>
              </select>
              {errors.experience && <span className="error-message">{errors.experience}</span>}
            </div>

            <div className="form-field">
              <label className="form-label">
                Hourly Rate ($) <span className="required-asterisk">*</span>
              </label>
              <input
                type="number"
                name="hourlyRate"
                value={formData.hourlyRate}
                onChange={handleInputChange}
                className={`form-input ${errors.hourlyRate ? 'error' : ''}`}
                placeholder="Enter hourly rate"
                min="0"
                step="0.01"
              />
              {errors.hourlyRate && <span className="error-message">{errors.hourlyRate}</span>}
            </div>

            <div className="form-field form-grid-full">
              <label className="form-label">
                Specializations <span className="required-asterisk">*</span>
              </label>
              <div className="checkbox-grid">
                {specializationOptions.map(spec => (
                  <div key={spec} className="checkbox-container">
                    <input
                      type="checkbox"
                      name="specializations"
                      value={spec}
                      checked={formData.specializations.includes(spec)}
                      onChange={handleInputChange}
                      className="form-checkbox"
                      id={`spec-${spec}`}
                    />
                    <label htmlFor={`spec-${spec}`} className="checkbox-label">{spec}</label>
                  </div>
                ))}
              </div>
              {errors.specializations && <span className="error-message">{errors.specializations}</span>}
            </div>

            <div className="form-field form-grid-full">
              <label className="form-label">Certifications</label>
              <textarea
                name="certifications"
                value={formData.certifications}
                onChange={handleInputChange}
                className="form-textarea"
                placeholder="List your certifications (one per line)"
                rows="4"
              />
            </div>

            <div className="form-field form-grid-full">
              <label className="form-label">Languages</label>
              <div className="checkbox-grid">
                {languageOptions.map(lang => (
                  <div key={lang} className="checkbox-container">
                    <input
                      type="checkbox"
                      name="languages"
                      value={lang}
                      checked={formData.languages.includes(lang)}
                      onChange={handleInputChange}
                      className="form-checkbox"
                      id={`lang-${lang}`}
                    />
                    <label htmlFor={`lang-${lang}`} className="checkbox-label">{lang}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Availability Section */}
        <div className="form-section">
          <h2 className="section-title">Availability</h2>
          <div className="availability-grid">
            {days.map(day => (
              <div key={day} className="availability-day">
                <div className="day-header">
                  <input
                    type="checkbox"
                    name={`availability.${day}.available`}
                    checked={formData.availability[day].available}
                    onChange={handleInputChange}
                    className="form-checkbox"
                    id={`${day}-available`}
                  />
                  <label htmlFor={`${day}-available`} className="day-label">
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </label>
                </div>
                {formData.availability[day].available && (
                  <div className="time-inputs">
                    <input
                      type="time"
                      name={`availability.${day}.startTime`}
                      value={formData.availability[day].startTime}
                      onChange={handleInputChange}
                      className="form-input time-input"
                    />
                    <span className="time-separator">to</span>
                    <input
                      type="time"
                      name={`availability.${day}.endTime`}
                      value={formData.availability[day].endTime}
                      onChange={handleInputChange}
                      className="form-input time-input"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="form-section">
          <h2 className="section-title">Additional Information</h2>
          <div className="form-grid">
            <div className="form-field form-grid-full">
              <label className="form-label">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="form-textarea"
                placeholder="Tell us about yourself, your training philosophy, and what makes you unique as a trainer..."
                rows="4"
              />
            </div>

            <div className="form-field">
              <label className="form-label">Instagram</label>
              <input
                type="text"
                name="socialMedia.instagram"
                value={formData.socialMedia.instagram}
                onChange={handleInputChange}
                className="form-input"
                placeholder="@username"
              />
            </div>

            <div className="form-field">
              <label className="form-label">Facebook</label>
              <input
                type="text"
                name="socialMedia.facebook"
                value={formData.socialMedia.facebook}
                onChange={handleInputChange}
                className="form-input"
                placeholder="facebook.com/username"
              />
            </div>

            <div className="form-field">
              <label className="form-label">Twitter</label>
              <input
                type="text"
                name="socialMedia.twitter"
                value={formData.socialMedia.twitter}
                onChange={handleInputChange}
                className="form-input"
                placeholder="@username"
              />
            </div>

            <div className="form-field">
              <label className="form-label">Profile Image URL</label>
              <input
                type="url"
                name="profileImage"
                value={formData.profileImage}
                onChange={handleInputChange}
                className="form-input"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="checkbox-container">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
                className="form-checkbox"
                id="isActive"
              />
              <label htmlFor="isActive" className="checkbox-label">
                Active Trainer (Available for bookings)
              </label>
            </div>
          </div>
        </div>

        <div className="button-container">
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-cancel"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : (initialData ? 'Update Trainer' : 'Add Trainer')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TrainerForm;