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
