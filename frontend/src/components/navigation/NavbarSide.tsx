import NavItem from "./NavItem.tsx";
import { navLinks } from "../../data/navLinks.ts";
import logo from "../../assets/logo-navbar.png";
import { Link } from "react-router";

const NavbarSide = () => {
  return (
    <>
      {/* Sidebar */}
      <div
        id="sidebar-preline-react"
        className="hs-overlay  [--auto-close:lg] hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform
        w-65 h-full hidden fixed inset-y-0 inset-s-0 z-60 bg-sidebar border-e border-e-[#EEEEEE] lg:block lg:translate-x-0 lg:inset-e-auto lg:bottom-0"
        role="dialog"
        tabIndex="-1"
        aria-label="Sidebar"
      >
        <div className="relative flex flex-col h-full max-h-full">
          <div className="px-6 pt-6 flex items-center">
            {/* Logo */}
            <Link
              className="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80"
              to="/home"
              aria-label="Preline"
            >
              <img src={logo} alt="Logo Kanban" />
            </Link>
            {/* End Logo */}
          </div>

          {/* menu */}
          <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-none [&::-webkit-scrollbar-track]:bg-scrollbar-track [&::-webkit-scrollbar-thumb]:bg-scrollbar-thumb">
            <nav
              className="hs-accordion-group px-3 pt-8 w-full flex flex-col flex-wrap"
              data-hs-accordion-always-open
            >
              <ul className="flex flex-col gap-3 p-0 space-y-1">
                {navLinks.map((link, i) => {
                  const settingsSection = link.href
                    .toLowerCase()
                    .includes("settings");
                  const logoutSection = link.href
                    .toLowerCase()
                    .includes("logout");
                  return (
                    !settingsSection &&
                    !logoutSection && (
                      <NavItem
                        key={`section-${i}`}
                        href={link.href}
                        routeName={link.routeName}
                        icon={link.icon}
                      />
                    )
                  );
                })}
              </ul>
            </nav>
          </div>
          {/* End Content */}
        </div>
      </div>
      {/* End Sidebar */}
    </>
  );
};
export default NavbarSide;
