/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-presenter';
import FavoriteRestaurantSearchView from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-view';

describe('Searching restaurants', () => {
  let presenter;
  let favoriteRestaurants;
  let view;

  const searchRestaurants = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestaurantSearchContainer = () => {
    view = new FavoriteRestaurantSearchView();
    document.body.innerHTML = view.getTemplate();
  };
  const constructPresenter = () => {
    favoriteRestaurants = {
      getAllRestaurants: jest.fn(),
      searchRestaurants: jest.fn(),
    };
    presenter = new FavoriteRestaurantSearchPresenter({
      favoriteRestaurants,
      view,
    });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {

    it('should be able to capture the query typed by the user', () => {
      favoriteRestaurants.searchRestaurants.mockImplementation(() => []);

      searchRestaurants('resto a');

      expect(presenter.latestQuery).toEqual('resto a');
    });

    it('should ask the model to search for liked restaurants', () => {
      favoriteRestaurants.searchRestaurants.mockImplementation(() => []);

      searchRestaurants('resto a');

      expect(favoriteRestaurants.searchRestaurants).toHaveBeenCalledWith('resto a');
    });

    it('should show the found restaurants', () => {
      presenter._showFoundRestaurants([{ id: 1 }]);
      expect(document.querySelectorAll('.restaurant').length).toEqual(1);
      presenter._showFoundRestaurants([
        {
          id: 1,
          title: 'Satu',
        },
        {
          id: 2,
          title: 'Dua',
        },
      ]);
      expect(document.querySelectorAll('.restaurant').length).toEqual(2);
    });

    it('should show the title of the found restaurants', () => {
      presenter._showFoundRestaurants([
        {
          id: 1,
          title: 'Satu',
        },
      ]);
      expect(document.querySelectorAll('.restaurant__title').item(0).textContent).toEqual('Satu');

      presenter._showFoundRestaurants([
        {
          id: 1,
          title: 'Satu',
        },
        {
          id: 2,
          title: 'Dua',
        },
      ]);
      const restaurantTitles = document.querySelectorAll('.restaurant__title');
      expect(restaurantTitles.item(0).textContent).toEqual('Satu');
      expect(restaurantTitles.item(1).textContent).toEqual('Dua');
    });

    it('should show - for found restaurant without title', () => {
      presenter._showFoundRestaurants([{ id: 1 }]);
      expect(document.querySelectorAll('.restaurant__title').item(0).textContent).toEqual('-');
    });

    it('should show the restaurants found by Favorite Restaurants', (done) => {
      document
        .getElementById('restaurant-search-container')
        .addEventListener('restaurants:searched:updated', () => {
          expect(document.querySelectorAll('.restaurant').length).toEqual(3);
          done();
        });
      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'resto a') {
          return [
            { id: 111, title: 'resto abc' },
            { id: 222, title: 'ada juga resto abcde' },
            { id: 333, title: 'ini juga boleh resto a' },
          ];
        }
        return [];
      });
      searchRestaurants('resto a');
    });

    it('should show the name of the restaurants found by Favorite Restaurants', (done) => {
      document
        .getElementById('restaurant-search-container')
        .addEventListener('restaurants:searched:updated', () => {
          const restaurantTitles = document.querySelectorAll('.restaurant__title');
          expect(restaurantTitles.item(0).textContent).toEqual('resto abc');
          expect(restaurantTitles.item(1).textContent).toEqual('ada juga resto abcde');
          expect(restaurantTitles.item(2).textContent).toEqual('ini juga boleh resto a');
          done();
        });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'resto a') {
          return [
            { id: 111, title: 'resto abc' },
            { id: 222, title: 'ada juga resto abcde' },
            { id: 333, title: 'ini juga boleh resto a' },
          ];
        }
        return [];
      });

      searchRestaurants('resto a');
    });
  });
  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      favoriteRestaurants.getAllRestaurants.mockImplementation(() => []);
      searchRestaurants(' ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('    ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });

    it('should show all favorite restaurants', () => {
      favoriteRestaurants.getAllRestaurants.mockImplementation(() => []);
      searchRestaurants('    ');
      expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalled();
    });
  });

  describe('When no favorite restaurants could be found', () => {
    it('should show the empty message', (done) => {
      document
        .getElementById('restaurant-search-container')
        .addEventListener('restaurants:searched:updated', () => {
          expect(document.querySelectorAll('.restaurants__not__found').length).toEqual(1);
          done();
        });
      favoriteRestaurants.searchRestaurants.mockImplementation((query) => []);
      searchRestaurants('resto a');
    });

    it('should not show any restaurant', (done) => {
      document.getElementById('restaurant-search-container')
        .addEventListener('restaurants:searched:updated', () => {
          expect(document.querySelectorAll('.restaurant').length).toEqual(0);
          done();
        });
      favoriteRestaurants.searchRestaurants.mockImplementation((query) => []);
      searchRestaurants('film a');
    });
  });
});