//canvasを使ったパーティクル

let mode = 0;

let items = [
    [100, 600, 100, 800,
        200, 650, 50, 150,
        200, 650, 50, 150,
        100, 400, 50, 100,
        100, 400, 50, 100
    ],
    [100, 600, 100, 800,
        200, 650, 50, 150,
        200, 650, 50, 150,
        550, 650, 100, 300,
        550, 650, 100, 300
    ],
    [100, 600, 100, 800,
        50, 600, 450, 800,
        150, 450, 450, 650,
        100, 250, 440, 650,
        100, 250, 440, 650
    ],
    [100, 600, 100, 800,
        50, 600, 450, 800,
        150, 450, 450, 650,
        420, 600, 500, 550,
        420, 600, 500, 550
    ],
    [100, 600, 100, 800,
        50, 600, 450, 800,
        600, 650, 750, 850,
        600, 650, 750, 850,
        600, 650, 750, 850
    ],
    [840, 1340, 100, 800,
        780, 1340, 100, 400,
        780, 850, 50, 200,
        780, 850, 50, 200,
        780, 820, 100, 200
    ],
    [840, 1340, 100, 800,
        780, 1340, 100, 400,
        1000, 1340, 100, 400,
        1000, 1340, 100, 400,
        880, 980, 380, 480
    ],
    [840, 1340, 100, 800,
        780, 1340, 100, 400,
        1000, 1340, 100, 400,
        1000, 1340, 100, 400,
        1100, 1340, 100, 400
    ],
    [840, 1340, 100, 800,
        780, 1200, 720, 850,
        780, 1200, 720, 850,
        780, 1200, 720, 850,
        780, 1150, 720, 850
    ]
];

const idTarget = document.getElementById('title-wrap')
const classList = idTarget.classList;

window.addEventListener("scroll", function (e) {

    let scrollAmount = document.documentElement.scrollTop;

    console.log(scrollAmount);

    if (scrollAmount > 20) {
        classList.add('fadeout');
        classList.remove('fadein');
    }
    if (scrollAmount >= 11100) {
        classList.add('fadein');
        classList.remove('fadeout');
        document.getElementById("title").style.color = "white";
        mode = 8;
    }

    if (scrollAmount < 400) {
        mode = 1;
    } else if (scrollAmount >= 400 && scrollAmount < 1100) {
        mode = 2;
    } else if (scrollAmount >= 1100 && scrollAmount < 1400) {
        mode = 3;
    } else if (scrollAmount >= 1800 && scrollAmount < 2200) {
        mode = 4;
    } else if (scrollAmount >= 2500 && scrollAmount < 3000) {
        mode = 5;
    } else if (scrollAmount >= 3000 && scrollAmount < 4600) {
        mode = 6;
    } else if (scrollAmount >= 4500 && scrollAmount < 11100) {
        mode = 7;
    }
});

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

