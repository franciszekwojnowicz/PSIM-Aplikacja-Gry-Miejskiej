import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
}

function Navbar() {
  return (
    <>
      <nav className="font-sans grid grid-flow-col jus text-center py-4 px-6 bg-black font-semibold text-white shadow w-full">
        <div className="grid grid-flow-col justify-self-center mr-auto">
          <div className="space-x-20 px-5 py-1 w-56 h-full rounded-xl bg-gray-700 ml-5 mr-5">
            <Link to={"/restaurants"}>
              <a className="text-lg no-underline text-grey-darkest hover:text-blue-dark">
                Restauracje
              </a>
            </Link>
          </div>
          <div className="space-x-20 px-5 py-1 rounded-xl w-56 bg-gray-700 ml-5 mr-5">
            <Link to={"/achievements"}>
              <a className="text-lg no-underline text-grey-darkest hover:text-blue-dark">
                Osiągnięcia
              </a>
            </Link>
          </div>
          <div className="space-x-20 px-5 py-1 rounded-xl w-56 bg-gray-700 ml-5 mr-5">
            <Link to={"/ranking"}>
              <a className="text-lg no-underline text-grey-darkest hover:text-blue-dark">
                Ranking
              </a>
            </Link>
          </div>
        </div>

        <div className="space-x-2 px-5 py-1 rounded-xl ml-auto bg-gray-700">
          <Link to={`/user/${localStorage.getItem("userID")}`}>
            <a className="text-lg no-underline text-grey-darkest hover:text-blue-dark">
              Konto
            </a>
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
