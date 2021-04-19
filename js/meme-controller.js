'use strict'
var gCanvas; // I have more than one canvas...
var gCtx;

function onInit() {
    gCanvas = document.querySelector('#canvas')
    console.log(gCanvas)
    gCtx = gCanvas.getContext('2d')
    var imgs = getImages()
    drawImages(imgs) // will need the img id
    renderImgs()
}

 function renderImgs() {
     var imgs = gImgs
     console.log(imgs)
     var strHtmls = imgs.map((img)=>{
        return `
        <img class="grid img-main" src=${img.url}>
        `
     })
    document.querySelector('.imgs-container').innerHTML=strHtmls.join('')
 }

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container');
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}

// change map? see how works for more than one pic
function drawImages(imgs) {
    var img = new Image()
    img.src = imgs.map(function (i) {
        console.log(i.url)
        return (i.url)
    })
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    }

}


// need to take text from gMeme
// function getText(){

// }

// change to info from gMeme...
function drawText(text, x, y) {
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
var linePosY = 80
var currChar = '';

// last char does not print + fix spaces
function onEnterText(str) {
    currChar = str.charAt(str.length - 1)
    // add switch cases for space/back space
    linePosX += 20;
    drawText(currChar, linePosX, linePosY)
}



