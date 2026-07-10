import Header from "./Header.tsx";
import type { PropsWithChildren } from "react";
import NavbarSide from "./NavbarSide.tsx";

const Navigation = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      {/* sidebar */}
      <NavbarSide />
      {/* dynamic content */}
      <div className="w-full h-full lg:ps-64">
        <div className="h-full p-8 sm:p-6 space-y-4 sm:space-y-6 bg-gray-50">
          <section className="h-full">{children}</section>
        </div>
      </div>
    </>
  );
};

export default Navigation;
