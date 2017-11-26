(function(){
  "use strict";

  angular
  .module("fa")
  .filter("intoList", intoList);

  function intoList(){
    return function(input){
      if(input.length || false){
        return ' '+input.join(' ');
      }else{
        return '';
      }
    };
  }
})();
