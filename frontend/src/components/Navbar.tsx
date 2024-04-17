import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function Navbar() {
  return (
    <>
      <nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-center py-4 px-6 bg-black font-semibold text-white shadow sm:items-baseline w-full">
        <div className="space-x-20">
          <a
            href="#"
            className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2"
          >
            Restauracje
          </a>
          <a
            href="#"
            className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2"
          >
            Osiągnięcia
          </a>
          <a
            href="#"
            className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2"
          >
            Konto
          </a>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
