'use strict'
console.log('hello control')
var gCanvas;
var gCtx;

function onInit(){
    gCanvas = document.querySelector('#canvas')
    gCtx = gCanvas.getContext('2d')
    console.log(gCtx)
    var imgs = getImages()
    drawImages(imgs)
}


// change map? see how works for more than one pic
function drawImages(imgs){
    var img = new Image()
    img.src =  imgs.map( function(i){
        console.log(i.url)
        return(i.url)
    })
    img.onload = ()=> {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    }
    
}



function draw() {
    drawText('Falafel',200,150) 
}
 // need to take text from gMeme
// function getText(){
  
// }

// change to info from gMeme...
console.log(gMeme)
function drawText(text, x ,y){
    console.log(text)
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.font = '40px Impact'
    gCtx.textAlign = 'left'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

var linePosX = 0
var linePosY = 150
var currChar='';

// last char does not print + fix spaces
function onEnterText(str){
    currChar = str.charAt(str.length-1) 
    linePosX += 20;
    console.log(currChar)
    drawText(currChar,linePosX, linePosY)
    console.log(linePosX)
}



