import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: any) => {

    const token = localStorage.getItem("token");
    if(!token){
        console.log("Token inválido ou ausente. Redirecionando para a página de login.");
        return <Navigate to="/loginPage" />;
    }
    return token ? children : <Navigate to="/login"/>
    
};