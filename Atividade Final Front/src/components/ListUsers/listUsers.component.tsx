import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface Student {
    _id: string;
    name: string;
    email: string;
    password: string;
    course: string;
}

export const ListUsers = () => {

    const [students, setStudents] = useState<Student[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudents = async () => {
            const token = localStorage.getItem("token");

            try {
                const response = await axios.get("http://localhost:3000/students", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setStudents(response.data);
            } catch (error) {
                navigate("/loginPage");
            };
        };

        fetchStudents();
    }, [navigate]);

    // Function Delete

    const handleDelete = async (id: string) => {
        const token = localStorage.getItem("token");

        try {
            await axios.delete(`http://localhost:3000/students/${id}`,{
                headers: {Authorization: `Bearer ${token}`},
            });

            setStudents(students.filter(students => students._id !== id));
            navigate("/")
        } catch (error) {
            console.error("Erro ao excluir aluno", error);
        };
    };

    // Function Update

    const handleUpdate = async (id: string) =>{
        navigate(`/studentsUpdate/${id}`);
    };

    return(
        <>
            <div>
                <h2>Gestão de Alunos</h2>
                <ul>
                    {students.map((students) => (
                        <li key={students._id}>
                            {students.name} - {students.course}
                            <button onClick={() => handleUpdate(students._id)}>Editar</button>
                            <button onClick={() => handleDelete(students._id)}>Excluir</button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};