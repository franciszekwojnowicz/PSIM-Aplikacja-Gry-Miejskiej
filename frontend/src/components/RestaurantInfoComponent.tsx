import React from "react";
import StarFilled from "./icons/StarFilled";
import StarEmpty from "./icons/StarEmpty";
import Pin from "./icons/Pin";
import { RestaurantInfoModel } from "../types";
import { postRating } from "../api";

function RestaurantInfoComponent({
  name,
  type,
  position,
  description,
  image,
  rating_average,
  address,
  map_link,
}: RestaurantInfoModel) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 gap-10 h-auto">
        <div className="rounded overflow-hidden shadow-lg flex-auto h-auto min-h-80">
          <div className="relative h-full">
            <a href="#">
              <img
                className="w-full object-cover rounded-xl h-full"
                src={image}
                alt="ImgRestaurant"
              />
            </a>
          </div>
        </div>
        <div className="grid grid-flow-row-dense">
          <h1 className="font-medium text-center text-3xl h-2">{name}</h1>
          <h1 className="font-medium text-left h-1 text-2xl">Opis</h1>
          <p className="items-start text-lg">{description}</p>
          <h1 className="font-medium text-left h-1 text-2xl">Typ</h1>
          <p className="items-start text-lg">{type}</p>
          <div className="flex space-x-2 content-center place-items-baseline">
            <h1 className="font-medium text-left h-1 text-2xl">Ocena:</h1>
            <div className="flex text-yellow-400 ">
              {Array.from(Array(rating_average), (e, i) => {
                return (
                  <StarFilled
                    click={() => postRating(rating_average)}
                    key={i}
                  />
                );
              })}
              {Array.from(Array(Number(5 - rating_average)), (e, i) => {
                return (
                  <StarEmpty
                    click={() => {
                      console.log(i + 1 + rating_average);
                      postRating(i + 1 + rating_average);
                    }}
                    key={i}
                  />
                );
              })}
            </div>
          </div>
          <div className="flex space-x-2 content-center place-items-baseline">
            <Pin link={map_link} />
            <p className="font-medium text-left h-1 text-lg">{address}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default RestaurantInfoComponent;
