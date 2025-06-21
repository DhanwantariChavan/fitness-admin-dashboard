export const mockData = {
  members: [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      membershipType: 'Premium',
      joinDate: '2024-01-15',
      status: 'active',
      lastVisit: '2024-06-19',
      phone: '+1234567890'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      membershipType: 'Basic',
      joinDate: '2024-02-20',
      status: 'active',
      lastVisit: '2024-06-18',
      phone: '+1234567891'
    },
    // Add more mock members...
  ],
  
  classes: [
    {
      id: 1,
      name: 'Morning Yoga',
      instructor: 'Sarah Johnson',
      date: '2024-06-20',
      time: '07:00',
      duration: 60,
      capacity: 20,
      enrolled: 15,
      type: 'Yoga'
    },
    {
      id: 2,
      name: 'HIIT Training',
      instructor: 'Mike Wilson',
      date: '2024-06-20',
      time: '18:00',
      duration: 45,
      capacity: 12,
      enrolled: 10,
      type: 'HIIT'
    },
    // Add more mock classes...
  ],
  
  trainers: [
    {
      id: 1,
      name: 'Sarah Johnson',
      specialization: 'Yoga, Pilates',
      experience: '5 years',
      rating: 4.8,
      status: 'active',
      email: 'sarah@fitness.com',
      phone: '+1234567892'
    },
    {
      id: 2,
      name: 'Mike Wilson',
      specialization: 'HIIT, Strength Training',
      experience: '7 years',
      rating: 4.9,
      status: 'active',
      email: 'mike@fitness.com',
      phone: '+1234567893'
    },
    // Add more mock trainers...
  ],
  
  equipment: [
    {
      id: 1,
      name: 'Treadmill #1',
      type: 'Cardio',
      status: 'operational',
      lastMaintenance: '2024-05-15',
      nextMaintenance: '2024-07-15',
      location: 'Main Floor'
    },
    {
      id: 2,
      name: 'Bench Press #1',
      type: 'Strength',
      status: 'maintenance',
      lastMaintenance: '2024-04-10',
      nextMaintenance: '2024-06-10',
      location: 'Weight Room'
    },
    // Add more mock equipment...
  ],
  
  revenue: [
    { month: 'Jan', amount: 25000, memberships: 450 },
    { month: 'Feb', amount: 28000, memberships: 480 },
    { month: 'Mar', amount: 32000, memberships: 520 },
    { month: 'Apr', amount: 30000, memberships: 510 },
    { month: 'May', amount: 35000, memberships: 550 },
    { month: 'Jun', amount: 38000, memberships: 580 }
  ]
};