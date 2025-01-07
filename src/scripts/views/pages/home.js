import DicodingDB from '../../data/dicodingsource';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
    <section class="headline" id="headline">
      <h2>Lidahmu Butuh Petualangan? Kami Punya Peta!</h2>
    </section>

    <section class="content" id="list">
      
    </section>
    `;
  },

  async afterRender() {
    const restaurants = await DicodingDB.HomePage();
    const restaurantContainer = document.querySelector('#list');
    restaurants.forEach((restaurant) => {
      restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default Home;
