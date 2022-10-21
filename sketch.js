var Grid_w = 400;
var Grid_h = 800;

var sizeX;
var sizeY;

let b_sys;

let b_sys2;

function setup() {
    // the ratio of Grid_w/Grid_h to width/height dictates the resolution of the simulation
    // unfortunately I haven't tweaked the variables to scale based off this ratio, so
    // a lot of number adjustments have to be made to heating/cooling/gravity to make the
    // bubbles move like a lava lamp.
    createCanvas(400, 800);
    fill(255, 0, 203);
    strokeWeight(2);
    noStroke();
    background(25, 25, 25);

    sizeX = width / Grid_w;
    sizeY = height / Grid_h;
    b_sys = new BubbleSys(Grid_w, Grid_h, 20, color(255, 0, 203, 360));
    //b_sys2 = new BubbleSys(Grid_w, Grid_h, color(255,100,203,360));
}
function draw() {

    background(25, 25, 25);
    glow();

    b_sys.update();
    //b_sys2.update();
}

function glow() {
    fill(255, 0, 203);
    drawingContext.shadowColor = color(255, 0, 203, 360);
    drawingContext.shadowBlur = 400;
    rect(0, height, width, height / 8);
    drawingContext.shadowColor = color(255, 0, 203, 360);
    drawingContext.shadowBlur = 200;
    rect(0, height, width, height / 8);
    drawingContext.shadowColor = color(255, 0, 203, 360);
    drawingContext.shadowBlur = 100;
    rect(0, height, width, height / 8);
    drawingContext.shadowColor = color(255, 0, 203, 360);
    drawingContext.shadowBlur = 50;
    rect(0, height, width, height / 8);
}
