'use strict'
var gCanvas;
var gCtx;

// TODO- USE DECONSTRUCTION
function onInit() {
    gCanvas = document.querySelector('#canvas')
    gCtx = gCanvas.getContext('2d')
    renderImgs()
    onCloseModal()
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
//TODO :wherever there is style- use classlist
function onShowGallery() {
    document.querySelector('.meme-editor').style.display = 'none'
    document.querySelector('.imgs-container').style.opacity = 1
}

function onOpenEditor(imgId) {
    document.querySelector('.meme-editor').style.display = 'flex'
    document.querySelector('.imgs-container').style.opacity = 0
    gMeme.gSelectedImgId = imgId //TODO: move to service
    var img = getImgById(imgId)
    drawImage(img)
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container');
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}

function drawImage(selectedImg) {
    var img = new Image()
    img.src = selectedImg.url
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
}

//repeating... TODO- write render canvas?
function onChangeFontSize(diff) {
    changeFontSize(diff)
    var img = getImgById(gMeme.gSelectedImgId)
    drawImage(img)
    drawText()
}

function onChangeFont(font) {
    changeFont(font)
    var img = getImgById(gMeme.gSelectedImgId)
    drawImage(img)
    drawText()
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
    drawText()
}

function onMoveLine(diff) {
    var newPosY = moveLine(diff)
    var img = getImgById(gMeme.gSelectedImgId)
    drawImage(img)
    drawText()
}

function onAlign(direction) {
    alignText(direction)
    var img = getImgById(gMeme.gSelectedImgId)
    drawImage(img)
    drawText()
}

function onAddLine() {
    addLine()
    drawText()
}

function onRemoveLine() {
    removeLine()
    var img = getImgById(gMeme.gSelectedImgId)
    drawImage(img)
    drawText()
}

function onRemoveFocus() {
    removeFocus()
    drawText()
}

function drawText(text, x, y) {
    var lines = gMeme.lines
    lines.forEach(line => {
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
    drawText(txt)
}

function onSetSavedMeme(meme){
    setSavedMeme(meme)
    drawImage(meme.gSelectedImgId)
    // drawText
}

function onDownloadMeme(elLink) {
    const data = gCanvas.toDataURL()
    elLink.href = data
}

function onSaveMeme() {
    saveMeme()
}

function onCloseModal() {
    document.querySelector('.modal').classList.add('hide')
}

function onOpenModal() {

    gMemes = getSavedMemes()
    document.querySelector('.modal').classList.remove('hide')
}

// function renderImgs() {
//     var imgs = gImgs
//     var strHtmls = imgs.map((img) => {
//         return `
//         <img class="grid img-main" src=${img.url} onclick="onOpenEditor(${img.id})">
//         `
//     })
//     document.querySelector('.imgs-container').innerHTML = strHtmls.join('')
// }

