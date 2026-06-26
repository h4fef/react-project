import NavbarSide from "./NavbarSide.tsx";
import Header from "./Header.tsx";

const Navigation = () => {
    return <div className="grid min-h-screen grid-cols-[16rem_-1]">
        <NavbarSide/>

        <div className="flex flex-col">
            <Header/>
        </div>
    </div>
}

export default Navigation;