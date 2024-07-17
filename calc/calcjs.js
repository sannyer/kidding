var ndisplayed = "", display;
function append(char, displayChar = "") {
    display.textContent += char
    ndisplayed += displayChar != "" ? displayChar : char;
    console.log(ndisplayed)
}
function gc(){    
    display.textContent = ""
    ndisplayed = ""
    console.log(ndisplayed)
}
function ggyn(){
    display.textContent = eval(ndisplayed)
    ndisplayed = eval(ndisplayed)
    console.log(ndisplayed)
}

function init() {
    display = document.getElementById("display");
}