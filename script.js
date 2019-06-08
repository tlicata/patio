var GAP = 6;

var canvas = document.getElementsByTagName("canvas")[0];

// Make canvas fullscreen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Color canvas green
var ctx = canvas.getContext("2d");
ctx.rect(0, 0, canvas.width, canvas.height);
var g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
g.addColorStop(0, "#32CD32");
g.addColorStop(1, "#008800");
ctx.fillStyle = g;
ctx.fill();

// Measurements and positioning of stones
var stones = {
    1:  {width: 40,   length: 24,   x: 0, y: 0, color: "red" },
    2:  {width: 75,   length: 49,   x: 0, y: 0, color: "green" },
    3:  {width: 34,   length: 49,   x: 0, y: 0, color: "blue" },
    4:  {width: 48.5, length: 51,   x: 0, y: 0, color: "orange" },
    5:  {width: 23,   length: 24,   x: 0, y: 0, color: "purple" },
    11: {width: 24,   length: 25.5, x: 0, y: 0, color: "black" },
    12: {width: 23.5, length: 25,   x: 0, y: 0, color: "#444444" },
    13: {width: 58.5, length: 23.5, x: 0, y: 0, color: "#444444" },
    15: {width: 20,   length: 45,   x: 0, y: 0, color: "#444444" },
    18: {width: 47,   length: 32,   x: 0, y: 0, color: "#444444" },
    19: {width: 59.5, length: 36,   x: 0, y: 0, color: "#444444" },
    47: {width: 12.5, length: 24,   x: 0, y: 0, color: "#444444" },
    48: {width: 24,   length: 28,   x: 0, y: 0, color: "#444444" }
};

var positions = [
    [1, 2, 3, 4, 5, 6],
    [16, 15, 14, 47, 48, 12, 11, 7, 8],
    [17, 18, 19, 20, 21, 10, 9],
    [28, 27, 26, 25, 24, 23, 22],
    [29, 31, 32, 33, 34, 35, 36, 37, 38],
    [30, 45, 44, 43, 42, 41, 40, 39]
];

// Helper Fns
var placeRightOf = function (leftStone, gap) {
    if (!leftStone) { return 0 };
    if (gap === undefined) { gap = 0 };

    var width = leftStone.width === undefined ? 50 : leftStone.width;
    var x = leftStone.x === undefined ? 50 : leftStone.x;

    return leftStone.x + leftStone.width + gap;
};

var findStonesBetween = function (row, leftBound, rightBound) {
    return row.map(function (key) {
        return stones[key];
    }).filter(function (stone) {
        return stone && (stone.x >= leftBound || stone.x <= rightBound);
    });
};

var placeAbove = function (stone, belowRow, gap) {
    var bottom = canvas.height - stone.length;
    if (!belowRow) { return bottom };

    var stonesBelow = findStonesBetween(belowRow, stone.x, stone.x + stone.width /* gap */);
    if (stonesBelow.length === 0) { return bottom };

    var tops = stonesBelow.map(below => { return below.y });
    return Math.min.apply(null, tops) - stone.length - gap;
};

var drawStone = function (stone) {
    ctx.fillStyle = stone.color;
    ctx.fillRect(stone.x, stone.y, stone.width, stone.length);
};

for (var y = 0; y < positions.length; y++) {
    var row = positions[y];
    for (var x = 0; x < row.length; x++) {
        var stone = stones[row[x]];

        if (stone) {
            var leftStone = x > 0 ? stones[row[x-1]] : null;
            stone.x = placeRightOf(leftStone, GAP);

            var belowRow = y > 0 ? positions[y-1] : null;
            stone.y = placeAbove(stone, belowRow, GAP);

            drawStone(stone);
        }
    }
}
