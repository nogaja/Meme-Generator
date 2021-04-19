'use strict'
var gCanvas; // I have more than one canvas...
var gCtx;

function onInit() {
    gCanvas = document.querySelector('#canvas')
    console.log(gCanvas)
    gCtx = gCanvas.getContext('2d')
    var imgs = getImages()
    renderImgs()
}

function renderImgs() {
    var imgs = gImgs
    var strHtmls = imgs.map((img) => {
        return `
        <img class="grid img-main" src=${img.url} onclick="onOpenEditor(${img.id})">
        `
    })
    document.querySelector('.imgs-container').innerHTML = strHtmls.join('')
}

function onOpenEditor(imgId) {
    document.querySelector('.meme-editor').style.display = 'flex'
    var img = getImgById(imgId)
    renderBtns(imgId)
    drawImage(img)
}

function renderBtns(imgId) {
    var strHtml = 
    `
    <button class= "ctrl-btn" onclick="onChangeFontSize(1,${imgId})"><img src="icons/increase font - icon.png"></button>
    <button class= "ctrl-btn" onclick="onChangeFontSize(-1,${imgId})"><img src="icons/decrease font - icon.png"></button>
    <button class= "ctrl-btn btn-up"></button>
    <button class= "ctrl-btn btn-down"></button>
    `
    document.querySelector('.top-btns').innerHTML= strHtml
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container');
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}

// change map? see how works for more than one pic
function drawImage(selectedImg) {
    var img = new Image()
    img.src = selectedImg.url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    }

}
// to do: will change line gmeme
function onChangeFontSize(diff) {

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



