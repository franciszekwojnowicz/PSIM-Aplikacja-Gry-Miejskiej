import React from "react";

function CommentSection() {
  return (
    // TODO: Add logic to comments
    <>
      <div className="w-fullbg-white rounded-lg border p-1 md:p-3 m-10">
        <h3 className="font-semibold p-1">Komentarze</h3>
        <div className="flex flex-col gap-5 m-3">
          <div>
            <div className="flex w-full justify-between border rounded-md">
              <div className="p-3">
                <div className="flex gap-3 items-center">
                  <img
                    src="https://m.media-amazon.com/images/I/61LeyKJ5QAL._AC_UF1000,1000_QL80_.jpg"
                    className="object-cover w-10 h-10 rounded-full border-2 border-blue-600  shadow-blue-600"
                  />
                  <h3 className="font-bold">JeremiaszPachnidełko99</h3>
                </div>
                <p className="text-gray-600 mt-2">Super restauracja!!!!</p>
                <button className="text-right text-blue-500 text-sm">
                  Odpowiedz
                </button>
              </div>
            </div>

            <div className="flex justify-between border ml-5 rounded-md">
              <div className="p-3">
                <div className="flex gap-3 items-center">
                  <img
                    src="https://images.immediate.co.uk/production/volatile/sites/49/2023/10/imgAIU5M7-31de98d.jpg?quality=90&crop=0px,0px,1200px,799px&resize=980,654"
                    className="object-cover w-10 h-10 rounded-full border-2 border-blue-600  shadow-blue-600"
                  />
                  <h3 className="font-bold">
                    SushiMassterr33
                    <br />
                  </h3>
                </div>
                <p className="text-gray-600 mt-2">polać temu do góry :DDD</p>
                <button className="text-right text-blue-500 text-sm">
                  Odpowiedz
                </button>
              </div>
            </div>

            <div className="text-gray-500 font-bold pl-14">|</div>

            <div className="flex w-full justify-between border rounded-md ml-5">
              <div className="p-3">
                <div className="flex gap-3 items-center">
                  <img
                    src="https://img.wprost.pl/_thumb/6c/d9/32f5cdbd108278c1510151cd80e0.jpeg"
                    className="object-cover w-10 h-10 rounded-full border-2 border-blue-600  shadow-blue-600"
                  />
                  <h3 className="font-bold">barca256</h3>
                </div>
                <p className="text-gray-600 mt-2">
                  Mega smacznie! I co ważne, piwko w cenie 5zł!!
                </p>
                <button className="text-right text-blue-500 text-sm">
                  Odpowiedz
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-between border rounded-md">
            <div className="p-3">
              <div className="flex gap-3 items-center">
                <img
                  src="https://images.immediate.co.uk/production/volatile/sites/49/2023/10/imgAIU5M7-31de98d.jpg?quality=90&crop=0px,0px,1200px,799px&resize=980,654"
                  className="object-cover w-10 h-10 rounded-full border-2 border-blue-600  shadow-blue-600"
                />
                <h3 className="font-bold">
                  SushiMassterr33
                  <br />
                </h3>
              </div>
              <p className="text-gray-600 mt-2">Polecam</p>
              <button className="text-right text-blue-500 text-sm">
                Odpowiedz
              </button>
            </div>
          </div>
        </div>

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
}

export default CommentSection;
