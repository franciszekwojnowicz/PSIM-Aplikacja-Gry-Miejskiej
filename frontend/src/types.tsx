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
}

export interface RestaurantInfoModel {
  name: string;
  type: string;
  position: number;
  description: string;
  //raiting: number
  //address: string
  //link_to_address: string
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
  isGain: boolean;
}

export interface AchievementAPI {
  unlocked: AchievementModel[];
  locked: AchievementModel[];
}

export interface CommentModel {
  id: string;
  text: string;
  date: Date;
  name: string;
  restaurant: number;
  to_comment: number | null;
  subcomments: CommentModel[];
}
