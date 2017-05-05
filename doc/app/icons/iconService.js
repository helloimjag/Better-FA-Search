(function() {
  "use strict";

  angular
    .module("fa")
    .factory("iconService", iconService);

  iconService.$inject = ["$http"];

  function iconService($http) {
    return {
      getIcons: getIcons
    };

    function getIcons() {
      return $http
        .get("/app/icons/fa.json")
        .then(iconGet)
        .catch(iconFail);

      function iconGet(d) {
        return d.data;
      }

      function iconFail(d) {
        return {
          error: "error"
        };
      }
    }

  }

})();
