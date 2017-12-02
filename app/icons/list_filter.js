'use strict';

module.exports = function(){
  return function(input){
    if(input.length || false){
      return ' '+input.join(' ');
    }else{
      return '';
    }
  }
}
