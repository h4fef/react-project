import {useAuth} from "../context/AuthCtxt.tsx";

function HomePage() {
    const {user} = useAuth();
    console.log(user)
    return <></>
}

export default HomePage;