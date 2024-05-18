export interface RestaurantModel {
  img: string;
  raiting: number;
  name: string;
  description: string;
  address: string;
  linkToMap: string;
  visited: boolean;
}

export interface RestaurantsAPI {
  unlocked: {
    restaurants: RestaurantModel[];
  };
  locked: {
    restaurants: RestaurantModel[];
  };
}
