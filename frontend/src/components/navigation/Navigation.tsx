import NavbarSide from "./NavbarSide.tsx";
import Header from "./Header.tsx";
import type {PropsWithChildren} from "react";

const Navigation = ({children}: PropsWithChildren) => {
    return <div className="grid min-h-screen grid-cols-[16rem_-1]">
        <NavbarSide/>

        <div className="flex flex-col min-h-screen">
            <Header/>
            <main className="flex-1 p-8 bg-gray-50">
                {children}
            </main>
        </div>
    </div>
}

export default Navigation;