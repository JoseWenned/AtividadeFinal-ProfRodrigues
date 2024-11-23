import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const FormRegister = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        course: ""
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        try {
            await axios.post("http://localhost:3000/students", formData);
            navigate("/loginPage");
        } catch (error) {
            if(axios.isAxiosError(error)){
                setError(error.response?.data?.error || "Error ao conectar ao servidor!");
            } else {
                setError("Error desconhecido!");
            };
        };
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name,value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    return(
        <>
            <section>
                <div>
                    <h1>Register</h1>
                    
                    <form onSubmit={handleRegister}>
                        <label htmlFor="name">Name</label>
                        <input name="name" id="name" type="name" placeholder="enter your name here" value={formData.name} onChange={handleChange} required/>

                        <label htmlFor="email">E-mail</label>
                        <input name="email" id="email" type="email" placeholder="enter your email here" value={formData.email} onChange={handleChange} required/>

                        <label htmlFor="password">Password</label>
                        <input name="password" id="password" type="password" placeholder="enter your password here" value={formData.password} onChange={handleChange} required/>

                        <label htmlFor="course">Course</label>
                        <input name="course" id="course" type="text" placeholder="enter your course here" value={formData.course} onChange={handleChange} required/>

                        <button type="submit">Registrar</button>
                    </form>

                    {error && <p>{error}</p>}
                </div>
            </section>
        </>
    );
};