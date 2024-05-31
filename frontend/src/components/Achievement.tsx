import React, { useEffect, useState } from "react";
import { AchievementModel } from "../types";
import XMark from "./icons/XMark";
import Check from "./icons/Check";
import "../../public/assets/svgs/pizza.svg";

function Achivement({
  name,
  requirements,
  points,
  file_name,
  isGain,
}: AchievementModel) {
  return (
    <>
      <div className="px-4 py-5 sm:px-6">
        <div className="flex items-center place-items-baseline space-x-3">
          <img src={`../../assets/svgs/${file_name}`} className="h-10 w-10" />
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {name}
          </h3>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="mt-1 max-w-2xl text-l text-gray-500">{requirements}</p>
          <div>
            <p className="mt-1 max-w-2xl text-l text-gray-500">
              Punkty: {points}
            </p>
          </div>
          <div>{isGain ? <Check /> : <XMark />}</div>
        </div>
      </div>
    </>
  );
}

export default Achivement;
