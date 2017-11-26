function start(){
  readCss();
}
function readCss(){
  function matchText(data){
    var re = "\.fa-.*:before.*\n.*content.*\n\}";
    re = new RegExp(re, 'gmi');
    var matches = data.match(re);
    displayCss(matches);
  }
  function displayCss(data){
    var faa = {data:[]};
    if(data){
      data.forEach(printFa);
      console.log(faa);
    }
    function printFa(fa){
      fa = fa.replace(".fa-","")
      .replace(":before {","")
      .replace(";","")
      .replace("}","")
      .replace('"','')
      .replace('"','')
      .replace(/ /g, "")
      .replace("\n", "")
      .trim()
      .split("content:");
      var obj = {};
      obj.name = fa[0];
      obj.code = fa[1];
      faa.data.push(obj);
      $("body").append(fa+"<br>");
    }
  }
  $.get('fa/css/font-awesome.css', matchText, 'text');
}
