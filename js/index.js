/*(function(){
    var tabs=document.querySelectorAll("ul#tab>li>[data-click=ta]");
   // console.log(tabs);
    var zIndex=0;
    for(tab of tabs){
        tab.onclick=function(){
            var tab=this;
            var id=tab.getAttribute("data-div");
            var or=document.getElementById(id);
            or.style.zIndex=zIndex;
            zIndex++;
           console.log(zIndex);
        }
    }
})()
*/

var lis= document.querySelectorAll("ul#tab>li>[data-click=ta]");
var uls = document.querySelectorAll("ul.content");
var zIndex=10;
for(var i = 0; i<lis.length; i++){
    (function(i){
        lis[i].onclick = function(){
            uls[i].style.zIndex=zIndex;
            //console.log(zIndex);
            return zIndex++;
        }
    })(i)
}