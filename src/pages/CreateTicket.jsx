import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import SidebarMenu from "../components/SidebarMenu";

const CreateTicket = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [ticket, setTicket] = useState({
        title: "",
        description: "",
        observation: "",
        state: "1",
        userId: "",
        id_department: "",
    });
    const [departments, setDepartments] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.id) {
            setTicket((prevTicket) => ({
                ...prevTicket,
                userId: user.id,
            }));
        }
    }, []);

    useEffect(() => {
        getDepartments();
    }, []);

    const getDepartments = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/departments`);
            const fetchedDepartments = response.data;

            setDepartments(fetchedDepartments);

            if (fetchedDepartments.length > 0) {
                setTicket((prevTicket) => ({
                    ...prevTicket,
                    id_department: fetchedDepartments[0].id,
                }));
            }
        } catch (error) {
            alert("Erro ao carregar os departamentos");
        }
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTicket((prevTicket) => ({
            ...prevTicket,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!ticket.id_department) {
                alert("Selecione um departamento!");
                return;
            }

            await axios.post(`${process.env.REACT_APP_API_URL}/ticket`, ticket);
            alert("Ticket criado com sucesso!");
            navigate("/Home");
        } catch (error) {
            alert("Erro ao criar o ticket.");
        }
    };

    return (
        <div className="w-100 h-100 d-flex flex-column align-items-center bg-light">
            <Navbar user={user} handleLogout={handleLogout} />
            <main className="w-100 h-100 d-flex flex-row ">
                <SidebarMenu />
                <div className="d-flex flex-column justify-content-center align-items-center w-100">
                    <h3 className="m-0">Abrir Ticket <i class="bi bi-forward-fill"></i></h3>
                
                    <form
                        className="form-create bg-dark-subtle w-75 h-75 mx-auto mt-2 border rounded p-5 d-flex flex-column justify-content-center text-start"
                        onSubmit={handleSubmit}
                    >
                        <div className="mb-3 d-flex flex-column">
                            <label htmlFor="titleTicket" className="form-label">
                                Título:
                            </label>
                            <input
                                type="text"
                                id="titleTicket"
                                name="title"
                                value={ticket.title}
                                onChange={handleChange}
                                required
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3 d-flex flex-column">
                            <label htmlFor="descriptionTicket" className="form-label">
                                Descrição:
                            </label>
                            <textarea
                                id="descriptionTicket"
                                name="description"
                                value={ticket.description}
                                onChange={handleChange}
                                required
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3 d-flex flex-row gap-2">
                            <div className="d-flex flex-column w-50">
                                <label className="form-label">Departamento:</label>
                                {departments.length > 0 ? (
                                    <select
                                        name="id_department"
                                        className="form-select"
                                        onChange={handleChange}
                                        value={ticket.id_department}
                                    >
                                        {departments.map((department) => (
                                            <option key={department.id} value={department.id}>
                                                {department.title}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <p>Carregando departamentos...</p>
                                )}
                            </div>
                            <div className="d-flex flex-column w-50">
                                <label htmlFor="stateTicket" className="form-label">
                                    Status:
                                </label>
                                <select
                                    id="stateTicket"
                                    name="state"
                                    value={ticket.state}
                                    onChange={handleChange}
                                    required
                                    className="form-select"
                                >
                                    <option value="1">Pendente</option>
                                    <option value="2">Em andamento</option>
                                    <option value="3">Recusado</option>
                                    <option value="4">Fechado</option>
                                </select>
                            </div>
                        </div>
                        <div className="mb-3 d-flex flex-column">
                            <label htmlFor="observationTicket" className="form-label">
                                Observação:
                            </label>
                            <textarea
                                id="observationTicket"
                                name="observation"
                                value={ticket.observation}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <button type="submit" className="btn btn-login btn-dark w-75 mx-auto mt-2">
                            Criar Ticket
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default CreateTicket;
