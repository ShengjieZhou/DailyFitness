import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Recipe from './components/Recipe';
import Default from './components/Default';
import Calorie from './components/Calorie';
import Dietary from './components/Dietary';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Default />} />
        <Route path="/recipe" element={<Recipe />} />
        <Route path="/calorie" element={<Calorie />} />
        <Route path="/dietary" element={<Dietary />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;