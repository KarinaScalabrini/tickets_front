import React, { useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
    const [tickets, setTickets] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {

        const fetchTickets = async () => {
            try {
                
                if (!user || !user.id) {
                    throw new Error('User ID not found in localStorage');
                }
                if(user.admin === true){
                    const response = await fetch(`http://localhost:8181/tickets`);
                    const data = await response.json();
                    setTickets(data);
                }else{
                    const response = await fetch(`http://localhost:8181/tickets/${user.id}`);
                    const data = await response.json();
                    setTickets(data);
                }
            } catch (error) {
                console.error('Erro ao buscar os tickets:', error);
            }
        };

        fetchTickets();
    }, []);

    return (
        <div className="h-100">
            <nav className="d-flex justify-content-between align-items-center bg-warning navbar navbar-expand-lg w-100 p-0">
                <h5 className="ms-5">TICKETS <i class="bi bi-postcard"></i></h5>
                <div className="d-flex me-5">
                    <ul className="navbar-nav d-flex flex-row gap-5">
                        <li className="nav-item btn-light d-flex flex-row align-items-center">
                            <a type="button" className="btn btn-dark btn-sm w-100" href="/CreateTicket">Novo Ticket</a>
                        </li>
                        <li className="nav-item btn-light d-flex flex-row align-items-center">
                            <i class="bi bi-person-bounding-box fs-4"></i>
                            <a className="nav-link fw-semibold fs-5" href="/Me">{user.name}</a>
                        </li>
                    </ul>
                </div>    
            </nav>
            <div className="m-0 p-0 d-flex justify-content-start flex-row w-100 h-100 gap-4">
                <div className='bg-body-secondary w-25 p-3'>
                    <ul className=' nav w-100 gap-3 d-flex flex-column align-items-center justify-content-center rounded'>
                        <li className='h-25 w-100 mt-4 p-4 shadow  bg-dark-subtle rounded'></li>
                        <li className='h-25 w-100  p-4 shadow  bg-dark-subtle rounded'></li>
                        <li className='h-25 w-100 p-4 shadow bg-dark-subtle rounded'></li>
                        <li className='h-25 w-100 p-4 shadow  bg-dark-subtle rounded'></li>
                        <li className='h-25 w-100 p-4 shadow bg-dark-subtle rounded'></li>
                        <li className='h-25 w-100 p-4 shadow  bg-dark-subtle rounded'></li>
                        <li className='h-25 w-100 p-4 shadow bg-dark-subtle rounded'></li>
                        <li className='h-25 w-100 p-4 shadow  bg-dark-subtle rounded'></li>
                    </ul>
                </div>
                <div className='d-flex justify-content-start align-items-start flex-column w-75'>
                    <h1 className="mt-5 mb-5 text-start">Meus Tickets <i class="bi bi-tags-fill"></i></h1>
                    <table class="table">
                        <thead>
                            <tr>
                            <th scope="col"><i class="bi bi-list-nested"></i> Título</th>
                            <th scope="col"><i class="bi bi-ui-checks"></i> Status</th>
                            <th scope="col"><i class="bi bi-diagram-2"></i> Departamento</th>
                            <th scope="col"><i class="bi bi-card-checklist"></i> Criado em</th>
                            <th scope="col"><i class="bi bi-calendar-check"></i> Atualização</th>
                            <th scope="col"><i class="bi bi-sort-down"></i></th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.map((ticket) => (
                                <tr key={ticket.id}>
                                <td>{ticket.title}</td>
                                <td>{ticket.state.title}</td>
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
