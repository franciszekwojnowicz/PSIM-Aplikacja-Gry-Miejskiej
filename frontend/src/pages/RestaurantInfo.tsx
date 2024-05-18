import React from "react";
import Navbar from "../components/Navbar";
import StarEmpty from "../components/icons/StarEmpty";
import StarFilled from "../components/icons/StarFilled";
import CommentSection from "../components/CommentSection";
import Pin from "../components/icons/Pin";

function RestaurantInfo() {
  return (
    <>
      <Navbar />
      <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 gap-10 h-auto">
          <div className="rounded overflow-hidden shadow-lg flex-auto h-auto min-h-80">
            <div className="relative h-full">
              <a href="#">
                <img
                  className="w-full object-cover rounded-xl h-full"
                  src={
                    "https://lh5.googleusercontent.com/p/AF1QipO6GRUn2vxTLSCxMJNaHOZd1GP24ZazMi_MW5nQ=w500-h500-k-no"
                  }
                  alt="ImgRestaurant"
                />
              </a>
            </div>
          </div>
          <div className="grid grid-flow-row-dense">
            <h1 className="font-medium text-center text-3xl h-2">
              Restauracja Bella Storia
            </h1>
            <h1 className="font-medium text-left h-1 text-2xl">Opis</h1>
            <p className="items-start text-lg">
              Prosta restauracja z ceglanymi ścianami oferująca włoskie klasyki,
              w tym makaron, pizzę i dania mięsne, oraz piwo.
            </p>
            <div className="flex space-x-2 content-center place-items-baseline">
              <h1 className="font-medium text-left h-1 text-2xl">Ocena:</h1>
              <div className="flex text-yellow-400 ">
                <StarFilled />
                <StarFilled />
                <StarFilled />
                <StarEmpty />
                <StarEmpty />
              </div>
            </div>
            <div className="flex space-x-2 content-center place-items-baseline">
              <Pin link={"linkToMap"} />
              <p className="font-medium text-left h-1 text-lg">
                Plac Grunwaldzki 53, Wrocław
              </p>
            </div>
          </div>
        </div>
        <CommentSection />
      </div>
    </>
  );
}

export default RestaurantInfo;