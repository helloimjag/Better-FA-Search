// Convert FA css into JSON

// This file goes through the Font Awesome css file and fetches fa-{name} & html entity code
var fs = require('fs');
var fromName = "lib/fontawesome/fontawesome.css";
var argv = require('minimist')(process.argv.slice(2));
var location = "fa/fa.min.json"

function readCss(data) {
  function getVersion(data) {
    // var re = new RegExp('fonts\/fontawesome\-webfont\.eot\?v=.....', 'g');
    var version = data.match(/fonts\/fontawesome\-webfont\.eot\?v=...../g);
    version = version[0].split('=')[1];
    return version;
  }

  function matchText(data) {
    var re = "\.fa-.*:before.*\n.*content.*\n\}";
    re = new RegExp(re, 'gmi');
    var matches = data.match(re);
    var v = getVersion(data);
    displayCss(matches, v);
  }

  function displayCss(data, v) {
    var faa = {};
    faa.data = [];
    faa.v = v;
    if (data) {
      var i = 0;

      var printFa = function(fa) {
        fa = fa.replace(".fa-", "")
          .replace(":before {", "")
          .replace(";", "")
          .replace("}", "")
          .replace('"', '')
          .replace('"', '')
          .replace(/ /g, "")
          .replace("\\", "")
          .replace("\n", "")
          .replace("f","")
          .trim()
          .split("content:");
        console.log(fa);
        var obj = {};
        obj.name = fa[0];
        obj.code = fa[1];
        faa.data.push(obj);
      };

      for (i; i < data.length; i++) {
        printFa(data[i]);
      }
      if(argv.o){
        location = argv.o
      }
      // console.log(faa);
      createFile(location, faa);
    }
  }
  matchText(data);
}

fs.readFile(fromName, "utf8", function(err, data) {
  if (err) throw err;
  readCss(data);
});

function createFile(name, faa) {
  fs.writeFile(name, JSON.stringify(faa), function err(err) {
    if (err) throw err;
    console.log("File created: v" + faa.v + ' FontAwesome');
    console.log("Icons(n): " + faa.data.length);
  });
}
