import React from "react";
import Navbar from "../components/Navbar";
import Check from "../components/icons/Check";
import XMark from "../components/icons/XMark";
import Italian from "../components/icons/Italian";

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
                <svg
                  fill="currentColor"
                  height="37px"
                  width="40px"
                  viewBox="0 0 220 220"
                >
                  <path
                    d="M220,98.865c0-12.728-10.355-23.083-23.083-23.083s-23.083,10.355-23.083,23.083c0,5.79,2.148,11.084,5.681,15.14
	l-23.862,21.89L125.22,73.002l17.787-20.892l-32.882-38.623L77.244,52.111l16.995,19.962l-30.216,63.464l-23.527-21.544
	c3.528-4.055,5.671-9.344,5.671-15.128c0-12.728-10.355-23.083-23.083-23.083C10.355,75.782,0,86.137,0,98.865
	c0,11.794,8.895,21.545,20.328,22.913l7.073,84.735H192.6l7.073-84.735C211.105,120.41,220,110.659,220,98.865z"
                  />
                </svg>
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
