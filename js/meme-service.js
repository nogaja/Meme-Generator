'use strict'
// to do- storage service to saved memes?
var gMemes;

var gNextId = 1;

//bonus number- how many times searched, font-size grows accord.
var gKeywords = { 'happy': 12, 'funny puk': 1 } 
var gImgs = [
    { id: gNextId, url: 'images/1.jpg', keywords: ['trump'] },
    // { id: gNextId++, url: 'images/2.jpg', keywords: ['happy'] }

];

// will need to add function create line/ create lines use gNextId
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I never eat Falafel',
            size: 40,
            align: 'left',
            fill: 'white',
            stroke: 'black'
        }
    ]
}

// function createLines(){


// }

function  getImages(){
    return gImgs
}


// function getImgById(ImgId){

// }
