import React, {useState} from "react";
import './Login.css';
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try{
            const response = await axios.post('http://localhost:8181/login', {email, password})
            const {token} = response.data;

            localStorage.setItem("token", token);

        }catch(error){
            setError("Invalid credentials");
        }
    };

    return (
        <div className="w-100 h-100 d-flex align-items-center">
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form className="form-login w-25 mx-auto border rounded p-5 d-flex flex-column justify-content-center" onSubmit={handleSubmit}>
                <div className="mb-3 d-flex flex-column">
                    <label for="exampleFormControlInput1" className="form-label">Usuário:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div class="mb-3 d-flex flex-column">
                    <label for="exampleFormControlTextarea1" className="form-label">Senha:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit"  className="btn btn-login w-75 mx-auto mt-2">Login</button>
            </form>
        </div>
    );
};

export default Login;