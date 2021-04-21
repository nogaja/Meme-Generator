'use strict'
var gCanvas;
var gCtx;


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

function onShowGallery(){
    document.querySelector('.meme-editor').style.display = 'none'
    document.querySelector('.imgs-container').style.opacity = 1
}

function onOpenEditor(imgId) {
    document.querySelector('.meme-editor').style.display = 'flex'
    document.querySelector('.imgs-container').style.opacity = 0
    gMeme.gSelectedImgId= imgId
    var img = getImgById(imgId)
    renderBtns(imgId)
    drawImage(img)
}
// no need to render
function renderBtns(imgId) {
    var strHtml =
        `
    <button class= "ctrl-btn" onclick="onChangeFontSize(1)"><img src="icons/increase font - icon.png"></button>
    <button class= "ctrl-btn" onclick="onChangeFontSize(-1)"><img src="icons/decrease font - icon.png"></button>
    <button class= "ctrl-btn btn-up" onclick="onMoveLine(-1)"></button>
    <button class= "ctrl-btn btn-down" onclick="onMoveLine(1)"></button>
    <button class= "ctrl-btn" onclick="onChangeLineFocus()"><img src="icons/up-and-down-opposite-double-arrows-side-by-side.png"></button>
    <button class= "ctrl-btn" onclick="onRemoveFocus()">clear</button>
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

function onChangeFontSize(diff) {
    changeFontSize(diff)
    var img = getImgById(gMeme.gSelectedImgId)
    drawImage(img)
    setTimeout(drawText, .3)
}

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

function onChangeLineFocus() {
    changeLineFocus()
    var img = getImgById(gMeme.gSelectedImgId)
    drawImage(img)
    setTimeout(drawText, .3)
}

function onMoveLine(diff) {
    var newPosY = moveLine(diff)
    var img = getImgById(gMeme.gSelectedImgId)
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
    const data = gCanvas.toDataURL()
    elLink.href = data
}



