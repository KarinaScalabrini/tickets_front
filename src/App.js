import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import AutenticatedRoute from './AutenticatedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={<AutenticatedRoute />}
        />
      </Routes>
    </Router>
  )
}

export default App;
