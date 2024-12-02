import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const TicketInfo = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const { id } = useParams();
    const [ticket, setTicket] = useState({
        title: '',
        description: '',
        observation: '',
        id_state: '',
        department: { title: '' },
        id_user: user.id,
    });

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const response = await fetch(`http://localhost:8181/ticket/${id}`);
                const data = await response.json();
                setTicket(prevTicket => ({
                    ...prevTicket,  
                    ...data,   
                    id_user: prevTicket.id_user,
                }));

            } catch (error) {
                console.error('Erro ao buscar o ticket:', error);
            }
        };

        if (id) {
            fetchTicket();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTicket((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (ticket.id_state === '4' && !ticket.observation.trim()) {
            alert('O campo "Observações" é obrigatório quando o status é "Recusado".');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8181/ticket/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ticket),
            });

            if (response.ok) {
                alert('Ticket atualizado com sucesso!');
                navigate('/home');
            } else {
                alert('Erro ao atualizar o ticket.');
            }
        } catch (error) {
            console.error('Erro ao enviar o ticket:', error);
        }
    };

    if (!ticket.title) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="w-100 h-100 d-flex flex-column align-items-center">
            <nav className="d-flex justify-content-between align-items-center bg-warning navbar navbar-expand-lg w-100 p-0">
                <h5 className="ms-5">TICKETS <i className="bi bi-postcard"></i></h5>
                <div className="d-flex me-5">
                    <ul className="navbar-nav d-flex flex-row gap-2">
                        <li className="nav-item btn-light d-flex flex-row align-items-center">
                            <a type="button" className="btn btn-dark btn-sm w-100" href="/Home">Voltar</a>
                        </li>
                        <li className="nav-item btn-light d-flex flex-row align-items-center me-5">
                            <a type="button" className="btn btn-dark btn-sm w-100" href="/CreateTicket">Novo Ticket</a>
                        </li>
                        <li className="nav-item btn-light d-flex flex-row align-items-center">
                            <i className="bi bi-person-bounding-box fs-4"></i>
                            <a className="nav-link fw-semibold fs-5" href="/Me">{user.name}</a>
                        </li>
                    </ul>
                </div>    
            </nav>
            <form 
                onSubmit={handleSubmit} 
                className="form-login w-50 mx-auto mt-5 border rounded p-5 d-flex flex-column justify-content-center text-start"
            >
                <div className="mb-3 d-flex flex-column">
                    <label htmlFor="title" className="form-label">Título:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="title"
                        name="title" 
                        value={ticket.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3 d-flex flex-row gap-3">
                    <div className="mb-3 d-flex flex-column w-50">
                        <label htmlFor="description" className="form-label">Descrição:</label>
                        <textarea 
                            className="form-control" 
                            id="description"
                            name="description" 
                            rows="3" 
                            value={ticket.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="mb-3 d-flex flex-column w-50">
                        <label htmlFor="observation" className="form-label">Observação:</label>
                        <textarea 
                            className="form-control" 
                            id="observation"
                            name="observation" 
                            rows="3" 
                            value={ticket.observacao}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                </div>    
                <div className='mb-3 d-flex flex-row gap-3'>
                    <div className="mb-3 d-flex flex-column w-50">
                        <label htmlFor="department" className="form-label">Departamento:</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="department" 
                            value={ticket.department?.title || ''} 
                            disabled
                        />
                    </div>
                    <div className="mb-3 d-flex flex-column w-50">
                        <label htmlFor="stateTicket" className="form-label">Status:</label>
                        <select
                            id="stateTicket"
                            name="id_state"
                            value={ticket.id_state}
                            onChange={handleChange}
                            className="form-select"
                            disabled={ticket.id_state === 3 || ticket.id_state === 4}
                        >
                            <option value="1">Pendente</option>
                            <option value="2">Em andamento</option>
                            <option value="3">Recusado</option>
                            <option value="4">Fechado</option>
                        </select>
                    </div>
                </div>    
                <button type="submit" className="btn btn-dark w-75 mx-auto mt-2">Salvar Alterações</button>
            </form>
        </div>
    );
};

export default TicketInfo;
