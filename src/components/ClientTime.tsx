'use client';

import { useState, useEffect } from 'react';

export default function ClientTime() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="absolute top-0 right-0 -mt-3 mr-4 bg-white dark:bg-black px-2 text-sm">
      {time}
    </div>
  );
} 