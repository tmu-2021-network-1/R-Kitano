const uri = 'https://script.google.com/macros/s/AKfycbxyacpN8y4nxSAnU0Eji6E_rBRDFTY7YoWWFa0clY5ELRhskgpt/exec';
const id = '1BpGnuwC4lZf9G2yFyiSrxbJuGO8gviV8mr-I2D3x4vA';
const sheet = 'Studio';
const endpoint = `${uri}?id=${id}&sheet=${sheet}`;

let img = [];
let count = -1; //*2


function imgTimer() {
    //画像番号
    count++; //*3
    //画像の枚数確認
    if (count == img.length) count = 0; //*4
    //画像出力
    document.getElementById("mask_img").style.backgroundImage = "url(" + img[count] + ")";
    //次のタイマー呼びだし
    setTimeout("imgTimer()", 2000); //*6
}


/*-----------------------------API------------------------------------------------*/

const renderJson = (json) => {
    const studios = json.records;

    studios.forEach(studio => {
        img.push(studio['photo1']);
        img.push(studio['photo2']);

        //const studioPreview = document.createElement('div');

        //console.log(studio['photo1']);
        const studioDiv = document.createElement('div');
        const studioTitle = document.createElement("span");
        studioTitle.className = 'studio-title';
        studioTitle.textContent = studio['name-ja'];
        const studioTitleEn = document.createElement("span");
        studioTitleEn.className = 'studio-title-en';
        studioTitleEn.textContent = studio['name-en'];
        const studioPreImg = document.createElement("img");
        studioPreImg.className = 'studio-circle';
        studioPreImg.id = 'studio-circleImg';
        studioPreImg.src = studio['photo1']; // 画像パス
        studioPreImg.alt = studio['name-ja']; // 代替テキスト
        studioDiv.appendChild(studioPreImg);
        studioDiv.appendChild(studioTitle);
        studioDiv.appendChild(studioTitleEn);
        document.getElementById('studios').appendChild(studioDiv);
        document.getElementById("studio-circleImg").style.backgroundImage = "url(studio['name-ja'])";
    });
    document.getElementById('result').textContent = JSON.stringify(json, null, 2);
}

const getData = async () => {
    try {
        const response = await fetch(endpoint);
        if (response.ok) {
            const jsonResponse = await response.json();
            renderJson(jsonResponse);
        }
    }
    catch (error) {
        console.log(error);
    }
}

getData();
console.log(img);
imgTimer();