import { Link } from "react-router-dom";
import { handleSignUp } from "../api";
import { useState } from "react";

function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false);
  const [isErrorPassword, setIsErrorPassword] = useState(false);
  const checkPassword = () => {
    return password.length >= 8 ? true : false;
  };

  return (
    <>
      <div className="relative my-16 mx-auto w-full max-w-md bg-white justify-center px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
        <div className="w-full">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-900">
              Rejestracja
            </h1>
          </div>
          <div className="mt-5">
            <div className="relative mt-6">
              <input
                type="username"
                name="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nazwa użytkownika"
                className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                autoComplete="NA"
              />
              <label
                htmlFor="username"
                className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
              >
                Nazwa użytkownika
              </label>
            </div>
            <div className="relative mt-6">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                autoComplete="NA"
              />
              <label
                htmlFor="email"
                className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
              >
                Adres e-mail
              </label>
            </div>
            <div className="relative mt-6">
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="peer peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
              />
              <label
                htmlFor="password"
                className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
              >
                Hasło
              </label>
              {isErrorPassword && (
                <div className=" text-red-600 text-center">
                  {" "}
                  Hasło musi się składać z przynajmniej 8 znaków!
                </div>
              )}
            </div>
            <div className="my-6">
              <button
                type="submit"
                className="w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none"
                onClick={async () => {
                  if (!checkPassword()) {
                    setIsErrorPassword(true);
                    return;
                  } else setIsErrorPassword(false);

                  try {
                    await handleSignUp(username, email, password);
                  } catch (error) {
                    setIsError(true);
                  }
                }}
              >
                Zarejestruj się
              </button>
              {isError && (
                <div className=" text-red-600 text-center">
                  {" "}
                  Podany login/email jest już zajęty!
                </div>
              )}
            </div>
            <p className="text-center text-sm text-gray-500">
              Posiadasz już konto?
              <Link to={"/login"}>
                <a className="font-semibold mx-1 text-gray-600 hover:underline focus:text-gray-800 focus:outline-none">
                  Zaloguj się
                </a>
                .
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;
