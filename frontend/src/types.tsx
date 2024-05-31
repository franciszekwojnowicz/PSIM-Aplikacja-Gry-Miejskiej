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
  image: string;
  restaurant: number;
  to_comment: number | null;
  subcomments: CommentModel[];
}
export interface UserModel {
  name: string;
  email: string;
  image: string;
  points: number;
}
export interface UserModelRanking {
  name: string;
  id: number;
  image: string;
  points: number;
}
