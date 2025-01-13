/* eslint-disable no-undef */
import { itActsAsFavoriteRestaurantModel } from './contracts/favoriteRestaurantContract';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-resto-idb';

global.structuredClone =
  global.structuredClone ||
  ((obj) => JSON.parse(JSON.stringify(obj)));

describe('Favorite Restaurant Idb Contract Test Implementation', () => {
  afterEach(async () => {
    (await FavoriteRestaurantIdb.getAllRestaurant()).forEach(async (restaurant) => {
      await FavoriteRestaurantIdb.deleteRestaurant(restaurant.id);
    });
  });

  itActsAsFavoriteRestaurantModel(FavoriteRestaurantIdb);
});