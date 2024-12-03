import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import SidebarMenu from '../components/SidebarMenu';

const TicketInfo = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const { id } = useParams();
    const [ticket, setTicket] = useState({
        title: '',
        description: '',
        observacao: '',
        id_state: '',
        department: { title: '' },
        id_user: user.id,
    });

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/ticket/${id}`);
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
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (ticket.id_state === '3' && !ticket.observacao.trim()) {
            alert('O campo "Observações" é obrigatório quando o status é "Recusado".');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/ticket/${id}`, {
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
            <Navbar user={user} handleLogout={handleLogout} />
            <main className="w-100 h-100 d-flex flex-row ">
                <SidebarMenu />
                <div className="d-flex flex-column justify-content-center align-items-center w-100">
                    <h1 className="m-0">Ticket </h1>
                    <form 
                        onSubmit={handleSubmit} 
                        className="form-create bg-dark-subtle w-50 h-75 mx-auto mt-5 border rounded p-5 d-flex flex-column justify-content-center text-start"
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
                                    name="observacao" 
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
            </main>
        </div>
    );
};

export default TicketInfo;
