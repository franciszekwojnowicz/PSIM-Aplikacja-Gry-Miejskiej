import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { UserModel } from "../types";
import { fetchUser, getUser } from "../api";

function AccountPage() {
  const { userID } = useParams();
  const [user, setUser] = useState<UserModel | null>();
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        await getUser().then((result) => {
          setLoading(false);
          setUser(result);
          {
            result ? setUsername(result.name) : null;
          }
          {
            result ? setEmail(result.email) : null;
          }
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

  if (!user) {
    return <div>Nie znaleziono informacji o użytkowniku;/</div>;
  }

  return (
    <>
      <Navbar />
      <section className="py-10 my-auto">
        <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
          <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center ">
            <div className="">
              <h1 className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-medium mb-2 text-center">
                Konto
              </h1>
              <div className="grid grid-flow-col">
                <div className="rounded-sm bg-cover bg-center bg-no-repeat items-center flex justify-center">
                  <div
                    className={`mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-cover bg-center bg-no-repeat`}
                  >
                    <img src={`${user.image}`} />
                  </div>
                </div>
                <div className="w-full rounded-sm bg-cover bg-center bg-no-repeat">
                  <div className="mx-auto border-yellow-500 border-4  text-8xl place-self-center flex items-center justify-center w-[141px] h-[141px] bg-white text-black rounded-full bg-cover bg-center bg-no-repeat">
                    {user.points}
                  </div>
                </div>
              </div>
              <div className="grid grid-flow-col grid-cols-2 rounded-sm bg-cover bg-center bg-no-repeat text-center text-2xl font-medium">
                <div></div>
                <div>PUNKTY</div>
              </div>
              <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                <div className="w-full  mb-4 mt-6">
                  <label htmlFor="" className="mb-2 font-medium">
                    Nazwa użytkownika
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-2 p-4 w-full border-2 rounded-lg text-white dark:border-gray-600 dark:bg-gray-800"
                  />
                </div>
                <div className="w-full k mb-4 lg:mt-6">
                  <label htmlFor="" className="font-medium ">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 p-4 w-full border-2 rounded-lg text-white dark:border-gray-600 dark:bg-gray-800"
                  />
                </div>
              </div>

              <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                <div className="w-full">
                  <h3 className="text-black font-medium mb-2">Hasło</h3>
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="text-grey p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                  />
                </div>
              </div>
              <div className="w-full rounded-lg bg-blue-500 mt-4 text-white text-lg font-semibold">
                <button
                  type="submit"
                  className="w-full p-4"
                  onClick={() => fetchUser(email, username, password)}
                >
                  Zmień
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AccountPage;
