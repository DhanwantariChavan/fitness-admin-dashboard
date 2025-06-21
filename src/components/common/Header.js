import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import Button from './Button';
import './Header.css';

const Header = ({ toggleSidebar }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header-left">
        <Button onClick={toggleSidebar} variant="ghost">
          ☰
        </Button>
        <h1 className="header-title">Fitness Center Dashboard</h1>
      </div>
      
      <div className="header-right">
        <Button onClick={toggleTheme} variant="ghost">
          {theme === 'light' ? '🌙' : '☀️'}
        </Button>
        <div className="user-avatar">
          <span>Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Header;