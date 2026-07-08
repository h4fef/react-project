import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { signin } from "../services/AuthService.js";
import { notyf } from "../components/toastr/Notyf.ts";
import { useAuth } from "../context/AuthCtxt.tsx";
import type { UserModel } from "../models/UserModel.ts";
import { useForm, type SubmitHandler } from "react-hook-form";

function SigninPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserModel>();
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const [msgInvalidEmail, setInvalidEmailMsg] = useState("");
  const [isInvalidPsw, setIsInvalidPsw] = useState(false);
  const onSignIn: SubmitHandler<UserModel> = async (data) => {
    setIsInvalidPsw(false);
    setInvalidEmailMsg("");
    if (password.length < 8) {
      setIsInvalidPsw(true);
      return;
    }

    try {
      // Send a GET request to the signup endpoint to retrieve user data
      const response = await signin(data);
      if (!response) return;
      if (response.data.token) {
        setIsInvalidPsw(false);
        setInvalidEmailMsg("");
        setToken(response.data.token);
        notyf.success("Benvenuto!");
        navigate("/home", { replace: true });
      } else {
        setToken(null);
      }
    } catch (err: any) {
      setToken(null);
      const error = err.response.data;
      if (error.message.toLowerCase().includes("email")) {
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
          <p className="text-[16px] text-gray-500">
            Inizia la tua prova gratuita di 30 giorni.
          </p>
        </div>
        <form
          className="flex flex-col items-center gap-5 mb-8"
          onSubmit={handleSubmit(onSignIn)}
        >
          <div className="w-96 space-y-3">
            <label className="input-label mb-1.5" htmlFor="inputName">
              Nome*
            </label>
            <input
              type="text"
              placeholder="Inserisci il tuo nome"
              className="input-field"
              id="inputName"
              {...register("name", { required: true })}
            />
          </div>
          <div className="w-96">
            <label className="input-label mb-1.5" htmlFor="inputSurname">
              Cognome*
            </label>
            <input
              type="text"
              placeholder="Inserisci il tuo cognome"
              className="input-field"
              id="inputSurname"
              {...register("surname", { required: true })}
            />
          </div>
          <div className="w-96">
            <label className="input-label mb-1.5" htmlFor="inputEmail">
              Email*
            </label>
            <input
              type="email"
              placeholder="Inserisci la tua email"
              className="input-field"
              id="inputEmail"
              {...register("email", { required: true })}
            />
            {msgInvalidEmail && (
              <span className="helper-text text-sm text-red-500">
                {msgInvalidEmail}
              </span>
            )}
          </div>
          <div className="w-96">
            <label className="input-label mb-1.5" htmlFor="inputPsw">
              Password*
            </label>
            <input
              type="password"
              placeholder="Crea una password"
              className="input-field"
              id="inputPsw"
              {...register("password", { required: true, minLength: 8 })}
            />
            {errors.password?.type == "minLength" && (
              <span className="helper-text text-sm text-red-500">
                Almeno di 8 caratteri.
              </span>
            )}
          </div>
          <button type="submit" className="bg-blue-600 w-96 text-white">
            Registrati
          </button>
        </form>
        <div className="text-center text-sm">
          <p className="text-gray-500">
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
