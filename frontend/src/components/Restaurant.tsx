import React, { ReactNode } from "react";
import Pin from "./icons/Pin";
import StarFilled from "./icons/StarFilled";
import { RestaurantModel } from "../types";
import { Link } from "react-router-dom";

function Restaurant({
  img,
  raiting,
  name,
  description,
  address,
  linkToMap,
  visited,
  restaurantID,
}: RestaurantModel) {
  return (
    <div className="rounded overflow-hidden shadow-lg flex-auto">
      <div className={`relative ${visited ? "" : "pointer-events-none"} h-60`}>
        <Link to={`/restaurant/${restaurantID}`}>
          <a href={`${visited ? "#" : ""}`}>
            <img
              className={`w-full ${
                visited ? "" : "saturate-0 blur-sm"
              } object-cover  h-full`}
              src={img}
              alt="ImgRestaurant"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-white text-3xl font-bold">{`${
                visited ? "" : "NIEODWIEDZONE"
              }`}</h2>
            </div>
            <div
              className={` ${
                visited ? "hover:bg-transparent" : ""
              } transition duration-300  absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25`}
            ></div>
          </a>

          <a>
            <div className="text-sm absolute top-0 right-0 bg-black px-4 text-yellow-400 rounded-full h-16 w-16 flex flex-col items-center justify-center mt-3 mr-3 transition duration-500 ease-in-out">
              <span className="font-bold">{raiting}/5</span>
              <StarFilled click = {() => {return null}} onHover = {false}/>
            </div>
          </a>
        </Link>
      </div>
      <div className={`px-6 ${visited ? "" : "pointer-events-none"} py-4 h-40`}>
        <a
          href={`${visited ? "#" : ""}`}
          className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out"
        >
          {name}
        </a>
        <p className="text-gray-500 text-sm line-clamp-5">{description}</p>
      </div>
      <div className="px-6 py-4 flex flex-row items-center ">
        <span className="py-1 text-sm font-regular text-gray-900 mr-1 flex flex-row items-center">
          <Pin link={linkToMap} />
          <span className="ml-1">{address}</span>
        </span>
      </div>
    </div>
  );
}

export default Restaurant;
