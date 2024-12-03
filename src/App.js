import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import EditUser from './pages/EditUser';
import CreateTicket from './pages/CreateTicket';
import TicketInfo from './pages/TicketInfo';
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
