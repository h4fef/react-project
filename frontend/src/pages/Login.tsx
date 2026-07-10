import { useState } from "react";
import { login } from "../services/AuthService.js";
import { Link, useNavigate } from "react-router";
import { notyf } from "../components/toastr/Notyf.ts";
import { useAuth } from "../context/AuthCtxt.tsx";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { UserModel } from "../models/UserModel.ts";

function LoginPage() {
  const { register, handleSubmit } = useForm<UserModel>();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const onSubmit: SubmitHandler<UserModel> = async (data) => {
    setError("");
    try {
      // Send a GET request to the signup endpoint to retrieve user data
      const response = await login(data);
      if (response.data.token) {
        setToken(response.data.token);
        notyf.success("Benvenuto!");
        navigate("/home", { replace: true });
      } else {
        notyf.error("Credenziali non valide. Riprova.");
        setToken(null);
      }
    } catch (err: any) {
      setToken(null);
      const error = err?.response?.data;
      setError(error?.message ?? "Si è verificato un errore. Riprova più tardi.");
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
            Accedi al tuo account
          </h2>
          <p className="text-[16px] text-gray-500">
            Bentornato! Inserisci i tuoi dati per accedere.
          </p>
        </div>
        <form
          className="flex flex-col items-center gap-5 mb-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-96 space-y-3">
            <label htmlFor="inputEmail" className="input-label mb-1.5">
              Email
            </label>
            <input
              id="inputEmail"
              type="email"
              placeholder="Inserisci la tua email"
              className="input-field"
              {...register("email", { required: true })}
            />
          </div>
          <div className="w-96 space-y-3">
            <label htmlFor="inputPsw" className="input-label mb-1.5">
              Password
            </label>
            <input
              id="inputPsw"
              type="password"
              placeholder="*****"
              className="input-field"
              {...register("password", { required: true })}
            />
          </div>
          <div className="max-w-sm w-full space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="input-check size-4"
                id="rememberME"
                {...register("rememberME")}
              />
              <label htmlFor="rememberME" className="input-label">
                Ricordami
              </label>
            </div>
          </div>
          {error && (
            <div className="text-start w-96">
              <span className="helper-text text-error">{error}</span>
            </div>
          )}
          <button type="submit" className="bg-blue-600 w-96 text-white">
            Accedi
          </button>
        </form>
        <div className="text-center text-sm">
          <p className="text-gray-500">
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
