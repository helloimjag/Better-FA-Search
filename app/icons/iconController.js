(function(){
  "use strict";

  angular
  .module("fa")
  .controller("IconController", IconController);

  IconController.$inject = ["iconService", "$interval"];

  function IconController(iconService, $interval){
    var vm = this;

    vm.set = {
      intro:false,
      mode:false
    }
    vm.tooltip = 0;
    vm.intro = true;
    vm.msg = "Hey it works";
    vm.icons = "";
    vm.mode = "class";
    vm.faList = "";
    vm.ariaHidden = true;
    vm.extraClasses = "";
    vm.addClass = function(add, rm){
      vm.extraClasses = vm.extraClasses.replace(rm, "");
      if(vm.extraClasses.indexOf(add) !== -1){
        vm.extraClasses = vm.extraClasses.replace(add, "");
        if(add === "fa-ul" || add === "fa-li"){
          vm.faList = "";
        }
      }else{
        vm.extraClasses+=" "+add;
        if(add === "fa-ul" || add === "fa-li"){
          vm.faList = add;
        }
      }
      vm.extraClasses = vm.extraClasses.replace(/  +/g, " ");
    };

    start();
    function start(){
      return getData();
    }

    function getData(){
      return iconService
             .getIcons()
             .then(storeIcons);
    }

    function storeIcons(d){
      vm.icons = d.data;
      return vm.icons;
    }

    vm.createEntity = function(e){
      // http://stackoverflow.com/a/22021709
        // Trying to dynamically and opted for a better solution
      function unicodeToChar(text) {
         return text.replace(/\\u[\dA-F]{4}/gi,
                function (match) {
                     return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
                });
      }
      return unicodeToChar("\\u"+e);
    };

    var clipsettings = {
      text: function(trigger){
        return trigger.getAttribute('data-copy-text');
      }
    };
    var clipicon = new Clipboard('.icon', clipsettings);
    var clipname = new Clipboard('.icon-css', clipsettings);
    var clipname = new Clipboard('.icon-css-2', clipsettings);
    var cliphtml = new Clipboard('.icon-html', clipsettings);


    // Tool Tip Rotate
    var time = 3000;
    function update(){
      vm.tooltip+=1;
      if(vm.tooltip === 3){
        vm.tooltip = 0;
      }
    }
    $interval(update,time);

  }
})();
