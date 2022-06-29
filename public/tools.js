let btnpress = true;
let cbtnpress = true;
let sbtnpress = true;
let shbtnpress = true;
let menubtn = document.querySelector(".fas"); 
let sticky = document.querySelector(".sticky");
let upload = document.querySelector(".upload");
let ccolor ="black";
let cwidth = 1;
function openNav() {



if(btnpress){
menubtn.classList.remove("fa-bars");
menubtn.classList.add("fa-times");
document.getElementById("mySidebar").style.width = "120px";
document.getElementById("main").style.marginLeft = "120px";
btnpress = false;
}else {

menubtn.classList.remove("fa-times"); 
menubtn.classList.add("fa-bars");
document.getElementById("mySidebar").style.width = "0";
document.getElementById("main").style.marginLeft= "0";
document.getElementById("smallmenu").style.display="none";
document.getElementById("smallmenu1").style.display="none";
document.getElementById("smallmenu2").style.display="none";
sbtnpress = true;
sbtnpress = true;
cbtnpress = true;
btnpress = true;
}
}

function  openSmallMenu(){
if(cbtnpress){
document.getElementById("smallmenu").style.display="block";
cbtnpress = false;
}else {
document.getElementById("smallmenu").style.display="none";
cbtnpress = true;
}
}

function  openSmallMenu1(){
if(sbtnpress){
document.getElementById("smallmenu1").style.display="block";
sbtnpress = false;
}else {
document.getElementById("smallmenu1").style.display="none";
sbtnpress = true;
}
}

function  openSmallMenu2(){
if(sbtnpress){
document.getElementById("smallmenu2").style.display="block";
sbtnpress = false;
}else {
document.getElementById("smallmenu2").style.display="none";
sbtnpress = true;
}
}


let cTool = "pencil";
let canvasBoard = document.querySelector("canvas");
let tool = canvasBoard.getContext("2d");
let body = document.querySelector("body");
canvasBoard.height = window.innerHeight;
canvasBoard.width = window.innerWidth;

// canavas board -> left  point kitna aage  hai 
let boardLeft = canvasBoard.getBoundingClientRect().left;
let boardTop = canvasBoard.getBoundingClientRect().top;
let iX, iY, fX, fY;
let drawingMode = false;
canvasBoard.addEventListener("mousedown", function (e) {

if (cTool == "pencil" || cTool == "eraser") {
drawingMode = true;

}
drawingMode = true;
iX =  e.clientX - boardLeft;
   iY = e.clientY - boardTop;
if(cTool == "rect") {
   return;
}

let data =  {
   iX : iX,
   iY : iY
}
socket.emit("beginstroke",data);

})
function beginstroke(data){

  tool.beginPath();
tool.moveTo(data.iX, data.iY); 
}

let undoRedoTracker = []; //Data
let track = 0;

canvasBoard.addEventListener("mouseup", function (e) {


drawingMode = false;
 if (cTool == "rect" || cTool == "line") {
// rect, line
let data = {
   fX : e.clientX + boardLeft,
 fY : e.clientY - boardTop,
 iX : iX,
 iY : iY,
 cTool : cTool,
 color : tool.strokeStyle,
width : tool.lineWidth,

}

socket.emit("drawstroke",data);
}


})

function drawstroke(data){

tool.strokeStyle = data.color;
tool.lineWidth = data.width;
let width = data.fX - data.iX;
let height = data.fY - data.iY;
if(data.cTool == "pencil" || data.cTool == "eraser"){
 
   tool.lineTo(data.fX, data.fY);
   tool.stroke();
   // iX = fX;
   // iY = fY;  
   }else {
      if (data.cTool == "rect") {
  
    tool.strokeRect(data.iX, data.iY, width, height);
} else if (data.cTool == "line") {
   //  tool.beginPath();
   //  tool.moveTo(data.iX, data.iY);
    tool.lineTo(data.fX, data.fY);
    tool.stroke();
    console.log("line tool is pending")
}
let url = canvasBoard.toDataURL();
undoRedoTracker.push(url);
track = undoRedoTracker.length-1;

   }


}


canvasBoard.addEventListener("mousemove", function (e) {
if (drawingMode == false)
return;
if(cTool == "pencil" || cTool == "eraser"){
   let data = {fX : e.clientX - boardLeft,
fY : e.clientY - boardTop,
iX : iX,
iY : iY,
cTool : cTool,
color : tool.strokeStyle,
width : tool.lineWidth,

   }

   socket.emit("drawstroke",data);
}





})



