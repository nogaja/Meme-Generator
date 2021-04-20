'use strict'
var gCanvas;
var gCtx;
var gCurrLine = gMeme.selectedLineIdx
console.log(gCurrLine) // does not update
//TODO : 
// 1. remove imgID where not needed
// 2. forEach 
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

//consider different lines draw text!
function onChangeFontSize(diff, imgId) {
    changeFontSize(diff, imgId)
    var text = getText(imgId) // same as other lines..
    var img = getImgById(imgId)
    drawImage(img)
    var y = gMeme.lines[gMeme.selectedLineIdx].posY 
    console.log(y)
    setTimeout(drawText, .3, text, 0, y)
}
/// you are here
//will need to use- gMeme.selectedLineIdx
function onChangeLine(imgId) {
    changeLine(imgId)
    //render ? focus?
    var text = getText(imgId)
    var img = getImgById(imgId)
    drawImage(img)
    setTimeout(drawText, .3, text, 0, 80)
}

function onMoveLine(diff, imgId) {
    var newPosY = moveLine(diff, imgId)
    var text = getText(imgId)
    var img = getImgById(imgId)
    drawImage(img)
    setTimeout(drawText, .3, text, 0, newPosY)
}


function drawText(text, x, y) {
    var line = gMeme.lines[0] // wil need to change
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

    // hard coded: change to forEach
    line = gMeme.lines[1]
    text = `${line.txt}`
    x = line.posX
    y = line.posY
    gCtx.lineWidth = 2
    gCtx.strokeStyle = `${line.stroke}`
    gCtx.fillStyle = `${line.fill}`
    gCtx.font = `${line.size}px  Impact`
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

// cant backspace??? 
function onEnterText(txt) {
    let currLine = gMeme.selectedLineIdx
    gMeme.lines[currLine].txt = txt
    drawText(txt, 0, 80) // to do- change pos from model pos
}



