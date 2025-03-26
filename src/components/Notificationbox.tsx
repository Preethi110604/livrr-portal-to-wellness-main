import React, { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';  

const NotificationBox: React.FC = () => {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (showNotification) {
      // Auto-hide after 10 seconds
      timer = setTimeout(() => {
        setShowNotification(false);
      }, 10000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [showNotification]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4"></h1>

      <button
        className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 rounded-lg"
        onClick={() => setShowNotification(true)}
      >
        Show Notification
      </button>

      {showNotification && (
        <div className="fixed top-40 left-7 w-80 p-4 bg-green-600 text-white rounded-lg shadow-lg z-50">
          <div className="flex justify-between items-start">
            
          
            <div className="flex items-center">
              <FaBell className="text-yellow-400 mr-2 text-lg" />  
              <h3 className="font-bold">Livr</h3>
            </div>
            
            <button
              className="ml-4 bg-white text-green-600 px-2 rounded hover:bg-green-100"
              onClick={() => setShowNotification(false)}
            >
              X
            </button>
          </div>
          
          <p className="mt-2">Get the latest notifications from Livr!</p>
        </div>
      )}
    </div>
  );
};

export default NotificationBox;
