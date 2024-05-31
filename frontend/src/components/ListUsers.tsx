import { UserModelRanking } from "../types";
import { getUsers } from "../api";
import { useEffect, useState } from "react";
import User from "./User";

function ListUsers() {
  const [users, setUsers] = useState<UserModelRanking[] | null>();
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const sortUsers = (users: UserModelRanking[], order: "asc" | "desc") => {
    return users.slice().sort((a, b) => {
      if (order === "asc") {
        return a.points - b.points;
      } else {
        return b.points - a.points;
      }
    });
  };

  const handleSortOrderChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSortOrder(event.target.value as "asc" | "desc");
  };

  const sortedUsers = users ? sortUsers(users, sortOrder) : [];

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        await getUsers().then((result) => {
          setLoading(false);
          setUsers(result);
        });
      } catch (error) {
        // Handle error
        console.error("Error fetching items", error);
      }
    };

    fetchDataAsync();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!users) {
    return <div className=" text-center text-3xl">Brak użytkowników;/</div>;
  }

  return (
    <>
      <form className="max-w-sm mx-auto">
        <label className="justify-center flex font-medium text-xl py-2">
            Sortowanie
        </label>
        <select
          value={sortOrder}
          onChange={handleSortOrderChange}
          id="sort"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="asc">Rosnąco</option>
          <option value="desc">Malejąco</option>
        </select>
      </form>
      <ul className="bg-white shadow overflow-hidden sm:rounded-md max-w-3xl mx-auto mt-16">
        {sortedUsers ? (
          sortedUsers.map((user) => (
            <User
              id={user.id}
              name={user.name}
              image={user.image}
              points={user.points}
              key={user.id}
            />
          ))
        ) : (
          <p>Error</p>
        )}
      </ul>
    </>
  );
}

export default ListUsers;
