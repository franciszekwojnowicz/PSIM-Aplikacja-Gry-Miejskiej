import { useEffect, useState } from "react";
import Restaurant from "./Restaurant";
import { getRestaurants, setAuthToken } from "../api";
import { RestaurantsAPI } from "../types";
import axios from "axios";

const restarants = [
  "Restaracja1",
  "Restaracja2",
  "Restaracja3",
  "Restaracja4",
  "Restaracja5",
];

function ListRestarants() {
  const [restaurants, setRestaurants] = useState<RestaurantsAPI | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      setAuthToken();
      const result = axios
        .get<RestaurantsAPI | null>(
          `http://localhost:8000/api/user/2/restaurants/`
        )
        .then((response) => {
          setRestaurants(response.data);
          setLoading(false);
        });
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  }, []);

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (!restaurants) {
    return <p>Error fetching restaurants</p>;
  }

  console.log(restaurants);
  return (
    <>
      <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-1 gap-10 h-auto">
          {restaurants ? (
            restaurants.unlocked.restaurants?.map((restaurant) => (
              <Restaurant
                name={restaurant.name}
                description={restaurant.description}
                img={
                  "https://woothai.pl/wp-content/uploads/2024/03/bg_szama-3-2048x1152.png"
                }
                raiting={4}
                address="Plac Grunwaldzki 59, Wrocław"
                linkToMap="https://maps.app.goo.gl/7NQrNWJzETFWhP717"
                visited={true}
              />
            ))
          ) : (
            <p>Error</p>
          )}
          ;
          {restaurants ? (
            restaurants.locked.restaurants?.map((restaurant) => (
              <Restaurant
                name={restaurant.name}
                description={restaurant.description}
                img={
                  "https://woothai.pl/wp-content/uploads/2024/03/bg_szama-3-2048x1152.png"
                }
                raiting={4}
                address="Plac Grunwaldzki 59, Wrocław"
                linkToMap="https://maps.app.goo.gl/7NQrNWJzETFWhP717"
                visited={false}
                key={restaurant.id}
              />
            ))
          ) : (
            <p>Error</p>
          )}
          ;
          <Restaurant
            name={"adwa"}
            description={"asdadw"}
            img={
              "https://woothai.pl/wp-content/uploads/2024/03/bg_szama-3-2048x1152.png"
            }
            raiting={4}
            address="Plac Grunwaldzki 59, Wrocław"
            linkToMap="https://maps.app.goo.gl/7NQrNWJzETFWhP717"
            visited={false}
          />
        </div>
      </div>
    </>
  );
}

export default ListRestarants;
