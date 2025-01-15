import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({
    button,
    drawer,
    content,
    header,
  }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;
    this._header = header;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
      header: this._header,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();

    const skipLink = document.querySelector('.skip-link');
    const content = document.getElementById('mainContent');
    skipLink.addEventListener('click', (e) => {
      e.preventDefault();
      content.scrollIntoView({ behavior: 'smooth' });
      content.focus();
      skipLink.blur();
    });
  }
}

export default App;
