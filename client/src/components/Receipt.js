import React, { useState, useEffect } from 'react';

function Receipt() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/data')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}

export default Receipt;