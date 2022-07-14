import appInit from './init';
import Shelf from './services/shelf';
import Forge from './services/forge';

// initialize electron application
appInit();

// library controller
const shelf = new Shelf();
shelf.init();

// dictionary forge backing service
new Forge(shelf).init();

// generator backing service

// converter backing service
