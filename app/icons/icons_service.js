'use strict';
module.exports = function($http){
  return {
    getIcons:getIcons
  };
  function getIcons(){
    return $http
    .get("fa/fa.json")
    .then(iconGet)
    .catch(iconFail);
    function iconGet(d){
      return d.data;
    }
    function iconFail(d){
      return {error: "error"};
    }
  }
}