// <!-- tool change -->
let pencil = document.querySelector(".pencil");
let eraser = document.querySelector(".eraser");
let rect = document.querySelector(".rect");
let line = document.querySelector(".line");
let download = document.querySelector(".download");
// let options = document.querySelectorAll(".size-box");
// identify -> click  -> again click
pencil.addEventListener("click", function (e) {

cTool = "pencil";
if(themebtn){
tool.strokeStyle = "black";
}else {
tool.strokeStyle = "white";
}
// tool.strokeStyle = "black";

canvasBoard.classList.add("cursor1");
canvasBoard.classList.remove("cursor2");
// canvasBoard.style.cursor = "url('https://cur.cursors-4u.net/others/oth-3/oth203.cur'), auto !important";
// canvasBoard.style.cursor = "url('Icons/shapes.png'),auto";

})
eraser.addEventListener("click", function (e) {

// eraser.style.border = "1px solid red";
// koi aur clicked aur usko options visible to wo remove ho jaaye 
cTool = "eraser";
if(themebtn){
tool.strokeStyle = "white";
}else {
tool.strokeStyle = "black";
}

// canvasBoard.classList.remove("cursor1");
canvasBoard.classList.add("cursor2");

})
rect.addEventListener("click", function (e) {
canvasBoard.classList.add("cursor1");
canvasBoard.classList.remove("cursor2");
cTool = "rect"; 
})
line.addEventListener("click", function (e) {
canvasBoard.classList.add("cursor1");
canvasBoard.classList.remove("cursor2");
cTool = "line"; 
})

let redo = document.querySelector(".redo");
let undo = document.querySelector(".undo");
let redColor = document.querySelector(".red");
let greenColor = document.querySelector(".green");
let blueColor = document.querySelector(".blue");
let sizes = document.querySelector(".sizes");
redColor.addEventListener("click", function () {
canvasBoard.classList.add("cursor1");
canvasBoard.classList.remove("cursor2");
tool.strokeStyle = "red";
})
greenColor.addEventListener("click", function () {
canvasBoard.classList.add("cursor1");
canvasBoard.classList.remove("cursor2");
tool.strokeStyle = "green";
})
blueColor.addEventListener("click", function () {
canvasBoard.classList.add("cursor1");
canvasBoard.classList.remove("cursor2");
tool.strokeStyle = "blue";
})


let sizeBoxArr = document.querySelector(".size-box");
// currentTarget
sizeBoxArr.addEventListener("click", function (e) {
// actual event  occur -> target
let elems = ["size1", "size2", "size3", "size4"];
// class
// jispe 
// console.log(e.target);
let allTheClasses = e.target.classList;
let firstClass = allTheClasses[0];
let test = elems.includes(firstClass);
if (test) {
// size waale button click;
if (firstClass == "size1") {
   tool.lineWidth= 1;
} else if (firstClass == "size2") {
   tool.lineWidth= 4;
} else if (firstClass == "size3") {
   tool.lineWidth= 7;
} else if (firstClass == "size4") {
   tool.lineWidth= 10;
}
}


// event listener -> currentTarget
// console.log(e.currentTarget)
})

let allclear = document.querySelector(".clear");
allclear.addEventListener("click",function (e){
tool.clearRect(0,0,canvasBoard.width,canvasBoard.height);
track++;
})

canvasBoard.addEventListener("mousedown", function (e){

document.getElementById("mySidebar").style.width = "0";
document.getElementById("main").style.marginLeft= "0";
document.getElementById("smallmenu").style.display="none";
document.getElementById("smallmenu1").style.display="none";
document.getElementById("smallmenu2").style.display="none";
sbtnpress = true;
sbtnpress = true;
cbtnpress = true;
btnpress = true;
menubtn.classList.remove("fa-times"); 
menubtn.classList.add("fa-bars");
})

let themechanger = document.querySelector(".theme");
let themeicon = document.querySelector(".themebtn");
let themebtn = true;
// themeicon.addEventListener("click", function (e){
//      if(themebtn){
//          canvasBoard.classList.add("theme1");
//          tool.strokeStyle = "white";
//          themebtn = true;
//      }else {
//       canvasBoard.classList.remove("theme1");
//       tool.strokeStyle = "black";
//       themebtn = false;
//      }
// }) 

