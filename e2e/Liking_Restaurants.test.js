/* eslint-disable no-undef */
const assert = require('assert');
Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('.headline');
  I.see('List Restoran Mantap Favorit Anda');
});

Scenario('liking one restaurant', async ({ I }) => {

  I.amOnPage('/');
  I.wait(2);

  I.scrollTo('#mainContent');
  I.wait(2);

  I.seeElement('.content-title a.btn.btn-full');
  const firstRestaurant = locate('.content-title a.btn.btn-full').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.content-item');
  const likedRestaurantTitle = await I.grabTextFrom('.content-title');
  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});

Scenario('unliking one restaurant', async ({ I }) => {

  I.amOnPage('/');
  I.wait(2);

  I.scrollTo('#mainContent');
  I.wait(2);

  I.seeElement('.content-title a.btn.btn-full');
  const firstRestaurant = locate('.content-title a.btn.btn-full').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.content-item');
  const likedRestaurantTitle = await I.grabTextFrom('.content-title');
  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);

  I.click(firstRestaurantTitle);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.headline');
  I.see('List Restoran Mantap Favorit Anda');
});