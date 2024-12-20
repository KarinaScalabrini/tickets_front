import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import SidebarMenu from '../components/SidebarMenu';

const EditUser = () => {
    const [user, setUser] = useState({
        name: "",
        password: "",
        id_department: 1, 
    });
    const [departments, setDepartments] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser({ ...parsedUser, password: "" });
        }
        getDepartments();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = { ...user };

            if (!updatedUser.password) {
                delete updatedUser.password;
            }
            await axios.put(`${process.env.REACT_APP_API_URL}/users/${user.id}`, updatedUser);

            localStorage.setItem("user", JSON.stringify(updatedUser));
            alert("Usuário atualizado com sucesso!");
        } catch (error) {
            setError("Erro ao atualizar o usuário");
        }
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    const getDepartments = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/departments`);
            const fetchedDepartments = response.data;

            setDepartments(fetchedDepartments);

            if (!fetchedDepartments.some(dept => dept.id === user.id_department)) {
                setUser(prevUser => ({
                    ...prevUser,
                    id_department: fetchedDepartments[0]?.id || 1,
                }));
            }
        } catch (error) {
            setError("Erro ao carregar os departamentos");
        }
    };

    return (
        <div className="h-100">
            <Navbar user={user} handleLogout={handleLogout} />
            <main className="w-100 h-100 d-flex flex-row ">
                <SidebarMenu />
                <div className="d-flex flex-column justify-content-center align-items-center w-100">
                    <h2>Meus Dados <i class="bi bi-pencil"></i></h2>
                <form
                    className="bg-dark-subtle w-50 h-50 mx-auto mt-5 border rounded p-5 d-flex flex-column justify-content-center text-start"
                    onSubmit={handleSubmit}
                >
                    <div className="mb-3 d-flex flex-column">
                        <label className="form-label">Nome:</label>
                        <input
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3 d-flex flex-row justify-content-between gap-2">
                        <div className="mb-3 d-flex flex-column w-50">
                            <label className="form-label">Senha:</label>
                            <input
                                type="password"
                                name="password"
                                value={user.password || ""}
                                onChange={handleInputChange}
                                className="form-control"
                                placeholder='Nova senha'
                            />
                        </div>
                        <div className="mb-3 d-flex flex-column w-50">
                            <label className="form-label">Departamento:</label>
                            {departments.length > 0 ? (
                                <select
                                    name="id_department"
                                    value={user.id_department}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            id_department: parseInt(e.target.value, 10),
                                        })
                                    }
                                    className="form-select"
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
                    </div>
                    <button type="submit" className="btn btn-dark w-75 mx-auto mt-2">
                        Salvar
                    </button>
                </form>
            </div>
                {error && <p className="text-danger text-center mt-2">{error}</p>}
            </main>
        </div>
    );
};

export default EditUser;