window.onload = function () {
    let canvasWrap = document.querySelector('#canvas-wrap');
    let canvas = document.querySelector('#canvas-container');
    let ctx = canvas.getContext('2d');

    let center = {};    // Canvas中央
    let dots = [];      // パーティクル配列
    let density = 40;  //パーティクルの数
    let baseSize = 20;   // 大きさ

    let Dot = function () {
        this.speed = 3;
        this.pos = {   // 位置
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height
        };
        let rot = Math.random() * 360;  // ランダムな角度
        let angle = rot * Math.PI / 180;
        this.vec = {    // 移動方向
            x: Math.cos(angle),
            y: Math.sin(angle)
        };
        this.dir = { //方向性
            x: 1,
            y: 1
        };
        this.choose = Math.floor(Math.random() * items.length);
        this.moved2 = false;
        this.pos2 = {
            x: Math.random() * (items[this.choose][1] - items[this.choose][0] + 1) + items[this.choose][0],
            y: Math.random() * (items[this.choose][3] - items[this.choose][2] + 1) + items[this.choose][2]
        };
        this.moved3 = false;
        this.pos3 = {
            x: Math.random() * (items[this.choose][5] - items[this.choose][4] + 1) + items[this.choose][4],
            y: Math.random() * (items[this.choose][7] - items[this.choose][6] + 1) + items[this.choose][6]
        };
        this.moved4 = false;
        this.pos4 = {
            x: Math.random() * (items[this.choose][9] - items[this.choose][8] + 1) + items[this.choose][8],
            y: Math.random() * (items[this.choose][11] - items[this.choose][10] + 1) + items[this.choose][10]
        };
        this.moved5 = false;
        this.pos5 = {
            x: Math.random() * (items[this.choose][13] - items[this.choose][12] + 1) + items[this.choose][12],
            y: Math.random() * (items[this.choose][15] - items[this.choose][14] + 1) + items[this.choose][14]
        };
        this.moved6 = false;
        this.pos6 = {
            x: Math.random() * (items[this.choose][17] - items[this.choose][16] + 1) + items[this.choose][16],
            y: Math.random() * (items[this.choose][19] - items[this.choose][18] + 1) + items[this.choose][18]
        };
    };


    Dot.prototype = {
        update: function () {
            this.draw();

            //画面から出そうになったら跳ね返る
            if (this.pos.x > canvas.width) {
                if (this.dir.x > 0) {
                    this.dir.x = -1;
                } else if (this.dir.x < 0) {
                    this.dir.x = 1;
                }
            }
            if (this.pos.x < 0) {
                if (this.dir.x > 0) {
                    this.dir.x = -1;
                } else if (this.dir.x < 0) {
                    this.dir.x = 1;
                }
            }
            if (this.pos.y > canvas.height) {
                if (this.dir.y > 0) {
                    this.dir.y = -1;
                } else if (this.dir.y < 0) {
                    this.dir.y = 1;
                }
            }
            if (this.pos.y < 0) {
                if (this.dir.y > 0) {
                    this.dir.y = -1;
                } else if (this.dir.y < 0) {
                    this.dir.y = 1;
                }
            }

            //スクロール位置に応じてパーティクルの挙動を変える
            if (mode == 0 || mode == 1) {
                this.speed = 3;
                this.pos.x += this.vec.x * this.dir.x * this.speed;
                this.pos.y += this.vec.y * this.dir.y * this.speed;
                //スクロールで一旦戻ったとき用にリセット
                this.moved2 = false;
                this.moved3 = false;
                this.moved4 = false;
                this.moved5 = false;
                this.moved6 = false;
            }

            if (mode == 2) {
                // 目標位置と現在位置の距離を出す
                let distanceX = (this.pos2.x - this.pos.x) * (this.pos2.x - this.pos.x);
                let distanceY = (this.pos2.y - this.pos.y) * (this.pos2.y - this.pos.y);
                let distance = Math.sqrt(distanceX + distanceY);

                if (this.moved2 == false) {
                    //目標位置に近づくまで素早く移動
                    this.speed = 10;
                    angle = Math.atan2(this.pos2.y - this.pos.y, this.pos2.x - this.pos.x);
                    this.vec.x = Math.cos(angle);
                    this.vec.y = Math.sin(angle);

                    this.pos.x += this.vec.x * this.dir.x * this.speed;
                    this.pos.y += this.vec.y * this.dir.y * this.speed;


                    //目標位置に十分に近づいたら通常の動きに戻る
                    if (distance < 10) {
                        this.moved2 = true;
                        this.speed = 1;
                        rot = Math.random() * 360;
                        angle = rot * Math.PI / 180;
                        this.vec.x = Math.cos(angle);
                        this.vec.y = Math.sin(angle);
                    }
                } else {
                    this.pos.x += this.vec.x * this.dir.x * this.speed;
                    this.pos.y += this.vec.y * this.dir.y * this.speed;

                    //領域に合わせて移動範囲を制限
                    if (this.pos.x > items[this.choose][1]) {
                        if (this.dir.x > 0) {
                            this.dir.x = -1;
                        } else if (this.dir.x < 0) {
                            this.dir.x = 1;
                        }
                    }
                    if (this.pos.x < items[this.choose][0]) {
                        if (this.dir.x > 0) {
                            this.dir.x = -1;
                        } else if (this.dir.x < 0) {
                            this.dir.x = 1;
                        }
                    }
                    if (this.pos.y > items[this.choose][3]) {
                        if (this.dir.y > 0) {
                            this.dir.y = -1;
                        } else if (this.dir.y < 0) {
                            this.dir.y = 1;
                        }
                    }
                    if (this.pos.y < items[this.choose][2]) {
                        if (this.dir.y > 0) {
                            this.dir.y = -1;
                        } else if (this.dir.y < 0) {
                            this.dir.y = 1;
                        }
                    }

                }
            }

            if (mode == 3) {
                // 目標位置と現在位置の距離を出す
                let distanceX = (this.pos3.x - this.pos.x) * (this.pos3.x - this.pos.x);
                let distanceY = (this.pos3.y - this.pos.y) * (this.pos3.y - this.pos.y);
                let distance = Math.sqrt(distanceX + distanceY);

                if (this.moved3 == false) {
                    //目標位置に近づくまで素早く移動
                    this.speed = 10;
                    angle = Math.atan2(this.pos3.y - this.pos.y, this.pos3.x - this.pos.x);
                    this.vec.x = Math.cos(angle);
                    this.vec.y = Math.sin(angle);

                    this.pos.x += this.vec.x * this.dir.x * this.speed;
                    this.pos.y += this.vec.y * this.dir.y * this.speed;

                    //目標位置に十分に近づいたら通常の動きに戻る
                    if (distance < 10) {
                        this.moved3 = true;
                        this.speed = 0.5;
                        rot = Math.random() * 360;
                        angle = rot * Math.PI / 180;
                        this.vec.x = Math.cos(angle);
                        this.vec.y = Math.sin(angle);
                    }
                } else {
                    this.pos.x += this.vec.x * this.dir.x * this.speed;
                    this.pos.y += this.vec.y * this.dir.y * this.speed;

                    //領域に合わせて移動範囲を制限
                    if (this.pos.x > items[this.choose][5]) {
                        if (this.dir.x > 0) {
                            this.dir.x = -1;
                        } else if (this.dir.x < 0) {
                            this.dir.x = 1;
                        }
                    }
                    if (this.pos.x < items[this.choose][4]) {
                        if (this.dir.x > 0) {
                            this.dir.x = -1;
                        } else if (this.dir.x < 0) {
                            this.dir.x = 1;
                        }
                    }
                    if (this.pos.y > items[this.choose][7]) {
                        if (this.dir.y > 0) {
                            this.dir.y = -1;
                        } else if (this.dir.y < 0) {
                            this.dir.y = 1;
                        }
                    }
                    if (this.pos.y < items[this.choose][6]) {
                        if (this.dir.y > 0) {
                            this.dir.y = -1;
                        } else if (this.dir.y < 0) {
                            this.dir.y = 1;
                        }
                    }

                }
            }

            if (mode == 4) {
                // 目標位置と現在位置の距離を出す
                let distanceX = (this.pos4.x - this.pos.x) * (this.pos4.x - this.pos.x);
                let distanceY = (this.pos4.y - this.pos.y) * (this.pos4.y - this.pos.y);
                let distance = Math.sqrt(distanceX + distanceY);

                if (this.moved4 == false) {
                    //目標位置に近づくまで素早く移動
                    this.speed = 10;
                    angle = Math.atan2(this.pos4.y - this.pos.y, this.pos4.x - this.pos.x);
                    this.vec.x = Math.cos(angle);
                    this.vec.y = Math.sin(angle);

                    this.pos.x += this.vec.x * this.dir.x * this.speed;
                    this.pos.y += this.vec.y * this.dir.y * this.speed;

                    //目標位置に十分に近づいたら通常の動きに戻る
                    if (distance < 10) {
                        this.moved4 = true;
                        this.speed = 0.5;
                        rot = Math.random() * 360;
                        angle = rot * Math.PI / 180;
                        this.vec.x = Math.cos(angle);
                        this.vec.y = Math.sin(angle);
                    }
                } else {
                    this.pos.x += this.vec.x * this.dir.x * this.speed;
                    this.pos.y += this.vec.y * this.dir.y * this.speed;

                    //領域に合わせて移動範囲を制限
                    if (this.pos.x > items[this.choose][9]) {
                        if (this.dir.x > 0) {
                            this.dir.x = -1;
                        } else if (this.dir.x < 0) {
                            this.dir.x = 1;
                        }
                    }
                    if (this.pos.x < items[this.choose][8]) {
                        if (this.dir.x > 0) {
                            this.dir.x = -1;
                        } else if (this.dir.x < 0) {
                            this.dir.x = 1;
                        }
                    }
                    if (this.pos.y > items[this.choose][11]) {
                        if (this.dir.y > 0) {
                            this.dir.y = -1;
                        } else if (this.dir.y < 0) {
                            this.dir.y = 1;
                        }
                    }
                    if (this.pos.y < items[this.choose][10]) {
                        if (this.dir.y > 0) {
                            this.dir.y = -1;
                        } else if (this.dir.y < 0) {
                            this.dir.y = 1;
                        }
                    }

                }
            }

            if (mode == 5) {
                // 目標位置と現在位置の距離を出す
                let distanceX = (this.pos5.x - this.pos.x) * (this.pos5.x - this.pos.x);
                let distanceY = (this.pos5.y - this.pos.y) * (this.pos5.y - this.pos.y);
                let distance = Math.sqrt(distanceX + distanceY);

                if (this.moved5 == false) {
                    //目標位置に近づくまで素早く移動
                    this.speed = 10;
                    angle = Math.atan2(this.pos5.y - this.pos.y, this.pos5.x - this.pos.x);
                    this.vec.x = Math.cos(angle);
                    this.vec.y = Math.sin(angle);

                    this.pos.x += this.vec.x * this.dir.x * this.speed;
                    this.pos.y += this.vec.y * this.dir.y * this.speed;

                    //目標位置に十分に近づいたら通常の動きに戻る
                    if (distance < 10) {
                        this.moved5 = true;
                        this.speed = 0.3;
                        rot = Math.random() * 360;
                        angle = rot * Math.PI / 180;
                        this.vec.x = Math.cos(angle);
                        this.vec.y = Math.sin(angle);
                    }
                }
                else {
                    this.pos.x += this.vec.x * this.dir.x * this.speed;
                    this.pos.y += this.vec.y * this.dir.y * this.speed;

                    //領域に合わせて移動範囲を制限
                    if (this.pos.x > items[this.choose][13]) {
                        if (this.dir.x > 0) {
                            this.dir.x = -1;
                        } else if (this.dir.x < 0) {
                            this.dir.x = 1;
                        }
                    }
                    if (this.pos.x < items[this.choose][12]) {
                        if (this.dir.x > 0) {
                            this.dir.x = -1;
                        } else if (this.dir.x < 0) {
                            this.dir.x = 1;
                        }
                    }
                    if (this.pos.y > items[this.choose][15]) {
                        if (this.dir.y > 0) {
                            this.dir.y = -1;
                        } else if (this.dir.y < 0) {
                            this.dir.y = 1;
                        }
                    }
                    if (this.pos.y < items[this.choose][14]) {
                        if (this.dir.y > 0) {
                            this.dir.y = -1;
                        } else if (this.dir.y < 0) {
                            this.dir.y = 1;
                        }
                    }

                }
            }

            if (mode == 6) {
                // 目標位置と現在位置の距離を出す
                let distanceX = (this.pos6.x - this.pos.x) * (this.pos6.x - this.pos.x);
                let distanceY = (this.pos6.y - this.pos.y) * (this.pos6.y - this.pos.y);
                let distance = Math.sqrt(distanceX + distanceY);

                if (this.moved6 == false) {
                    //目標位置に近づくまで素早く移動
                    this.speed = 10;
                    angle = Math.atan2(this.pos6.y - this.pos.y, this.pos6.x - this.pos.x);
                    this.vec.x = Math.cos(angle);
                    this.vec.y = Math.sin(angle);

                    this.pos.x += this.vec.x * this.dir.x * this.speed;
                    this.pos.y += this.vec.y * this.dir.y * this.speed;

                    //目標位置に十分に近づいたら通常の動きに戻る
                    if (distance < 10) {
                        this.moved6 = true;
                        this.speed = 0.3;
                        rot = Math.random() * 360;
                        angle = rot * Math.PI / 180;
                        this.vec.x = Math.cos(angle);
                        this.vec.y = Math.sin(angle);
                    }
                }
                else {
                    this.pos.x += this.vec.x * this.dir.x * this.speed;
                    this.pos.y += this.vec.y * this.dir.y * this.speed;

                    //領域に合わせて移動範囲を制限
                    if (this.pos.x > items[this.choose][17]) {
                        if (this.dir.x > 0) {
                            this.dir.x = -1;
                        } else if (this.dir.x < 0) {
                            this.dir.x = 1;
                        }
                    }
                    if (this.pos.x < items[this.choose][16]) {
                        if (this.dir.x > 0) {
                            this.dir.x = -1;
                        } else if (this.dir.x < 0) {
                            this.dir.x = 1;
                        }
                    }
                    if (this.pos.y > items[this.choose][19]) {
                        if (this.dir.y > 0) {
                            this.dir.y = -1;
                        } else if (this.dir.y < 0) {
                            this.dir.y = 1;
                        }
                    }
                    if (this.pos.y < items[this.choose][18]) {
                        if (this.dir.y > 0) {
                            this.dir.y = -1;
                        } else if (this.dir.y < 0) {
                            this.dir.y = 1;
                        }
                    }

                }
            }
            if (mode == 7) {
                this.speed = 0;
            }
            if (mode == 8) {
                //徐々に加速
                this.speed = this.speed + 0.005;
                if (this.speed >= 3) {
                    this.speed = 3;
                }

                this.pos.x += this.vec.x * this.dir.x * this.speed;
                this.pos.y += this.vec.y * this.dir.y * this.speed;
            }

        },

        draw: function () {
            ctx.fillStyle = "#ffffff";
            ctx.strokeStyle = "#7f7f7f";
            ctx.beginPath();
            ctx.arc(this.pos.x, this.pos.y, baseSize, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.stroke();
        }
    };

    function update() {
        requestAnimFrame(update);
        // 描画をクリアー
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        for (let i = 0; i < density; i++) {
            dots[i].update();
        }
    }

    function init() {
        // canvasにコンテンツサイズをセット
        canvas.setAttribute("width", canvasWrap.offsetWidth);
        canvas.setAttribute("height", canvasWrap.offsetHeight);

        // canvas中央をセット
        center.x = canvas.width / 2;
        center.y = canvas.height / 2;

        // densityの数だけパーティクルを生成
        for (let i = 0; i < density; i++) {
            dots.push(new Dot());
        }

        update();
    }
    init();
}