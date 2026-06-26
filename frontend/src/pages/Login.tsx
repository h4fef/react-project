import {useState} from "react";
import {login} from "../services/AuthService.js";
import {Link, useNavigate} from "react-router";
import {notyf} from "../components/toastr/Notyf.ts";


function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberME, setRememberME] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            // Send a GET request to the signup endpoint to retrieve user data
            const response = await login({email, password, rememberMe: rememberME});
            if (response.data.token) {
                setError("");
                const user = {
                    email,
                    password,
                    rememberME
                };
                sessionStorage.setItem("user", JSON.stringify(user));
                sessionStorage.setItem("isAuth", "true");
                sessionStorage.setItem("token", response.data.token);
                notyf.success("Benvenuto!");
                navigate("/home");
            } else {
                setError("Invalid credentials. Please try again.");
                sessionStorage.removeItem("user");
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("isAuth");
            }
        } catch (err: any) {
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("isAuth");
            const error = err?.response?.data;
            setError(error.message);
        }
    };
    return (
        <div className="grid grid-cols-2 items-center h-full">
            <div className="justify-self-center">
                <img src="Logo.png" alt="Logo kanban"/>
            </div>
            <div className="flex flex-col lg:max-w-[50%]">
                <div className="flex flex-col mb-8 text-center">
                    <div className="flex justify-center">
                        <img className="h-12 w-12" src="logo-sm.png" alt="Logo kanban"/>
                    </div>
                    <h2 className="text-[30px] font-semibold text-[#2B2F38] mt-6">
                        Accedi al tuo account
                    </h2>
                    <p className="text-[16px] text-[#667085]">
                        Bentornato! Inserisci i tuoi dati per accedere.
                    </p>
                </div>
                <form
                    className="flex flex-col items-center gap-5 mb-8"
                    onSubmit={handleSubmit}
                >
                    <div className="w-96">
                        <label className={`label-text ${error ? '' : 'text-[#48505e]'}`} htmlFor="inputEmail">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Inserisci la tua email"
                            className={`${error ? "is-invalid" : ""} input input-lg inset-shadow-sm`}
                            id="inputEmail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="w-96">
                        <label className={`label-text ${error ? '' : 'text-[#48505e]'}`} htmlFor="inputPsw">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="******"
                            className={`${error ? "is-invalid" : ""} input input-lg inset-shadow-sm`}
                            id="inputPsw"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-1 w-96">
                        <input
                            type="checkbox"
                            className="checkbox checkbox-accent checkbox-md"
                            id="rememberME"
                            checked={rememberME}
                            onChange={(e) => setRememberME(e.target.checked)}
                        />
                        <label className="label-text text-base" htmlFor="rememberME">
                            Ricordami
                        </label>
                    </div>
                    {error && (
                        <div className="text-start w-96">
                            <span className="helper-text text-error">{error}</span>
                        </div>
                    )}
                    <button className="btn bg-[#1366D9] border-0 w-96 rounded-sm px-5 py-2.5">
                        Accedi
                    </button>
                </form>
                <div className="text-center text-sm">
                    <p className="text-[#667085]">
                        Non hai un account?{" "}
                        <span>
              <Link to="/register" className="text-[#1366D9]">
                Registrati
              </Link>
            </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
