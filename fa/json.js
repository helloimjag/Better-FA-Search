// Convert FA css into JSON

// This file goes through the Font Awesome css file and fetches fa-{name} & html entity code
var fs = require('fs');
var fromName = "../bower_components/components-font-awesome/css/font-awesome.css";

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
    console.log('v: ' + v);
    console.log(matches.length);
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
          .trim()
          .split("content:");
        var obj = {};
        obj.name = fa[0];
        obj.code = fa[1];
        faa.data.push(obj);
      };

      for (i; i < data.length; i++) {
        printFa(data[i]);
      }

      createFile("fa.json", JSON.stringify(faa, null, "\t"));
    }
  }
  matchText(data);
}

fs.readFile(fromName, "utf8", function(err, data) {
  if (err) throw err;
  readCss(data);
});

function createFile(name, data) {
  fs.writeFile(name, data, function err(err) {
    if (err) throw err;
    console.log("File created");
  });
}
