import React from "react";
import Navbar from "../components/Navbar";
import ListUsers from "../components/ListUsers";

function RankingPage() {
  return (
    <>
      <Navbar />
      <ul className="bg-white shadow overflow-hidden sm:rounded-md max-w-3xl mx-auto mt-16">
        <ListUsers />
      </ul>
    </>
  );
}

export default RankingPage;
