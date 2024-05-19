export interface RestaurantModel {
  img: string;
  raiting: number;
  name: string;
  description: string;
  address: string;
  linkToMap: string;
  visited: boolean;
}
export interface RestaurantModelAPI {
  id: number;
  name: string;
  type: string;
  position: number;
  description: string;
}

export interface RestaurantsAPI {
  unlocked: RestaurantModelAPI[];
  locked: RestaurantModelAPI[];
}

export interface NewRestaurant {
  id: number;
  restaurant: number;
  nameRestaurant: string;
  type: string;
}

export interface Achivements {
  id: number;
  name: string;
  requirements: string;
  points: number;
}
