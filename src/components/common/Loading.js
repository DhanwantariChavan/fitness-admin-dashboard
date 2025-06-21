import React from 'react';

const Loading = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '200px',
      fontSize: '1.2rem',
      color: 'var(--text-secondary)'
    }}>
      Loading...
    </div>
  );
};

export default Loading;