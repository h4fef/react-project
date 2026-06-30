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
import type {UserModel} from "./models/UserModel.ts";
import {useCallback, useEffect, useState} from "react";
import {profile} from "./services/AuthService";
import {notyf} from "./components/toastr/Notyf.ts";

const ProtectedRoute = ({user, redirectPath = "/login"}: ProtectedRouteProps) => {
    console.log("ProtectedRoute", user);
    if (!user) {
        return <Navigate to={redirectPath} replace/>
    }
    return <Layout><Outlet/></Layout>;
}

const LoaderSpinner = () => {
    return <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/30 backdrop-blur-sm">
        <span className="loading loading-spinner loading-xl w-[10%] text-primary"></span>
    </div>
}

function App() {
    const token = sessionStorage.getItem("token") || null;
    const [user, setUser] = useState<UserModel | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const fetchUser = useCallback(async () => {
        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }
        try {
            const response = await profile();
            const data = response.data as UserModel;
            if (!data) {
                setUser(null);
                notyf.error("Si è verificato un errore. Ricaricare la pagina.");
                return;
            }
            setUser(data);

        } catch (err: any) {
            const error = err?.response?.data;
            console.error(error);
            setUser(null);
            sessionStorage.removeItem('isAuth');
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('token');
            notyf.error(error);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        void fetchUser()
    }, [fetchUser]);

    if (loading) {
        return <LoaderSpinner/>
    }
    return (
        <main className="bg-white w-full h-full">
            <Routes>
                <Route path="/" element={<ProtectedRoute user={token}/>}>
                    <Route path="/home" element={<HomePage user={user!}/>}/>
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
