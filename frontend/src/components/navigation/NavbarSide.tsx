import logo from "../../assets/logo-navbar.png";
import NavItem from "./NavItem.tsx";
import {navLinks} from "../../data/navLinks.ts";

const NavbarSide = () => {
    return <aside id="logo-sidebar"
                  className="px-6 pt-6 pb-8 inset-shadow-xs overlay [--auto-close:sm] sm:shadow-none overlay-open:translate-x-0 drawer drawer-start hidden max-w-64 sm:z-0 sm:flex sm:translate-x-0"
                  role="dialog" tabIndex="-1">
        <div className="drawer-header p-0 mb-8">
            <img src={logo} alt="Logo Kanban"/>
        </div>
        <div className="drawer-body p-0">
            <ul className="menu gap-3 p-0">
                {navLinks.map((link, i) => {
                    const settingsSection = link.href.toLowerCase().includes("settings");
                    const logoutSection = link.href.toLowerCase().includes("logout");
                    return !settingsSection && !logoutSection &&
                        <NavItem key={`section-${i}`} href={link.href} routeName={link.routeName}
                                 icon={link.icon}/>
                })}
            </ul>
        </div>
    </aside>

}
export default NavbarSide;