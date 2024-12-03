import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Navbar = ({ user, handleLogout }) => {
  const location = useLocation();

  return (
    <nav className="d-flex justify-content-between align-items-center bg-warning navbar navbar-expand-lg w-100 p-0">
      <h5 className="ms-5">
        TICKETS <i className="bi bi-postcard"></i>
      </h5>
      <div className="d-flex me-5">
        <ul className="navbar-nav d-flex flex-row gap-3">
          {location.pathname !== '/home' && (
            <li className="nav-item btn-light d-flex flex-row align-items-center">
              <Link
                to="/home"
                className="btn btn-dark btn-sm"
              >
                Voltar
              </Link>
            </li>
          )}
          <li className="nav-item btn-light d-flex flex-row align-items-center">
            <a
              type="button"
              className="btn btn-dark btn-sm w-100"
              href="/CreateTicket"
            >
              Novo Ticket
            </a>
          </li>
          <li className="nav-item btn-light d-flex flex-row align-items-center">
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
          <li className="nav-item ms-5 btn-light d-flex flex-row align-items-center">
            <i className="bi bi-person-bounding-box fs-4"></i>
            <a className="nav-link fw-semibold fs-5" href="/Me">
              {user.name}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
