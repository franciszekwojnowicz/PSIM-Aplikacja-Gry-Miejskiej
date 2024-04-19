import Navbar from "../components/Navbar";
import ListRestarants from "../components/ListRestarants";
import { useState } from "react";

function Restaurants() {
  const [pass, setPass] = useState("");
  return (
    <>
      <div className="text-center">
        <Navbar />
        <div className="p-5 grid grid-flow-col auto-cols-max justify-center content-center place-items-baseline">
          <button
            type="button"
            onClick={() => alert("Podano hasło: " + pass)}
            className="text-white bg-black hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-l px-10 py-4 me-2 mb-2 dark:bg-black dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Dodaj restauracje
          </button>
          <input
            type="text"
            id="password_restaurant"
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block h-12 w-full p-2.5 dark:border-black dark:border-2 dark:bg-gray-100 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Podaj hasło"
            onChange={(e) => setPass(e.target.value)}
            value={pass}
            required
          />
        </div>
        <ListRestarants />
      </div>
    </>
  );
}

export default Restaurants;
