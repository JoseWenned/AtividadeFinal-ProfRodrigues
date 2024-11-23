import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home/home.page";
import { LoginPage } from "../pages/Login/login.page";
import { RegisterPage } from "../pages/Register/register.page";
import { AdministrativePage } from "../pages/Administrative/administrative.page";
import { ProtectedRoute } from "../components/ProtectedRoute/protectedRoute.component";
import { UpdateStudent } from "../pages/UpdateStudent/updateStudent.page";

export const AppRoutes = () => {
    return(
        <>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/loginPage" element={<LoginPage/>}/>
                <Route path="/registerPage" element={<RegisterPage/>}/>
                <Route path="/adminPage" 
                element={
                    <ProtectedRoute>
                        <AdministrativePage/>
                    </ProtectedRoute>
                }/>
                <Route path="/studentsUpdate/:id" 
                element={
                    <ProtectedRoute>
                        <UpdateStudent/>
                    </ProtectedRoute>
                }/>
            </Routes>
        </>
    );
};