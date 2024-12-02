import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import EditUser from './EditUser';
import CreateTicket from './CreateTicket';
import TicketInfo from './TicketInfo';
import AutenticatedRoute from './AutenticatedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={<AutenticatedRoute>
                      <Home />
                    </AutenticatedRoute>}
        />
        <Route 
          path="/Me"
          element={<AutenticatedRoute>
                      <EditUser />
                    </AutenticatedRoute>}
        />
        <Route 
          path="/CreateTicket"
          element={<AutenticatedRoute>
                      <CreateTicket />
                    </AutenticatedRoute>}
        />
        <Route 
          path="/TicketInfo/:id" 
          element={<AutenticatedRoute>
                      <TicketInfo />
                    </AutenticatedRoute>} />
      </Routes>
    </Router>
  )
}

export default App;
