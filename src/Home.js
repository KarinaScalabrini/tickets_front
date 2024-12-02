import React, { useState, useEffect } from 'react';
import './Home.css'

const Home = () => {
    const [tickets, setTickets] = useState([]);
    const [filteredTickets, setFilteredTickets] = useState([]);
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                if (!user || !user.id) {
                    throw new Error('User ID not found in localStorage');
                }
                if (user.admin === true) {
                    const response = await fetch(`${process.env.REACT_APP_API_URL}/tickets`);
                    const data = await response.json();
                    setTickets(data);
                    setFilteredTickets(data);
                } else {
                    const response = await fetch(`${process.env.REACT_APP_API_URL}/tickets/${user.id}`);
                    const data = await response.json();
                    setTickets(data);
                    setFilteredTickets(data);
                }
            } catch (error) {
                console.error('Erro ao buscar os tickets:', error);
            }
        };

        fetchTickets();
    }, []);

    useEffect(() => {
        if (selectedStatuses.length === 0) {
            setFilteredTickets(tickets);
        } else {
            const filtered = tickets.filter(ticket =>
                selectedStatuses.includes(ticket.state.title)
            );
            setFilteredTickets(filtered);
        }
    }, [selectedStatuses, tickets]);

    const handleStatusToggle = (status) => {
        setSelectedStatuses(prev =>
            prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
        );
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'Pendente':
                return 'bg-warning';
            case 'Em andamento':
                return 'bg-primary';
            case 'Recusado':
                return 'bg-danger';
            case 'Fechado':
                return 'bg-success';
            default:
                return 'bg-secondary';
        }
    };

    return (
        <div className="h-100">
            <nav className="d-flex justify-content-between align-items-center bg-warning navbar navbar-expand-lg w-100 p-0">
                <h5 className="ms-5">TICKETS <i className="bi bi-postcard"></i></h5>
                <div className="d-flex me-5">
                    <ul className="navbar-nav d-flex flex-row gap-3">
                        <li className="nav-item btn-light d-flex flex-row align-items-center">
                            <a type="button" className="btn btn-dark btn-sm w-100" href="/CreateTicket">Novo Ticket</a>
                        </li>
                        <li className="nav-item btn-light d-flex flex-row align-items-center">
                            <button type="button" className="btn btn-danger btn-sm" onClick={handleLogout}>Logout</button>
                        </li>
                        <li className="nav-item ms-5 btn-light d-flex flex-row align-items-center">
                            <i className="bi bi-person-bounding-box fs-4"></i>
                            <a className="nav-link fw-semibold fs-5" href="/Me">{user.name}</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="m-0 p-0 d-flex justify-content-start flex-row w-100 h-100 gap-4">
                <div className='bg-body-secondary w-25 p-3'>
                    <ul className='ulMenu nav w-100 gap-1 d-flex flex-column align-items-center justify-content-center rounded'>
                        <li className='h-25 w-100 p-1 mb-2 mt-3 border-bottom rounded d-flex flex-row align-items-center justify-content-between'>
                            <h4 className='text-center m-0 fw-medium'>Visualizações </h4>
                            <i className="bi bi-caret-down-fill fw-medium"></i>
                        </li>
                        <li className='h-25 w-100 p-0 rounded d-flex flex-row align-items-center justify-content-between mb-2 mt-5'>
                            <p className='text-center m-0 fw-medium text-danger '><i className="bi bi-fire"></i> Urgentes</p>
                            <p className='text-center m-0 fw-medium text-danger '>1</p>
                        </li>
                        <li className='h-25 w-100 p-0 rounded d-flex flex-row align-items-center justify-content-between mb-2'>
                            <p className='text-center m-0 fw-medium'><i className="bi bi-envelope-check"></i> Emails</p>
                            <p className='text-center m-0 fw-medium'>257</p>
                        </li>
                        <li className='h-25 w-100 p-0 rounded d-flex flex-row align-items-center justify-content-between mb-2'>
                            <p className='text-center m-0 fw-medium text-success'><i className="bi bi-check-circle"></i> Resolvidos</p>
                            <p className='text-center m-0 fw-medium text-success'>15</p>
                        </li>
                        <li className='h-25 w-100 p-0 rounded d-flex flex-row align-items-center justify-content-between mb-2'>
                            <p className='text-center m-0 fw-medium text-body-secondary'><i className="bi bi-arrow-clockwise"></i> Tickets Atualizados</p>
                            <p className='text-center m-0 fw-medium text-body-secondary'>15</p>
                        </li>
                        <li className='h-25 w-100 p-0 rounded d-flex flex-row align-items-center justify-content-between mb-2'>
                            <p className='text-center m-0 text-danger fw-medium'><i className="bi bi-x-lg"></i> Tickets Deletados</p>
                            <p className='text-center m-0 text-danger fw-medium'>0</p>
                        </li>
                        <li className='h-25 w-100 p-0 rounded d-flex flex-row align-items-center justify-content-between mb-5'>
                            <p className='text-center m-0 fw-medium'><i className="bi bi-slash-circle"></i> Tickets Recusados</p>
                            <p className='text-center m-0 fw-medium'>2</p>
                        </li>
                        <li className='h-25 w-100 p-1 border-top rounded d-flex flex-row align-items-center justify-content-between mt-4'>
                            <p className='text-center m-0 fw-medium'>Mais</p>
                            <i className="bi bi-arrow-right-short fw-medium"></i>
                        </li>
                    </ul>
                </div>
                <div className='d-flex justify-content-start align-items-start flex-column w-75'>
                    <h1 className="mt-5 mb-5 text-start">Meus Tickets <i className="bi bi-tags-fill"></i></h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col"><i className="bi bi-list-nested"></i> Título</th>
                                <th scope="col"><i className="bi bi-ui-checks"></i> Status</th>
                                <th scope="col"><i className="bi bi-diagram-2"></i> Departamento</th>
                                <th scope="col"><i className="bi bi-card-checklist"></i> Criado em</th>
                                <th scope="col"><i className="bi bi-calendar-check"></i> Atualização</th>
                                <th scope="col">
                                    <div className="dropdown">
                                        <span className="dropdown-toggle btn-sm p-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="bi bi-funnel-fill"></i>
                                        </span>
                                        <ul className="dropdown-menu p-2">
                                            {['Pendente', 'Em andamento', 'Recusado', 'Fechado'].map(status => (
                                                <li key={status}>
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedStatuses.includes(status)}
                                                            onChange={() => handleStatusToggle(status)}
                                                        />
                                                        {status}
                                                    </label>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTickets.map((ticket) => (
                                <tr key={ticket.id}>
                                    <td>{ticket.title}</td>
                                    <td>
                                        <span className={`badge ${getStatusBadgeClass(ticket.state.title)}`}>{ticket.state.title}</span>
                                    </td>
                                    <td>{ticket.department.title}</td>
                                    <td>{new Date(ticket.created_at).toLocaleDateString()}</td>
                                    <td>{new Date(ticket.updated_at).toLocaleDateString()}</td>
                                    <td>
                                        <a href={`/TicketInfo/${ticket.id}`} className="btn btn-secondary btn-sm w-75">Ver</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Home;
