import { useEffect, useState } from "react";
import Restaurant from "./Restaurant";
import { getRestaurants } from "../api";
import { RestaurantsAPI } from "../types";

function ListRestarants() {
  const [restaurants, setRestaurants] = useState<RestaurantsAPI | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        await getRestaurants().then((result) => {
          setLoading(false);
          setRestaurants(result);
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

  if (!restaurants) {
    return <div>Nie znaleziono restauracji;/</div>;
  }

  return (
    <>
      <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-1 gap-10 h-auto">
          {restaurants ? (
            restaurants.unlocked.map((restaurant) => (
              <Restaurant
                name={restaurant.name}
                description={restaurant.description}
                img={restaurant.image}
                raiting={restaurant.rating_average}
                address={restaurant.address}
                linkToMap={restaurant.map_link}
                visited={true}
                restaurantID={restaurant.id}
                key={restaurant.id}
              />
            ))
          ) : (
            <p>Error</p>
          )}
          {restaurants ? (
            restaurants.locked.map((restaurant) => (
              <Restaurant
                name={restaurant.name}
                description={restaurant.description}
                img={restaurant.image}
                raiting={restaurant.rating_average}
                address={restaurant.address}
                linkToMap={restaurant.map_link}
                visited={false}
                restaurantID={restaurant.id}
                key={restaurant.id}
              />
            ))
          ) : (
            <p>Error</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ListRestarants;
