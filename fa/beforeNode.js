function start(){
  readCss();
}
function readCss(){
  function matchText(data){
    var re = "\.fa-.*:before.*\n.*content.*\n\}";
    // var re = "(\.fa-)(.*)(:before)(.*)"; Working from .fa to before {
    var re = new RegExp(re, 'gmi');
    var matches = data.match(re);
    displayCss(matches);
  }
  function displayCss(data){
    var faa = {data:[]};
    if(data){
      data.forEach(printFa);
      function printFa(fa){
        var fa = fa.replace(".fa-","")
                   .replace(":before {","")
                   .replace(";","")
                   .replace("}","")
                   .replace('"','')
                   .replace('"','')
                   .replace(/ /g, "")
                   .replace("\n", "")
                   .trim()
                   .split("content:");
        var obj = {}
            obj.name = fa[0];
            obj.code = fa[1];
        faa.data.push(obj);
        $("body").append(fa+"<br>");
      }
      console.log(faa);
      // print json ready
    }
  }
  $.get('fa/css/font-awesome.css', matchText, 'text');
}
