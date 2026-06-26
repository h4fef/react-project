import {Navigate, Outlet, Route, Routes} from "react-router";
import "./App.css";
import LoginPage from "./pages/Login";
import SigninPage from "./pages/Signin";
import type {ProtectedRouteProps} from "./props/ProtectedRouteProps.ts";
import HomePage from "./pages/Home.tsx";
import 'notyf/notyf.min.css';
import Navigation from "./components/navigation/Navigation.tsx";

const ProtectedRoute = ({user, redirectPath = "/login", children}: ProtectedRouteProps) => {
    if (!user) {
        return <Navigate to={redirectPath} replace/>
    }
    return children ? children : <Outlet/>;
}

function App() {
    const user = sessionStorage.getItem("user") || null;
    return (
        <main className="bg-white w-full h-full">
            {user && <Navigation/>}
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<SigninPage/>}/>
                <Route element={<ProtectedRoute user={user}/>}>
                    <Route path="/home" element={<HomePage/>}/>
                </Route>
            </Routes>
        </main>
    );
}

export default App;
