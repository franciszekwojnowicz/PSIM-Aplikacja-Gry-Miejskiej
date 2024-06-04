import React, { useState } from "react";
import StarFilled from "./icons/StarFilled";
import StarEmpty from "./icons/StarEmpty";
import Pin from "./icons/Pin";
import { RestaurantInfoModel } from "../types";
import { patchRating, postRating } from "../api";

function RestaurantInfoComponent({
  name,
  type,
  position,
  description,
  image,
  rating_average,
  rating_user,
  address,
  map_link,
}: RestaurantInfoModel) {
  const [isError, setIsError] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

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
            <h1 className="font-medium text-left h-1 text-2xl">
              Ocena restuaracji:
            </h1>
            <div className="flex text-yellow-400 ">
              {Array.from(Array(rating_average), (e, i) => {
                return (
                  <StarFilled
                    click={() => {
                      return null;
                    }}
                    onHover={false}
                    key={i}
                  />
                );
              })}
              {Array.from(Array(Number(5 - rating_average)), (e, i) => {
                return (
                  <StarEmpty
                    click={() => {
                      return null;
                    }}
                    onHover={false}
                    key={i}
                  />
                );
              })}
            </div>
          </div>
          <div className="flex space-x-2 content-center place-items-baseline">
            <h1 className="font-medium text-left h-5 text-2xl">Twoja ocena:</h1>
            <div className="flex text-yellow-400 ">
              {Array.from(Array(rating_user), (e, i) => {
                return (
                  <StarFilled
                    click={async () => {
                      try {
                        {
                          rating_user === 0
                            ? await postRating(i + 1)
                            : await patchRating(i + 1);
                        }
                        setIsError(false);
                        setIsAdded(true);
                        window.location.href = window.location.href;
                      } catch (error) {
                        setIsError(true);
                      }
                    }}
                    onHover={true}
                    key={i}
                  />
                );
              })}
              {Array.from(Array(Number(5 - rating_user)), (e, i) => {
                return (
                  <StarEmpty
                    click={async () => {
                      try {
                        {
                          rating_user === 0
                            ? await postRating(i + 1 + rating_user)
                            : await patchRating(i + 1 + rating_user);
                        }
                        setIsError(false);
                        setIsAdded(true);
                        window.location.href = window.location.href;
                      } catch (error) {
                        setIsError(true);
                      }
                    }}
                    onHover={true}
                    key={i}
                  />
                );
              })}
              {isError && (
                <div className=" text-red-600 text-center text-xl font-bold">
                  {" "}
                  Nie można dodać oceny!
                </div>
              )}
              {isAdded && (
                <div className=" text-green-600 text-center text-xl font-bold">
                  {" "}
                  Dodano ocene!
                </div>
              )}
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
