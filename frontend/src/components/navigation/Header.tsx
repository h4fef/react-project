// import NotificationsIcon from "../../assets/notification.svg?react";
import SettingsIcon from "../../assets/settings.svg?react";
import ProfileIcon from "../../assets/suppliers.svg?react";
import LogoutIcon from "../../assets/logout.svg?react";
import SearchIcon from "../../assets/search.svg?react";
import PhUser from "/user.jpg";
import { useAuth } from "../../context/AuthCtxt.tsx";
import { Link, useNavigate } from "react-router";
import { notyf } from "../toastr/Notyf.ts";
import logo from "../../assets/logo-navbar.png";
import { titleCase } from "../../services/UtilityService.ts";

const Header = () => {
  const { user, setToken } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-48 w-full bg-base-100 border-b border-b-[#EEEEEE] text-sm lg:py-7 py-2.5 lg:ps-65">
        <nav className="px-4 sm:px-6 flex basis-full items-center w-full mx-auto">
          {/* logo sm */}
          <div className="me-5 lg:me-0 lg:hidden">
            <a
              className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80"
              href="#"
              aria-label="Preline"
            >
              <img src={logo} alt="" />
            </a>
          </div>

          <div className="w-full flex items-center justify-end ms-auto md:justify-between gap-x-1 md:gap-x-3">
            {/* search lg */}
            <div className="hidden md:block">
              {/* Search Input */}
              <div className="relative">
                <div className="absolute inset-y-0 inset-s-0 flex items-center pointer-events-none z-20 ps-4">
                  {/* TODO: SOSTITUIRE CON ICONA DI FIGMA */}
                  <SearchIcon class="size-6 text-grey-400" />
                </div>
                <input
                  type="text"
                  className="py-2.5 ps-2 pe-6.5 block w-full bg-layer border-grey-50 rounded-lg text-base text-grey-800! placeholder:text-grey-400!"
                  placeholder="Cerca"
                />
                <div className="hidden absolute inset-y-0 inset-e-0 flex items-center z-20 pe-1">
                  <button
                    type="button"
                    className="inline-flex shrink-0 justify-center items-center size-6 rounded-full text-muted-foreground-1 hover:text-primary-hover focus:outline-hidden focus:text-primary-focus"
                    aria-label="Close"
                  >
                    <span className="sr-only">Close</span>
                    <svg
                      className="shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="m15 9-6 6" />
                      <path d="m9 9 6 6" />
                    </svg>
                  </button>
                </div>
              </div>
              {/* End Search Input */}
            </div>
            {/* actions sm: notifiche, profilo */}
            {/* todo: cambiare icona con quella di ux */}
            <div className="flex flex-row items-center justify-end gap-1">
              <button
                type="button"
                className="md:hidden size-9.5 relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-foreground hover:bg-muted-hover focus:outline-hidden focus:bg-muted-focus disabled:opacity-50 disabled:pointer-events-none"
              >
                <svg
                  className="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <span className="sr-only">Search</span>
              </button>

              <button
                type="button"
                className="size-9.5 relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-foreground hover:bg-muted-hover focus:outline-hidden focus:bg-muted-focus disabled:opacity-50 disabled:pointer-events-none"
              >
                {/* todo: inserire icona notifiche come da ux */}
                <span className="sr-only">Notifications</span>
              </button>

              {/* Dropdown */}
              {user && (
                <div className="hs-dropdown [--placement:bottom-right] relative inline-flex">
                  {/* button con img utente */}
                  <button
                    id="hs-dropdown-account"
                    type="button"
                    className="size-9.5 p-0!"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    aria-label="Dropdown"
                  >
                    <img
                      className="rounded-full"
                      src={user.photo ?? PhUser}
                      alt="avatar 1"
                    />
                  </button>

                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-dropdown border border-dropdown-line shadow-md rounded-lg mt-2 after:h-4 after:absolute after:-bottom-4 after:inset-s-0 after:w-full before:h-4 before:absolute before:-top-4 before:inset-s-0 before:w-full"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="hs-dropdown-account"
                  >
                    <div className="rounded-t-lg border-b border-b-[#EEEEEE]">
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 py-2 px-3"
                      >
                        <img
                          className="rounded-full size-9.5"
                          src={user.photo ?? PhUser}
                          alt=""
                        />
                        <div className="text-base-content text-base">
                          <p className="font-semibold">
                            {titleCase(user.name)} {titleCase(user.surname)}
                          </p>
                          <p className="text-base-content/50">
                            {titleCase(user.role)}
                          </p>
                        </div>
                      </Link>
                    </div>
                    {/* profilo, impostazioni, logout */}
                    <div className="p-1.5 space-y-0.5 border-b border-b-[#EEEEEE] text-base text-gray-600">
                      <Link
                        className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg hover:bg-[#d0d3d991]"
                        to="/profile"
                      >
                        <ProfileIcon className="text-gray-600" />
                        Profilo
                      </Link>
                      <Link
                        className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg hover:bg-[#d0d3d991]"
                        to="/profile"
                      >
                        <SettingsIcon className="text-gray-600" />
                        Impostazioni
                      </Link>
                    </div>
                    <div className="py-2.5 px-4">
                      <button
                        type="button"
                        className="btn px-3! w-full flex gap-x-3.5 items-center justify-center text-[#fb4141] bg-[#fb414124] hover:bg-[#fb414145]"
                        onClick={() => {
                          setToken(null);
                          notyf.success("Logout effettuato con successo!");
                          navigate("/login", { replace: true });
                        }}
                      >
                        <LogoutIcon className="w-4 h-4" />
                        Esci
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {/* End Dropdown */}
            </div>
          </div>
        </nav>
      </header>
      {/* mobile */}
      <div className="-mt-px">
        {/* Breadcrumb */}
        <div className="sticky top-0 inset-x-0 z-20 bg-navbar border-y border-navbar-line px-4 sm:px-6 lg:px-8 lg:hidden">
          <div className="flex items-center py-2">
            {/* Navigation Toggle */}
            <button
              type="button"
              className="size-8 flex justify-center items-center gap-x-2 bg-layer border border-layer-line text-layer-foreground hover:text-layer-foreground-hover rounded-lg focus:outline-hidden focus:text-layer-foreground-focus disabled:opacity-50 disabled:pointer-events-none"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="hs-application-sidebar"
              aria-label="Toggle navigation"
              data-hs-overlay="#hs-application-sidebar"
            >
              <span className="sr-only">Toggle Navigation</span>
              <svg
                className="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M15 3v18" />
                <path d="m8 9 3 3-3 3" />
              </svg>
            </button>
            {/* End Navigation Toggle */}

            {/* Breadcrumb */}
            <ol className="ms-3 flex items-center whitespace-nowrap">
              <li className="flex items-center text-sm text-foreground">
                Application Layout
                <svg
                  className="shrink-0 mx-3 overflow-visible size-2.5 text-muted-foreground"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </li>
              <li
                className="text-sm font-semibold text-foreground truncate"
                aria-current="page"
              >
                Dashboard
              </li>
            </ol>
            {/* End Breadcrumb */}
          </div>
        </div>
        {/* End Breadcrumb */}
      </div>
    </>
  );
};
export default Header;
