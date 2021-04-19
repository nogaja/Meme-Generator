'use strict'
var gCanvas;
var gCtx;

function onInit(){
    gCanvas = document.querySelector('#canvas')
    gCtx = gCanvas.getContext('2d')
    var imgs = getImages()
    drawImages(imgs)
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container');
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}

// change map? see how works for more than one pic
function drawImages(imgs){
    var img = new Image()
    img.src =  imgs.map( function(i){
        return(i.url)
    })
    img.onload = ()=> {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    }
    
}


 // need to take text from gMeme
// function getText(){
  
// }

// change to info from gMeme...
function drawText(text, x ,y){
    var line = gMeme.lines[0] // wil need to change
    gCtx.lineWidth = 2
    gCtx.strokeStyle = `${line.stroke}`
    gCtx.fillStyle = `${line.fill}`
    gCtx.font = `${line.size}px  Impact`
    gCtx.textAlign = line.align
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

// will be in a func
var linePosX = 0
var linePosY = 150
var currChar='';

// last char does not print + fix spaces
function onEnterText(str){
    currChar = str.charAt(str.length-1) 
    // add switch cases for space/back space
    linePosX += 20;
    drawText(currChar,linePosX, linePosY)
}



