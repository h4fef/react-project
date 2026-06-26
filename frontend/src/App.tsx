import {Navigate, Outlet, Route, Routes} from "react-router";
import "./App.css";
import LoginPage from "./pages/Login";
import SigninPage from "./pages/Signin";
import type {ProtectedRouteProps} from "./props/ProtectedRouteProps.ts";
import HomePage from "./pages/Home.tsx";
import 'notyf/notyf.min.css';
import Layout from "./components/layout/Layout.tsx";
import InventaryPage from "./pages/Inventary.tsx";
import ReportsPage from "./pages/Report.tsx";
import OrdersPage from "./pages/Orders.tsx";
import ProfilePage from "./pages/Profile.tsx";
import StorePage from "./pages/Store.tsx";
import SettingsPage from "./pages/Settings.tsx";
import SuppliersPage from "./pages/Suppliers.tsx";

const ProtectedRoute = ({user, redirectPath = "/login"}: ProtectedRouteProps) => {
    if (!user) {
        return <Navigate to={redirectPath} replace/>
    }
    return <Layout><Outlet/></Layout>;
}

function App() {
    const user = sessionStorage.getItem("user") || null;
    return (
        <main className="bg-white w-full h-full">
            <Routes>
                <Route path="/" element={<ProtectedRoute user={user}/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path="/inventory" element={<InventaryPage/>}/>
                    <Route path="/reports" element={<ReportsPage/>}/>
                    <Route path="/suppliers" element={<SuppliersPage/>}/>
                    <Route path="/orders" element={<OrdersPage/>}/>
                    <Route path="/manage-store" element={<StorePage/>}/>
                    <Route path="/settings" element={<SettingsPage/>}/>
                    <Route path="/profile" element={<ProfilePage/>}/>
                </Route>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<SigninPage/>}/>
            </Routes>
        </main>
    );
}

export default App;
