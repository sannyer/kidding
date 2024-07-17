function knagy(x){
    var y = document.getElementById("k" + x);
    y.style.height = window.innerHeight + "px";
    y.style.width = window.innerWidth + "px";
    document.getElementById("nagykep").style.display = "none";
    y.style.display = "block";
   }
function kkis(x){
    var y = document.getElementById("k" + x);
    document.getElementById("nagykep").style.display = "block";
    y.style.display = "none";
}