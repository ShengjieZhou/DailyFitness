import React, { useState, useEffect } from 'react';
import Header from './Header';  
import Sidebar from './Sidebar';  
import DefaultPage from '../assets/DefaultPage.png';

function Default() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/data')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <Header />
      <div className="grid grid-cols-only-content lg:grid-cols-sidebar-content 2xl:grid-cols-sidebar-content-toc">
        <Sidebar />
        <main className="min-w-0 isolate">
          <div className="pl-0">
            <div className="px-5 sm:px-12 pt-3.5">
              <div className="max-w-4xl ml-0 2xl:mx-auto">
                <img src={DefaultPage} alt="Default Page"/>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Default;