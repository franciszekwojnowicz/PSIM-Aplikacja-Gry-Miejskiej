import React from "react";
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
            <button className="text-right text-blue-500 text-sm">
              Odpowiedz
            </button>
          </div>
        </div>

        <div className="flex justify-between border ml-5 rounded-md">
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
        </div>
      </div>
    </>
  );
}

export default Comment;