function themechnge(){
if(themebtn){
themebtn = false;
 canvasBoard.classList.add("theme1");
 tool.strokeStyle = "white";
 
 document.getElementById("mytheme").src = "Icons/sun.png";  
 tool.clearRect(0,0,canvasBoard.width,canvasBoard.height);
 pencil.click();
}else {
themebtn = true;
canvasBoard.classList.remove("theme1");
tool.strokeStyle = "black";

document.getElementById("mytheme").src = "Icons/moon.png"; 
tool.clearRect(0,0,canvasBoard.width,canvasBoard.height); 
pencil.click();
}
}


upload.addEventListener("click", (e) => {
// Open file explorer
let input = document.createElement("input");
input.setAttribute("type", "file");
input.click();

input.addEventListener("change", (e) => {
let file = input.files[0];
let url = URL.createObjectURL(file);

let stickyTemplateHTML = `
<div class="header-cont">
  <div class="minimize"></div>
  <div class="remove"></div>
</div>
<div class="note-cont">
  <img src="${url}"/>
</div>
`;
createSticky(stickyTemplateHTML);
})
})

sticky.addEventListener("click", (e) => {
let stickyTemplateHTML = `
<div class="header-cont">
<div class="minimize"></div>
<div class="remove"></div>
</div>
<div class="note-cont">
<textarea spellcheck="false"></textarea>
</div>
`;
cTool = "";
createSticky(stickyTemplateHTML);
})

function createSticky(stickyTemplateHTML) {
let stickyCont = document.createElement("div");
stickyCont.setAttribute("class", "sticky-cont");
stickyCont.innerHTML = stickyTemplateHTML;
document.body.appendChild(stickyCont);

let minimize = stickyCont.querySelector(".minimize");
let remove = stickyCont.querySelector(".remove");
noteActions(minimize, remove, stickyCont);

stickyCont.onmousedown = function (event) {
drawingMode= false;
dragAndDrop(stickyCont, event);
};

stickyCont.ondragstart = function () {
return false;
};
}

function noteActions(minimize, remove, stickyCont) {
remove.addEventListener("click", (e) => {
stickyCont.remove();
})
minimize.addEventListener("click", (e) => {
let noteCont = stickyCont.querySelector(".note-cont");
let display = getComputedStyle(noteCont).getPropertyValue("display");
if (display === "none") noteCont.style.display = "block";
else noteCont.style.display = "none";
})
}

function dragAndDrop(element, event) {
   cTool = "";
let shiftX = event.clientX - element.getBoundingClientRect().left;
let shiftY = event.clientY - element.getBoundingClientRect().top;

element.style.position = 'absolute';
element.style.zIndex = 1000;

moveAt(event.pageX, event.pageY);

// moves the ball at (pageX, pageY) coordinates
// taking initial shifts into account
function moveAt(pageX, pageY) {
element.style.left = pageX - shiftX + 'px';
element.style.top = pageY - shiftY + 'px';
}

function onMouseMove(event) {
moveAt(event.pageX, event.pageY);
}

// move the ball on mousemove
document.addEventListener('mousemove', onMouseMove);

// drop the ball, remove unneeded handlers
element.onmouseup = function () {
document.removeEventListener('mousemove', onMouseMove);
element.onmouseup = null;
};
}

download.addEventListener("click", (e) => {
let url = canvasBoard.toDataURL();

let a = document.createElement("a");
a.href = url;
a.download = "board.jpg";
a.click();
})


undo.addEventListener("click", (e) => {
   if (track >= 0) track--;
   // track action
   let data = {
       trackValue: track,
       undoRedoTracker
   }
   undoRedoCanvas(data);
  
})
redo.addEventListener("click", (e) => {
   if (track < undoRedoTracker.length-1) track++;
   // track action
   let data = {
       trackValue: track,
       undoRedoTracker
   }
   undoRedoCanvas(data);
})

function undoRedoCanvas(trackObj) {
   track = trackObj.trackValue;
   undoRedoTracker = trackObj.undoRedoTracker;
   tool.clearRect(0,0,canvasBoard.width,canvasBoard.height);
   let url = undoRedoTracker[track];
   let img = new Image(); // new image reference element
   img.src = url;
   img.onload = (e) => {
       tool.drawImage(img, 0, 0, canvasBoard.width, canvasBoard.height);
   }
}
socket.on("beginstroke",(data)=>{
   beginstroke(data);
})
socket.on("drawstroke",(data)=>{
   drawstroke(data);
})