import { useState } from "react";
import {Link, useNavigate} from "react-router";
import { signin } from "../services/AuthService.js";
import {notyf} from "../components/toastr/Notyf.ts";

function SigninPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msgInvalidEmail, setInvalidEmailMsg] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalidPsw, setIsInvalidPsw] = useState(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const navigate = useNavigate();
  const handleSignin = async (e) => {
    e.preventDefault();
    setIsInvalidPsw(false);
    setIsInvalidEmail(false);
    setInvalidEmailMsg("");
    if (password.length < 8) {
      setIsInvalidPsw(true);
      return;
    }

    try {
      // Send a GET request to the signup endpoint to retrieve user data
      const response = await signin({ name, email, password });
      if (!response) return;
      if (response.data.token) {
        setIsInvalidPsw(false);
        setIsInvalidEmail(false);
        setInvalidEmailMsg("");
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("isAuth", "true");
        notyf.success("Benvenuto!");
        navigate("/home");
      }
    } catch (err: any) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("isAuth");
      const error = err.response.data;
      if (error.message.toLowerCase().includes("email")) {
        setIsInvalidEmail(true);
        setInvalidEmailMsg(error.message);
      }
    }
  };

  return (
    <div className="grid grid-cols-2 items-center h-full">
      <div className="justify-self-center">
        <img src="Logo.png" alt="Logo kanban" />
      </div>
      <div className="flex flex-col lg:max-w-[50%]">
        <div className="flex flex-col mb-8 text-center">
          <div className="flex justify-center">
            <img className="h-12 w-12" src="logo-sm.png" alt="Logo kanban" />
          </div>
          <h2 className="text-[30px] font-semibold text-[#2B2F38] mt-6">
            Registrati
          </h2>
          <p className="text-[16px] text-[#667085]">
            Inizia la tua prova gratuita di 30 giorni.
          </p>
        </div>
        <form
          className="flex flex-col items-center gap-5 mb-8"
          onSubmit={handleSignin}
        >
          <div className="w-96">
            <label className="label-text" htmlFor="inputName">
              Nome e cognome*
            </label>
            <input
              type="text"
              placeholder="Inserisci il tuo nome"
              className={`input input-lg inset-shadow-sm`}
              id="inputName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="w-96">
            <label className={`label-text ${isInvalidEmail ? '' : 'text-[#48505e]'}`} htmlFor="inputEmail">
              Email*
            </label>
            <input
              type="email"
              placeholder="Inserisci la tua email"
              className={`${isInvalidEmail ? "is-invalid" : ""} input input-lg inset-shadow-sm`}
              id="inputEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {msgInvalidEmail && (
              <span className="helper-text text-sm text-[#667085]">
                {msgInvalidEmail}
              </span>
            )}
          </div>
          <div className="w-96">
            <label className={`label-text ${isInvalidPsw ? '' : 'text-[#48505e]'}`} htmlFor="inputPsw">
              Password*
            </label>
            <input
              type="password"
              placeholder="Crea una password"
              className={`${isInvalidPsw ? "is-invalid" : ""} input input-lg inset-shadow-sm`}
              id="inputPsw"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {isInvalidPsw && (
              <span className="helper-text text-sm text-[#667085]">
                Almeno di 8 caratteri.
              </span>
            )}
          </div>
          <button className="btn bg-[#1366D9] border-0 w-96 rounded-sm px-5 py-2.5">
            Registrati
          </button>
        </form>
        <div className="text-center text-sm">
          <p className="text-[#667085]">
            Hai già un account?{" "}
            <span>
              <Link to="/login" className="text-[#1366D9]">
                Accedi
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SigninPage;
