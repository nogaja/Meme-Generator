'use strict'
// to do- storage service to saved memes?
// var gMemes; 


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
    selectedImgId: 1,
    selectedLineIdx: 0, //todo: implement this variable in the controller....
    lines: [
        {
            txt: 'I never eat Falafel',
            size: 40,
            align: 'left',
            fill: 'white',
            stroke: 'black',
            posX: 0,
            posY: 60,
            isFocused: false
        },
        {
            txt: 'With amba',
            size: 30,
            align: 'left',
            fill: 'white',
            stroke: 'black',
            posX: 0,
            posY: 250, //see if this size works
            isFocused: false
        }
    ]
}

//will need to change for more than 2 lines
function changeLine(imgId) {
    if (gMeme.selectedLineIdx === 0) {
        gMeme.selectedLineIdx = 1
        gMeme.lines[gMeme.selectedLineIdx].isFocused = true
        gMeme.lines[0].isFocused = false
        gMeme.lines[0].stroke = 'black'
        gMeme.lines[gMeme.selectedLineIdx].stroke = 'red'
    } else if (gMeme.selectedLineIdx === 1) {
        gMeme.selectedLineIdx = 0
        gMeme.lines[gMeme.selectedLineIdx].isFocused = true
        gMeme.lines[gMeme.selectedLineIdx].stroke = 'red'
        gMeme.lines[1].isFocused = false
        gMeme.lines[1].stroke = 'black'
    }

    // try to access through y..
    // let currLine = gMeme.selectedLineIdx
    // console.log(currLine)
    // if ( gMeme.lines[currLine].posY ===80){
    //     gMeme.selectedLineIdx++
    //     gMeme.lines[gMeme.selectedLineIdx].isFocused = true
    //     gMeme.lines[0].isFocused = false
    //     gMeme.lines[0].stroke = 'black'
    //     gMeme.lines[gMeme.selectedLineIdx].stroke = 'red'
    // } else if ( gMeme.lines[currLine].posY ===140){
    //     gMeme.selectedLineIdx++
    // }
}

function addLine() {
    console.log('adding line')
    var line = _createLine()
    //should be in the middle?
    gMeme.lines.push(line)
}

function _createLine() {
    return {
        txt: 'new',
        size: 30,
        align: 'left',
        fill: 'white',
        stroke: 'black',
        posX: 0,
        posY: 140, 
        isFocused: false

    }
}

function changeFontSize(diff, imgId) {
    gMeme.lines[gMeme.selectedLineIdx].size += diff
}

//will I use imgId?
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
