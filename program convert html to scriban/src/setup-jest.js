// global.window = window
// global.$ = require('jquery');
var jsdom = require('jsdom');
$ = require('jquery')(new jsdom.JSDOM().window);