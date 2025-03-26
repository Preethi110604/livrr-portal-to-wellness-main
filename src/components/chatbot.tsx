import React from 'react';

const Chatbot = ({ onClose }) => {
  return (
    <div 
      id="chatbot-widget"
      style={{ 
        display: 'block',
        position: 'fixed', 
        bottom: '20px', 
        right: '20px', 
        width: '350px', 
        height: '500px', 
        background: '#f1f1f1', 
        border: '1px solid #ccc', 
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', 
        zIndex: 9999, 
        padding: '20px', 
        overflowY: 'auto'
      }}
    >
      <h3>Chatbot</h3>
      <p>Welcome! How can I assist you today?</p>
      <button 
        onClick={onClose}
        style={{ 
          background: '#007bff', 
          color: '#fff', 
          border: 'none', 
          padding: '10px 20px', 
          cursor: 'pointer' 
        }}
      >
        Close
      </button>
    </div>
  );
};

export default Chatbot;
