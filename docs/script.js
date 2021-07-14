//境界線svgのスクロール

let path = [];
path[0] = document.querySelector('#path1');
path[1] = document.querySelector('#path2');
path[2] = document.querySelector('#path3');
path[3] = document.querySelector('#path4');
path[4] = document.querySelector('#path5');
path[5] = document.querySelector('#path6');
path[6] = document.querySelector('#path7');
path[7] = document.querySelector('#path8');
path[8] = document.querySelector('#path9');
path[9] = document.querySelector('#path10');
path[10] = document.querySelector('#path11');
path[11] = document.querySelector('#path12');
path[12] = document.querySelector('#path13');
path[13] = document.querySelector('#path14');
path[14] = document.querySelector('#path15');
path[15] = document.querySelector('#path16');
path[16] = document.querySelector('#path17');
path[17] = document.querySelector('#path18');
path[18] = document.querySelector('#path19');
path[19] = document.querySelector('#path20');
path[20] = document.querySelector('#path21');
path[21] = document.querySelector('#path22');
path[22] = document.querySelector('#path23');
path[23] = document.querySelector('#path24');
path[24] = document.querySelector('#path25');
path[25] = document.querySelector('#path26');
path[26] = document.querySelector('#path27');
path[27] = document.querySelector('#path28');
path[28] = document.querySelector('#path29');
path[29] = document.querySelector('#path30');
path[30] = document.querySelector('#path31');
path[31] = document.querySelector('#path32');
path[32] = document.querySelector('#path33');
path[33] = document.querySelector('#path34');
path[34] = document.querySelector('#path35');
path[35] = document.querySelector('#path36');
path[36] = document.querySelector('#path37');
path[37] = document.querySelector('#path38');
path[38] = document.querySelector('#path39');
path[39] = document.querySelector('#path40');
path[40] = document.querySelector('#path41');
path[41] = document.querySelector('#path42');
path[42] = document.querySelector('#path43');
path[43] = document.querySelector('#path44');
path[44] = document.querySelector('#path45');
path[45] = document.querySelector('#path46');
path[46] = document.querySelector('#path47');
path[47] = document.querySelector('#path48');
path[48] = document.querySelector('#path49');
path[49] = document.querySelector('#path50');

let _scrollPercentage = [];
_scrollPercentage[0] = [0.00, 0.07];
_scrollPercentage[1] = [0.07, 0.14];
_scrollPercentage[2] = [0.14, 0.21];
_scrollPercentage[3] = [0.21, 0.28];
_scrollPercentage[4] = [0.28, 0.35];
_scrollPercentage[5] = [0.35, 0.42];
_scrollPercentage[6] = [0.42, 0.49];
_scrollPercentage[7] = [0.49, 0.56];
_scrollPercentage[8] = [0.56, 0.63];
_scrollPercentage[9] = [0.63, 0.70];
_scrollPercentage[10] = [0.70, 0.71];
_scrollPercentage[11] = [0.71, 0.72];
_scrollPercentage[12] = [0.72, 0.73];
_scrollPercentage[13] = [0.73, 0.74];
_scrollPercentage[14] = [0.74, 0.75];
_scrollPercentage[15] = [0.75, 0.76];
_scrollPercentage[16] = [0.76, 0.77];
_scrollPercentage[17] = [0.77, 0.78];
_scrollPercentage[18] = [0.78, 0.79];
_scrollPercentage[19] = [0.79, 0.80];
_scrollPercentage[20] = [0.80, 0.81];
_scrollPercentage[21] = [0.81, 0.82];
_scrollPercentage[22] = [0.82, 0.83];
_scrollPercentage[23] = [0.83, 0.84];
_scrollPercentage[24] = [0.84, 0.85];
_scrollPercentage[25] = [0.85, 0.86];
_scrollPercentage[26] = [0.86, 0.87];
_scrollPercentage[27] = [0.87, 0.88];
_scrollPercentage[28] = [0.88, 0.89];
_scrollPercentage[29] = [0.89, 0.90];
_scrollPercentage[30] = [0.90, 0.905];
_scrollPercentage[31] = [0.905, 0.91];
_scrollPercentage[32] = [0.91, 0.915];
_scrollPercentage[33] = [0.915, 0.92];
_scrollPercentage[34] = [0.92, 0.925];
_scrollPercentage[35] = [0.925, 0.93];
_scrollPercentage[36] = [0.93, 0.935];
_scrollPercentage[37] = [0.935, 0.94];
_scrollPercentage[38] = [0.94, 0.945];
_scrollPercentage[39] = [0.945, 0.95];
_scrollPercentage[40] = [0.95, 0.955];
_scrollPercentage[41] = [0.955, 0.960];
_scrollPercentage[42] = [0.960, 0.965];
_scrollPercentage[43] = [0.965, 0.970];
_scrollPercentage[44] = [0.970, 0.975];
_scrollPercentage[45] = [0.975, 0.980];
_scrollPercentage[46] = [0.980, 0.985];
_scrollPercentage[47] = [0.985, 0.990];
_scrollPercentage[48] = [0.990, 0.995];
_scrollPercentage[49] = [0.995, 1];

let pathLength = [];

for (i = 0; i < path.length; i++) {
    pathLength[i] = path[i].getTotalLength();
    path[i].style.strokeDasharray = pathLength[i] + ' ' + pathLength[i];
    path[i].style.strokeDashoffset = pathLength[i];
    path[i].getBoundingClientRect();
}

window.addEventListener("scroll", function (e) {
    let scrollPercent = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);

    let scrollPercentage = [];
    let drawLength = [];
    for (i = 0; i < path.length; i++) {
        scrollPercentage[i] = mapRange(scrollPercent, _scrollPercentage[i][0], _scrollPercentage[i][1], 0, 1);
        drawLength[i] = pathLength[i] * scrollPercentage[i];
        path[i].style.strokeDashoffset = pathLength[i] - drawLength[i];

        if (scrollPercentage[i] >= 0.99) {
            scrollPercentage[i] = 1;
            path[i].style.strokeDasharray = "none";
        } else {
            path[i].style.strokeDasharray = pathLength[i] + ' ' + pathLength[i];
        }
    }
});

function mapRange(n, fromStart, fromEnd, toStart, toEnd) {
    const out = toStart + (n - fromStart) * ((toEnd - toStart) / (fromEnd - fromStart));
    return Math.min(toEnd, Math.max(toStart, out));
}