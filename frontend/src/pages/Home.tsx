import {useEffect, useState} from "react";
import type {UserModel} from "../models/UserModel.ts";
import {profile} from "../services/AuthService";
import {notyf} from "../components/toastr/Notyf.ts";
import {useAuth} from "../context/AuthCtxt.tsx";

function HomePage() {
    const {user} = useAuth();
    console.log(user)
    return <></>
}

export default HomePage;