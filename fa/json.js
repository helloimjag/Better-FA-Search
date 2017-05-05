// Better FontAwesome View

// command
// node json

// This creates a json info for FontAwesome for better search for designers & devs.
var fs = require('fs');
var content = '{"test":["a","b","c"]}';
var name = "test.json";

var fromName = "css/font-awesome.css";

function readCss(data){
  matchText(data);
  function matchText(data){
    var re = "\.fa-.*:before.*\n.*content.*\n\}";
    re = new RegExp(re, 'gmi');
    var matches = data.match(re);
    displayCss(matches);
  }
  function displayCss(data){
    var faa = {data:[]};
    if(data){
    var i = 0;

      // data.forEach(printFa);
      var printFa = function(fa){
        fa = fa.replace(".fa-","")
                   .replace(":before {","")
                   .replace(";","")
                   .replace("}","")
                   .replace('"','')
                   .replace('"','')
                   .replace(/ /g, "")
                   .replace("\\","")
                   .replace("\n", "")
                   .trim()
                   .split("content:");
        var obj = {};
            obj.name = fa[0];
            obj.code = fa[1];
        faa.data.push(obj);
      };

      for(i; i< data.length; i++){
        printFa(data[i]);
      }

      createFile("fa.json", JSON.stringify(faa, null, "\t"));
    }
  }
}

fs.readFile(fromName, "utf8", function(err, data){
  if (err) throw err;
  readCss(data);
});

function createFile(name, data){
  fs.writeFile(name, data, function err(err){
    if(err) throw err;
    console.log("File created");
  });
}
