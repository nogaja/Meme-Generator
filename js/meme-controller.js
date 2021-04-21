'use strict'
var gCanvas;
var gCtx;
//TODO : 
// 1. remove imgID where not needed
// 2. remove from service design factors
//3. design

function onInit() {
    gCanvas = document.querySelector('#canvas')
    gCtx = gCanvas.getContext('2d')
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
    <button class= "ctrl-btn btn-up" onclick="onMoveLine(-1,${imgId})"></button>
    <button class= "ctrl-btn btn-down" onclick="onMoveLine(1,${imgId})"></button>
    <button class= "ctrl-btn btn-change-line" onclick="onChangeLine(${imgId})"><img src="icons/up-and-down-opposite-double-arrows-side-by-side.png"></button>
    `
    document.querySelector('.top-btns').innerHTML = strHtml //change name/sections
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container');
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}

function drawImage(selectedImg) {
    var img = new Image()
    img.src = selectedImg.url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    }
}

function onChangeFontSize(diff, imgId) {
    changeFontSize(diff, imgId)
    var img = getImgById(imgId)
    drawImage(img)
    setTimeout(drawText, .3)
}

function onChangeLine(imgId) {
    changeLine(imgId)
    var img = getImgById(imgId)
    drawImage(img)
    setTimeout(drawText, .3)
}

function onMoveLine(diff, imgId) {
    var newPosY = moveLine(diff, imgId)
    var img = getImgById(imgId)
    drawImage(img)
    setTimeout(drawText, .3, 0, newPosY)
}
// you are here
function onAlign(direction) {
    alignText(direction)
    drawText()
}

function onAddLine() {
    addLine()
    drawText()
}

function onRemoveLine() {
    removeLine()
}

function drawText(text, x, y) {
    var lines = gMeme.lines
    lines.forEach(function (line) {
        text = `${line.txt}` //weird
        x = line.posX
        y = line.posY
        gCtx.lineWidth = 2
        gCtx.strokeStyle = `${line.stroke}`
        gCtx.fillStyle = `${line.fill}`
        gCtx.font = `${line.size}px  Impact` // todo: handle font change
        gCtx.textAlign = line.align
        gCtx.fillText(text, x, y)
        gCtx.strokeText(text, x, y)
    })
}

// cant backspace??? 
function onEnterText(txt) {
    let currLine = gMeme.selectedLineIdx
    gMeme.lines[currLine].txt = txt
    drawText(txt, 0, 80) // to do- change pos from model pos
}



