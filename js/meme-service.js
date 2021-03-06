'use strict'
var gNextId = 1;
const KEY = 'memes'
var gSavedMemes=[];


var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gImgs = [
    { id: gNextId++, url: 'images/1.jpg', keywords: ['trump'] },
    { id: gNextId++, url: 'images/2.jpg', keywords: ['dog'] },
    { id: gNextId++, url: 'images/3.jpg', keywords: ['cat'] },
    { id: gNextId++, url: 'images/4.jpg', keywords: ['baby'] },
    { id: gNextId++, url: 'images/5.jpg', keywords: ['history'] },
    { id: gNextId++, url: 'images/6.jpg', keywords: ['baby'] },
    { id: gNextId++, url: 'images/7.jpg', keywords: ['charlie'] },

];

var gMeme = {
    gSelectedImgId: 1,
    selectedLineIdx: 0,
    selectedFont: 'Impact',
    lines: [
        {
            txt: 'I never eat Falafel',
            size: 40,
            align: 'center',
            fill: 'white',
            stroke: 'black',
            prevStroke: 'black',
            posX: 150,
            posY: 60,
        },
        {
            txt: 'With amba',
            size: 30,
            align: 'right', //right from the middle line
            fill: 'white',
            stroke: 'black',
            prevStroke: 'black',
            posX: 150,
            posY: 250,
        }
    ]
}

function changeLineFocus() {
    var prevLineIdx = gMeme.selectedLineIdx;
    var newSelectedLineIdx = prevLineIdx + 1;
    if (newSelectedLineIdx >= gMeme.lines.length) newSelectedLineIdx = 0;
    if (gMeme.lines[prevLineIdx]) {
        gMeme.lines[prevLineIdx].stroke = gMeme.lines[gMeme.selectedLineIdx].prevStroke  
    }
    gMeme.lines[newSelectedLineIdx].stroke = 'red'
    gMeme.selectedLineIdx = newSelectedLineIdx;
}

function removeFocus(){
    gMeme.lines[gMeme.selectedLineIdx].stroke = gMeme.lines[gMeme.selectedLineIdx].prevStroke  
}

function alignText(direction) {
    gMeme.lines[gMeme.selectedLineIdx].align = direction
}

function addLine() {
    var line = _createLine()
    gMeme.lines.push(line)
}

function removeLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}

function _createLine() {
    return {
        txt: 'new',
        size: 30,
        align: 'right',
        fill: 'white',
        stroke: 'black',
        prevStroke: 'black',
        posX: 150,
        posY: 140,
        isFocused: false
    }
}

function changeFontSize(diff) {
    gMeme.lines[gMeme.selectedLineIdx].size += diff
}

function changeFont(font) {
    gMeme.selectedFont = font
}

function changeStroke(color) {
    gMeme.lines[gMeme.selectedLineIdx].prevStroke = color
}

function changeFill(color) {
    gMeme.lines[gMeme.selectedLineIdx].fill = color
}

function moveLine(diff) {
    gMeme.lines[gMeme.selectedLineIdx].posY += diff
    return gMeme.lines[gMeme.selectedLineIdx].posY
}

function getImgById(ImgId) {
    var img = gImgs.find((img) => {
        return ImgId === img.id
    })
    return img
}

// you are here -  add also an indication to user that meme was saved
function saveMeme(){
    var meme = {url:gCanvas.toDataURL(),gMeme}
    gSavedMemes.push(meme)
    saveToStorage(KEY,gSavedMemes)
    return gSavedMemes
}

function getMemes(){
    var memes= loadFromStorage(KEY)
    return memes
}


function addImg(url) {
    const newImg = {
        id: gImgs.length + 1,
        url
    }
    gMeme.gSelectedImgId = gImgs.length + 1;
    gImgs.push(newImg);  
}

// function removeMemeFromStorage(id) {
//     var memes = loadFromStorage(KEY);
//     var idxToRemove = memes.findIndex(meme => meme.id === id);
//     console.log('idxToRemove =', idxToRemove)
//     memes.splice(idxToRemove, 1);
//     saveToStorage(KEY, memes);
//     renderSavedMemes();
// }

// if (gKeyewords[txt] <= 30)   gKeyewords[txt]++
//for filter
