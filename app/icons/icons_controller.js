'use strict';

module.exports = function($interval, iconService, modalService) {
  var vm = this;
  vm.intro = modalService.get();
  vm.tooltip = 0;
  vm.icons = "";
  vm.faList = "";
  vm.ariaHidden = true;
  vm.extraClasses = ['aria-hidden'];
  vm.classes = '';
  vm.addClass = addClass;
  vm.options = ["aria-hidden", "fa-border", "fa-fw", "fa-li", "fa-spin", "fa-pulse"];

  vm.fn = {};
  vm.fn.modal = modal;
  vm.fn.index = arrIndex;
  vm.fn.add = add;
  vm.fn.del = del;
  vm.fn.entity = entity;

  function modal() {
    modalService.display();
    vm.intro = modalService.get();
  }

  function arrIndex(i) {
    var index = vm.extraClasses.indexOf(i);
    if (index !== -1) {
      return index + 1;
    } else {
      return !!0;
    }
  }

  function del(i) {
    vm.extraClasses.splice(i, 1);
  }

  function add(a) {
    vm.extraClasses.push(a);
  }

  function addClass(add) {
    var index = arrIndex(add);
    if (add) {
      if (index) {
        index -= 1;
        vm.fn.del(index);
      } else {
        if (add === 'fa-pulse') {
          vm.fn.add(add);
          index = arrIndex('fa-spin');
          if (index) {
            vm.fn.del(index - 1);
          }
        } else if (add === 'fa-spin') {
          vm.fn.add(add);
          index = arrIndex('fa-pulse');
          if (index) {
            vm.fn.del(index - 1);
          }
        } else {
          vm.fn.add(add);
        }
      }
    }
  }

  start();

  function start() {
    return getData();
  }

  function getData() {
    return iconService
      .getIcons()
      .then(storeIcons);
  }

  function storeIcons(d) {
    vm.version = d.v;
    vm.icons = d.data;
    return vm.icons;
  }

  // Convert icon string to html entity
  function entity(e) {
    return String.fromCharCode(parseInt(e, 16));
  }

  // Clip Copy
  var clipsettings = {
    text: function(trigger) {
      console.log(trigger);
      return trigger.getAttribute('data-copy-text');
    }
  };

  var Clipboard = require('clipboard');
  var entityname = new Clipboard('.entity-name', clipsettings);
  var entity = new Clipboard('.entity', clipsettings);
  var css = new Clipboard('.css', clipsettings);
  var html = new Clipboard('.html', clipsettings);
  var cssFull = new Clipboard('.css-full', clipsettings);

}
