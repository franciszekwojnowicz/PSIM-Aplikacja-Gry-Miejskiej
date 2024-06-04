import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { RestaurantInfoPageModel } from "../types";
import { getRestaurantInfo, postComment } from "../api";
import Comment from "../components/Comment";

import RestaurantInfoComponent from "../components/RestaurantInfoComponent";

function RestaurantInfo() {
  const { id } = useParams();

  const [comment, setComment] = useState("");
  const [info, setInfo] = useState<RestaurantInfoPageModel | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        await getRestaurantInfo(Number(id)).then((result) => {
          setLoading(false);
          setInfo(result);
        });
      } catch (error) {
        console.error("Error fetching items", error);
      }
    };

    fetchDataAsync();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!info) {
    return <div>Nie znaleziono informacji o restauracji;/</div>;
  }

  return (
    <>
      <Navbar />
      <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:py-16">
        {info ? (
          <RestaurantInfoComponent
            name={info.info.name}
            description={info.info.description}
            type={info.info.type}
            position={info.info.position}
            image={info.info.image}
            map_link={info.info.map_link}
            address={info.info.address}
            rating_average={info.info.rating_average}
            rating_user={info.info.rating_user}
          />
        ) : (
          "ERROR"
        )}
      </div>
      <div className="w-fullbg-white rounded-lg border p-1 md:p-3 m-10">
        <h3 className="font-semibold p-1">Komentarze</h3>
        <div className="flex flex-col gap-5 m-3">
          {info
            ? info.comments.map((comment) => (
                <Comment
                  id={comment.id}
                  text={comment.text}
                  date={comment.date}
                  name={comment.name}
                  image={comment.image}
                  restaurant={comment.restaurant}
                  to_comment={comment.to_comment}
                  subcomments={comment.subcomments}
                  key={comment.id}
                />
              ))
            : ""}
        </div>
        <div className="w-full px-3 mb-2 mt-6">
          <textarea
            className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-400 focus:outline-none focus:bg-white"
            name="body"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Napisz komentarz"
            required
          ></textarea>
        </div>

        <div className="w-full flex justify-end px-3 my-3 ">
          <input
            type="submit"
            className="px-2.5 py-1.5 rounded-md text-white text-sm bg-black hover:bg-blue-800 "
            value="Post Comment"
            onClick={() => postComment(comment, null)}
          />
        </div>
      </div>
    </>
  );
}

export default RestaurantInfo;
