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
    <button class= "ctrl-btn" onclick="onChangeLineFocus(${imgId})"><img src="icons/up-and-down-opposite-double-arrows-side-by-side.png"></button>
    <button class= "ctrl-btn" onclick="onRemoveFocus()">remove focus</button>
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
// you are here
function onChangeFont(font) {
    changeFont(font)
    var img = getImgById(gMeme.gSelectedImgId)
    drawImage(img)
    setTimeout(drawText, .3)
}

function onChangeStrokeColor(color) {
    changeStroke(color)
}

function onChangeFillColor(color) {
    changeFill(color)
}

function onChangeLineFocus(imgId) {
    changeLineFocus(imgId)
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

function onAlign(direction) {
    alignText(direction)
    var img = getImgById(gMeme.gSelectedImgId)
    drawImage(img)
    setTimeout(drawText, .3)
}

function onAddLine() {
    addLine()
    setTimeout(drawText, .3)
}

function onRemoveLine() {
    removeLine()
    setTimeout(drawText, .3)
}

function onRemoveFocus() {
    removeFocus()
    setTimeout(drawText, .3)
}

function drawText(text, x, y) {
    var lines = gMeme.lines
    lines.forEach(function (line) {
        text = `${line.txt}`
        x = line.posX
        y = line.posY
        gCtx.lineWidth = 2
        gCtx.strokeStyle = `${line.stroke}`
        gCtx.fillStyle = `${line.fill}`
        gCtx.font = `${line.size}px  ${gMeme.selectedFont}`
        gCtx.textAlign = line.align
        gCtx.fillText(text, x, y)
        gCtx.strokeText(text, x, y)
    })
}

function onEnterText(txt) {
    let currLine = gMeme.selectedLineIdx
    gMeme.lines[currLine].txt = txt
    var img = getImgById(gMeme.gSelectedImgId)
    drawImage(img)
    setTimeout(drawText, .3, txt)
}

function onDownloadMeme(elLink) {
    console.log('downloading...')
    const data = gCanvas.toDataURL()
    elLink.href = data
}



