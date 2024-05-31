import React, { useState } from "react";
import { CommentModel } from "../types";

function Comment({
  id,
  text,
  date,
  name,
  restaurant,
  to_comment,
  subcomments,
}: CommentModel) {
  const [popOn, setPopOn] = useState(false);
  return (
    <>
      <div>
        <div className="flex w-full justify-between border rounded-md">
          <div className="p-3">
            <div className="flex gap-3 items-center">
              <img
                src="https://m.media-amazon.com/images/I/61LeyKJ5QAL._AC_UF1000,1000_QL80_.jpg"
                className="object-cover w-10 h-10 rounded-full border-2 border-blue-600  shadow-blue-600"
              />
              <h3 className="font-bold">{name}</h3>
            </div>
            <p className="text-gray-600 mt-2">{text}</p>
            <button
              type="button"
              className="text-right text-blue-500 text-sm"
              onClick={() => setPopOn(true)}
            >
              Odpowiedz
            </button>
          </div>
        </div>

        <div className="w-auto border ml-5 rounded-md">
          {subcomments
            ? subcomments.map((comment) => {
                return (
                  <div>
                    <div className="text-gray-500 font-bold pl-14">|</div>
                    <Comment
                      id={comment.id}
                      text={comment.text}
                      date={comment.date}
                      name={comment.name}
                      restaurant={comment.restaurant}
                      to_comment={comment.to_comment}
                      subcomments={comment.subcomments}
                      key={comment.id}
                    />
                  </div>
                );
              })
            : null}
          {popOn &&
            [...Array(1)].map(() => {
              return (
                <>
                  <div className="w-fullbg-white rounded-lg max-h-22 border p-1 md:p-3 m-10">
                    <div className="w-full px-3 mb-2 mt-6">
                      <textarea
                        className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-400 focus:outline-none focus:bg-white"
                        name="body"
                        placeholder="Napisz komentarz"
                        required
                      ></textarea>
                    </div>

                    <div className="w-full flex justify-end px-3 my-3 ">
                      <input
                        type="submit"
                        className="px-2.5 py-1.5 rounded-md text-white text-sm bg-black hover:bg-blue-800 "
                        value="Post Comment"
                      />
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Comment;
