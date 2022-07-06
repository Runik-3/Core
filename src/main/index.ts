import appInit from './init';
import Shelf from './services/shelf';
import Forge from './services/forge';
import Parser from './services/Parser';

// initialize electron application
appInit();

// library controller
const shelf = new Shelf();
shelf.init();

// dictionary forge backing service
const forge = new Forge(shelf);
forge.init();

Parser.fromXdxf('<ar><k>Afrika</k>Africa</ar><ar><k>Afrikaan</k>African</ar>');
// generator backing service

// converter backing service
