const uri = 'https://script.google.com/macros/s/AKfycbxyacpN8y4nxSAnU0Eji6E_rBRDFTY7YoWWFa0clY5ELRhskgpt/exec';
const id = '1BpGnuwC4lZf9G2yFyiSrxbJuGO8gviV8mr-I2D3x4vA';
const sheet = 'Studio';
const endpoint = `${uri}?id=${id}&sheet=${sheet}`;

let img = [];
let count = -1;

/*-----------------------------API------------------------------------------------*/

const renderJson = (json) => {
    const studios = json.records;

    studios.forEach(studio => {
        //メインイメージ
        img.push(studio['photo1']);
        //スタジオ紹介
        const studioDiv = document.createElement('div');
        const studioTitle = document.createElement("span");
        studioTitle.className = 'studio-title';
        studioTitle.textContent = studio['name-ja'];
        const studioTitleEn = document.createElement("span");
        studioTitleEn.className = 'studio-title-en';
        studioTitleEn.textContent = studio['name-en'];
        const studioImg = document.createElement("span");
        studioTitleImg.className = 'studio-image';
        studioTitleImg.textContent = studio['photo1'];

        const studioPhotoDiv = document.createElement('div');
        studioPhotoDiv.className = 'studios-photo'
        const studioPhoto = document.createElement("img");
        studioPhoto.className = 'studio-photo';
        studioPhoto.src = studio['photo1'];
        studioPhoto.alt = `${studio['name-ja']}の写真`;
        //スタジオの情報

        studioDiv.appendChild(studioTitle);
        studioDiv.appendChild(studioTitleEn);
        studioDiv.appendChild(studioImg);
        document.getElementById('studios').appendChild(studioDiv);
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

//参考文献 http://www.shurey.com/js/samples/3_img8.html
function imgTimer() {
    //画像番号
    count++;
    //画像の枚数確認
    if (count == img.length) count = 0;
    //画像出力
    document.getElementById("mask_img").style.backgroundImage = "url(" + img[count] + ")";
    //次のタイマー呼びだし
    setTimeout("imgTimer()", 2000);
}

getData();
console.log(img);
imgTimer();