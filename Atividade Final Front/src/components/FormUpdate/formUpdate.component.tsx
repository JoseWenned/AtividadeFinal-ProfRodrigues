import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

export const FormUpdate = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        course: ""
    });

    useEffect(() => {
        const fetchStudent = async () => {
            const token = localStorage.getItem("token");

            if(!token){
                navigate("/loginPage");
                return;
            };

            try {
                const response = await axios.get(`http://localhost:3000/students/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setFormData({
                    name: response.data.name,
                    email: response.data.email,
                    course: response.data.course
                })
            } catch (error) {
                console.error("Erro ao buscar aluno", error);
                navigate("/loginPage");
            };
        };
        fetchStudent();
    },[id, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        try {
            await axios.put(`http://localhost:3000/students/${id}`, formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            navigate("/adminPage"); // Redireciona para a página de administração após edição
        } catch (error) {
            console.error("Erro ao editar aluno", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return(
        <>
            <section>
                <h2>Editar Aluno</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Course</label>
                        <input
                            type="text"
                            name="course"
                            value={formData.course}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Salvar Alterações</button>
                </form>
            </section>
        </>
    )
}