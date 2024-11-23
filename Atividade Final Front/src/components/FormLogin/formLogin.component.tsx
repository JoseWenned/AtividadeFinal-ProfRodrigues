import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const FormLogin = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async(event: { preventDefault: () => void; }) => {
        event.preventDefault();

        try {
            const response = await axios.post("http://localhost:3000/login", {
                email,
                password
            });

            localStorage.setItem("token", response.data.token);
            console.log("Redirecionando para a página administrativa...");
            navigate("/adminPage");
        } catch (error) {
            if(axios.isAxiosError(error)){
                setError(error.response?.data?.error || "Error ao conectar ao servidor!");
            } else {
                setError("Error desconhecido!");
            };
        };
    };

    return(
        <>
            <section>
                <div>
                    <h1>Login</h1>
                    
                    <form onSubmit={handleLogin}>
                        <label htmlFor="email">E-mail</label>
                        <input name="email" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="enter your email here" required/>

                        <label htmlFor="password">password</label>
                        <input name="password" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="enter your password here" required/>

                        <button type="submit">Entrar</button>
                    </form>

                    {error && <p>{error}</p>}
                </div>
            </section>
        </>
    );
};