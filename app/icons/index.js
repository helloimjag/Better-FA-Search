'use strict';

var app = require('angular').module('fa');
app.controller('IconController', require('./icons_controller'));
app.service('iconService', require('./icons_service'));
app.filter('intoList', require('./list_filter'));
app.service('modalService', require('./modal_service'));
