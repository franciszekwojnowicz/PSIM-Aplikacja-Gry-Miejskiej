export interface RestaurantModel {
  img: string;
  raiting: number;
  name: string;
  description: string;
  address: string;
  linkToMap: string;
  visited: boolean;
  restaurantID: number;
}
export interface RestaurantModelAPI {
  id: number;
  name: string;
  type: string;
  position: number;
  description: string;
  image: string;
  rating_average: number;
  address: string;
  map_link: string;
}

export interface RestaurantInfoModel {
  name: string;
  type: string;
  position: number;
  description: string;
  image: string;
  rating_average: number;
  address: string;
  map_link: string;
}

export interface RestaurantInfoPageModel {
  info: RestaurantInfoModel;
  comments: CommentModel[];
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

export interface AchievementModel {
  id: number;
  name: string;
  requirements: string;
  points: number;
  file_name: string;
  isGain: boolean;
}

export interface AchievementAPI {
  unlocked: AchievementModel[];
  locked: AchievementModel[];
}

export interface CommentModel {
  id: number;
  text: string;
  date: Date;
  name: string;
  restaurant: number;
  to_comment: number | null;
  subcomments: CommentModel[];
}
