const uri = 'https://script.google.com/macros/s/AKfycbxyacpN8y4nxSAnU0Eji6E_rBRDFTY7YoWWFa0clY5ELRhskgpt/exec';
const id = '1BpGnuwC4lZf9G2yFyiSrxbJuGO8gviV8mr-I2D3x4vA';
const sheet = 'Studio';
const endpoint = `${uri}?id=${id}&sheet=${sheet}`;

let img = [];
let count = -1;

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


/*-----------------------------API------------------------------------------------*/

const renderJson = (json) => {
    const studios = json.records;

    //最後の空情報の削除
    studios.pop();

    studios.forEach(studio => {
        img.push(studio['photo1']);
        img.push(studio['photo2']);

        const studioPreview = document.createElement('div');
        studioPreview.className = 'prevImg-wrapper';
        const studioPreImg = document.createElement("img");
        studioPreImg.id = 'studios-circleImg';
        studioPreImg.src = studio['photo1'];
        studioPreImg.alt = studio['name-ja'];
        const studioTitle = document.createElement("span");
        studioTitle.className = 'studios-name';
        studioTitle.textContent = studio['name-ja'];
        studioPreview.appendChild(studioPreImg);
        studioPreview.appendChild(studioTitle);
        document.getElementById('studios').appendChild(studioPreview);
        document.getElementById("studios-circleImg").style.backgroundImage = "url(studio['name-ja'])";
    });

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