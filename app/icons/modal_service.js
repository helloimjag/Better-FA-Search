'use strict';

module.exports = function($window){
  var service = {};
  var store = $window.localStorage;
  service.display = display;
  service.get = check;

  return service;

  function display(){
    var i = check();
    if(i){
      store.setItem('i', 0);
      return !!i;
    }else{
      store.setItem('i', 1);
      return !!i;
    }
  }

  function check(){
    var n = store.getItem('i');
    if(n === null){return 1;}
    return !!Number(n);
  }
}
