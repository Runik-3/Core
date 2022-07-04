import appInit from './init';
import Shelf from './services/shelf';

// initialize electron application
appInit();

// library controller
const shelf = new Shelf();
shelf.init();

// dictionary forge backing service

// generator backing service

// converter backing service
