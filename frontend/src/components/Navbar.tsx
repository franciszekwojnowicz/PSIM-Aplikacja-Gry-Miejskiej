import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
}

function Navbar() {
  return (
    <>
      <nav className="font-sans grid grid-flow-col text-center justify-center py-4 px-6 bg-black font-semibold text-white shadow w-full">
        <div className="space-x-20 px-5 py-1 h-full rounded-xl bg-gray-700">
          <Link to={"/restaurants"}>
            <a
              href="#"
              className="text-lg no-underline text-grey-darkest hover:text-blue-dark"
            >
              Restauracje
            </a>
          </Link>
        </div>
        <div className="space-x-20 px-5 py-1 rounded-xl bg-gray-700 ml-5 mr-5">
          <Link to={"/achievements"}>
            <a
              href="#"
              className="text-lg no-underline text-grey-darkest hover:text-blue-dark"
            >
              Osiągnięcia
            </a>
          </Link>
        </div>
        {/* TODO: Account page?? */}
        {/* <div className="space-x-20 px-5 py-1 rounded-xl bg-gray-700">
            <a
              href="#"
              className="text-lg no-underline text-grey-darkest hover:text-blue-dark"
            >
              Konto
            </a>
        </div> */}
      </nav>
    </>
  );
}

export default Navbar;
