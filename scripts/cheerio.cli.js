var fs = require('fs');
var path = require('path');
var cheerio = require('cheerio');
var argv = require('minimist')(process.argv.slice(2));
var base = path.resolve();

if(argv._.length > 0){ // Verify Input
  if(argv.o){
    argv.o = argv.o.split('/').join('\\');
    read(base + '\\'+ argv._[0])
  }else{
    exit();
  }
}else{
  console.log('Forgetting to add a file, eh?');
  exit();
}

function chipchip(html){
  var $ = cheerio.load(html);
  if(argv.r){
    $('.remove_for_production').remove();
    write(base+'\\'+argv.o+'\\'+argv._[0], $.html());
  }
}

function read(file){
  fs.readFile(file, "utf8", function(err, html) {
    if (err) throw err;
    chipchip(html);
  });
}

function write(name, data){
  fs.writeFile(name, data, function err(err) {
    if (err) throw err;
    console.log('File created');
  });
}

function exit(){
  process.exit() = 1;
}
