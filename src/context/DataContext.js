import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockData } from '../services/mockData';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [members, setMembers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMembers(mockData.members);
      setClasses(mockData.classes);
      setTrainers(mockData.trainers);
      setEquipment(mockData.equipment);
      setRevenue(mockData.revenue);
      setLoading(false);
    }, 1000);
  }, []);

  const value = {
    members,
    classes,
    trainers,
    equipment,
    revenue,
    loading,
    setMembers,
    setClasses,
    setTrainers,
    setEquipment,
    setRevenue
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};