import React from "react";
import { UserModelRanking } from "../types";

function User({ name, id, image, points }: UserModelRanking) {
  return (
    <>
      <div className="px-4 py-5 sm:px-6">
        <div className="flex items-center place-items-baseline space-x-3">
          <img src={image} className="h-10 w-10" />
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {name}
          </h3>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="mt-1 max-w-2xl text-l text-gray-500">
              Punkty: {points}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default User;
