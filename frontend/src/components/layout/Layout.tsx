import Navigation from "../navigation/Navigation.tsx";
import type {ReactNode} from "react";

const Layout = ({children}: { children: ReactNode | ReactNode[] }) => {
    return <Navigation>
        {children}
    </Navigation>
}

export default Layout;