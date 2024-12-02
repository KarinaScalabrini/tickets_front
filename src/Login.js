import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try{
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {email, password})
            const {token, user} = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user))
            navigate('/home');
        }catch(error){
            setError("Invalid credentials");
        }
    };

    return (
        <div className="login w-100 h-100 d-flex align-items-center flex-column">
            <nav className="d-flex justify-content-between align-items-center p-1 bg-warning navbar navbar-expand-lg w-100 p-0">
                <h5 className="ms-5">TICKETS <i class="bi bi-postcard"></i></h5>
            </nav>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form className="form-login w-25 mx-auto mt-5 rounded p-5 d-flex flex-column justify-content-start" onSubmit={handleSubmit}>
                <h2 className="text-center mb-4 text-warning fs-1">Login</h2>
                <div className="mb-3 d-flex flex-column ">
                    <label for="usuario" className="form-label text-light text-start">Usuário:</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div class="mb-1 d-flex flex-column">
                    <label for="password" className="form-label text-light text-start">Senha:</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <a href="//" className="text-white-50 text-decoration-none text-start fw-semibold registre">Não tem uma conta? Registre-se</a>
                <button type="submit"  className="btn btn-login fw-semibold bg-warning-subtle w-100 mx-auto mt-3">Login</button>
            </form>
        </div>
    );
};

export default Login;