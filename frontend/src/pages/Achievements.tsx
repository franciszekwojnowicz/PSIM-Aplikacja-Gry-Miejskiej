import React from "react";
import Navbar from "../components/Navbar";
import Check from "../components/icons/Check";
import XMark from "../components/icons/XMark";
import Italian from "../components/icons/Italian";
import Crown from "../components/icons/Crown";

function Achievements() {
  return (
    // TODO: Filters?
    <>
      <Navbar />
      <ul className="bg-white shadow overflow-hidden sm:rounded-md max-w-3xl mx-auto mt-16">
        <li>
          <div className="px-4 py-5 sm:px-6">
            <div className="flex items-center place-items-baseline space-x-3">
              <img
                src="https://www.svgrepo.com/show/145806/sushi.svg"
                className="h-10 w-10"
              />
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Sushi Master
              </h3>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="mt-1 max-w-2xl text-l text-gray-500">
                Odwiedź wszystkie restaurację związane z sushi!
              </p>
              <div className="text-green-500">
                <Check />
              </div>
            </div>
          </div>
        </li>
        <li className="border-t border-gray-200">
          <div className="px-4 py-5 sm:px-6">
            <div className="flex items-center place-items-baseline space-x-3">
              <div className="text-yellow-600">
                <Crown />
              </div>

              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Kolekcjoner
              </h3>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="mt-1 max-w-2xl text-l text-gray-500">
                Odwiedź wszystkie restauracje, z każdej kategorii!
              </p>
              <div className="text-red-600">
                <XMark />
              </div>
            </div>
          </div>
        </li>
        <li className="border-t border-gray-200">
          <div className="px-4 py-5 sm:px-6">
            <div className="flex items-center place-items-baseline space-x-3">
              <Italian />
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Cucina italiana
              </h3>
              <img
                alt="File:Flag of Italy.svg"
                src="//upload.wikimedia.org/wikipedia/en/thumb/0/03/Flag_of_Italy.svg/800px-Flag_of_Italy.svg.png?20111003040337"
                width="25"
                height="23"
              />
            </div>
            <div className="mt-4 flex items-center justify-between place-content-baseline">
              <p className="mt-1 max-w-2xl text-l text-gray-500">
                Odwiedź wszystkie włoskie restauracje!
              </p>
              <div className="text-red-600">
                <XMark />
              </div>
            </div>
          </div>
        </li>
      </ul>
    </>
  );
}

export default Achievements;
