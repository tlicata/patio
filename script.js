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
    1:  {id: 1,  width: 40,   length: 24,   x: 0, y: 0, color: "red" },
    2:  {id: 2,  width: 75,   length: 49,   x: 0, y: 0, color: "green" },
    3:  {id: 3,  width: 34,   length: 49,   x: 0, y: 0, color: "blue" },
    4:  {id: 4,  width: 48.5, length: 51,   x: 0, y: 0, color: "orange" },
    5:  {id: 5,  width: 23,   length: 24,   x: 0, y: 0, color: "purple" },
    6:  {id: 6,  width: 24,   length: 14,   x: 0, y: 0, color: "purple" },
    7:  {id: 7,  width: 24,   length: 36,   x: 0, y: 0, color: "purple" },
    8:  {id: 8,  width: 12,   length: 33,   x: 0, y: 0, color: "purple" },
    9:  {id: 9,  width: 12,   length: 32,   x: 0, y: 0, color: "purple" },
    10: {id: 10, width: 24,   length: 36,   x: 0, y: 0, color: "purple" },
    11: {id: 11, width: 24,   length: 25.5, x: 0, y: 0, color: "black" },
    12: {id: 12, width: 23.5, length: 25,   x: 0, y: 0, color: "yellow" },
    13: {id: 13, width: 58.5, length: 23.5, x: 0, y: 0, color: "brown" },
    14: {id: 14, width: 24,   length: 16,   x: 0, y: 0, color: "brown" },
    15: {id: 15, width: 20,   length: 45,   x: 0, y: 0, color: "grey" },
    16: {id: 16, width: 24,   length: 48,   x: 0, y: 0, color: "brown" },
    17: {id: 17, width: 22,   length: 36,   x: 0, y: 0, color: "violet" },
    18: {id: 18, width: 47,   length: 32,   x: 0, y: 0, color: "gold" },
    19: {id: 19, width: 59.5, length: 36,   x: 0, y: 0, color: "grey" },
    20: {id: 20, width: 25.5, length: 24,   x: 0, y: 0, color: "grey" },
    21: {id: 21, width: 23.5, length: 26,   x: 0, y: 0, color: "grey" },
    23: {id: 23, width: 24,   length: 31,   x: 0, y: 0, color: "indigo" },
    24: {id: 24, width: 36,   length: 27,   x: 0, y: 0, color: "teal" },
    25: {id: 25, width: 30,   length: 26.5, x: 0, y: 0, color: "tan" },
    26: {id: 26, width: 36,   length: 30,   x: 0, y: 0, color: "honeydew" },
    27: {id: 27, width: 46.5, length: 29,   x: 0, y: 0, color: "brown" },
    28: {id: 28, width: 24,   length: 23,   x: 0, y: 0, color: "indianred" },
    47: {id: 47, width: 12.5, length: 24,   x: 0, y: 0, color: "tomato" },
    48: {id: 48, width: 24,   length: 28,   x: 0, y: 0, color: "cyan" }
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
        var rightEdge = stone.x + stone.width; // + GAP?
        return stone && ((stone.x >= leftBound && stone.x <= rightBound) ||
                         (rightEdge >= leftBound && rightEdge <= rightBound) ||
                         (stone.x < leftBound && rightEdge > rightBound));
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
