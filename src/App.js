import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider } from './context/DataContext';
import Layout from './components/common/Layout';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import Classes from './pages/Classes';
import Trainers from './pages/Trainers';
import Equipment from './pages/Equipment';
import Revenue from './pages/Revenue';
import Calendar from './components/calendar/Calendar';
import MemberForm from './components/forms/MemberForm';
import ClassForm from './components/forms/ClassForm';
import TrainerForm from './components/forms/TrainerForm';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/members" element={<Members />} />
              <Route path="/classes" element={<Classes />} />
              <Route path="/trainers" element={<Trainers />} />
              <Route path="/equipment" element={<Equipment />} />
              <Route path="/revenue" element={<Revenue />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/members/new" element={<MemberForm />} />
              <Route path="/classes/new" element={<ClassForm />} />
              <Route path="/trainers/new" element={<TrainerForm />} />
            </Routes>
          </Layout>
        </Router>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;