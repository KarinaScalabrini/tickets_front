import React, { useState, useEffect } from 'react';
import '../styles/Home.css';
import Navbar from '../components/Navbar';
import SidebarMenu from '../components/SidebarMenu';

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
            <Navbar user={user} handleLogout={handleLogout} />
            <div className="m-0 p-0 d-flex justify-content-start flex-row w-100 h-100 gap-4">
                <SidebarMenu />
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
