'use strict'
// to do- storage service to saved memes

var gNextId = 1;

//bonus number- how many times searched, font-size grows accord.
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

// will need to add function create line/ create lines 
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
            isFocused: false,
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
            isFocused: false
        }
    ]
}

//will need to change for more than 2 lines
function changeLineFocus(imgId) {
    var prevLineIdx = gMeme.selectedLineIdx;
    var newSelectedLineIdx = prevLineIdx + 1;
    if (newSelectedLineIdx >= gMeme.lines.length) newSelectedLineIdx = 0;
    if (gMeme.lines[prevLineIdx]) {
        gMeme.lines[prevLineIdx].isFocused = false
        gMeme.lines[prevLineIdx].stroke = gMeme.lines[gMeme.selectedLineIdx].prevStroke // change to the line written  
    }
    gMeme.lines[newSelectedLineIdx].isFocused = true
    gMeme.lines[newSelectedLineIdx].stroke = 'red'
    gMeme.selectedLineIdx = newSelectedLineIdx;
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

function changeFontSize(diff, imgId) {
    gMeme.lines[gMeme.selectedLineIdx].size += diff
}

function changeFont(font) {
    gMeme.selectedFont = font
}

function changeStroke(color) {
    gMeme.lines[gMeme.selectedLineIdx].prevStroke = color
}

//will I use imgId? no... FIX!
function getText(imgId, lineIdx) {
    if (!lineIdx) lineIdx = 0;
    return gMeme.lines[lineIdx].txt
}

function moveLine(diff, imgId) {
    gMeme.lines[gMeme.selectedLineIdx].posY += diff
    return gMeme.lines[gMeme.selectedLineIdx].posY
}

function getImgById(ImgId) {
    var img = gImgs.find((img) => {
        return ImgId === img.id
    })
    return img
}
