import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Receipt from './components/Receipt';
import Default from './components/Default';
import Calorie from './components/Calorie';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Default />} />
        <Route path="/receipt" element={<Receipt />} />
        <Route path="/calorie" element={<Calorie />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;