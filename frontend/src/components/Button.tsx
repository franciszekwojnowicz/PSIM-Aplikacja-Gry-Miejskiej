import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function Button({ children }: Props) {
  return (
    <button
      type="button"
      className="text-white bg-black hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-l px-10 py-4 me-2 mb-2 dark:bg-black dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    >
      {children}
    </button>
  );
}

export default Button;
