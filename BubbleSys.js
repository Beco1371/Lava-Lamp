class BubbleSys {
    constructor(w, h, sz, col) {
        this.balls = [];
        this.cells = [];
        this.circles = [];
        this.w = w;
        this.h = h;
        this.sz = sz;
        this.col = col;
        this.create();
    }

    create() {
        for (let i = 0; i < this.sz; i++) { this.balls.push(new Bubble(random(this.w), height, 0, 0, random(100, 500))); }
    }

    update() {
        fill(this.col);
        drawingContext.shadowColor = this.col;
        drawingContext.shadowBlur = 30;

        for (let i = 0; i < this.balls.length; i++) {
            this.balls[i].update();
        }

        this.index();
        this.calculateEdges();
        this.drawShapes();
    }

    // loops through all x, y cells, calculating the sum of the distances between
    // the cell and each bubble in balls. If the distance is lower than the threshold
    // add the cell to the cells array in the form of a true/false
    index() {
        for (let y = -1; y <= this.h; y++) {
            this.cells[y] = [];
            for (let x = -1; x <= this.w; x++) {
                var sum = 0;
                this.cells[y][x] = false;
                if (x != -1 && y != -1 && x != this.w && y != this.h) {
                    for (let i = 0; i < this.balls.length; i++) {
                        //efficient distance approximation
                        let dx = x - this.balls[i].x;
                        let dy = y - this.balls[i].y
                        let distance = dx * dx + dy * dy;
                        sum += this.balls[i].sz / distance;
                    }

                    if (sum > 0.15) {
                        this.cells[y][x] = true;
                    }
                }
            }
        }
    }

    // Loops through each cell in cells, checking if one of it's four neighbors is a unfilled(false) cell:
    // Effectively just border detection...
    calculateEdges() {
        for (let y = -1; y <= this.h; y++) {
            this.circles[y] = [];
            for (let x = -1; x <= this.w; x++) {
                this.circles[y][x] = false;
                if (x != -1 && y != -1 && x != this.w && y != this.h) {
                    if (this.cells[y][x] == true) {
                        if (y + 1 <= this.h && y - 1 >= 0 && x + 1 <= this.w && x - 1 >= 0) {
                            if (this.cells[y - 1][x] == false || this.cells[y][x - 1] == false || this.cells[y][x + 1] == false || this.cells[y + 1][x] == false) {
                                this.circles[y][x] = true;
                            }
                        }
                        else {
                            this.circles[y][x] = true;
                        }
                    }
                }
            }
        }
    }

    // Loops through each cell in circles, if the cell is true, loop through neighboring
    // 8 cells to find the next active cell. Set the cell to false, rinse and repeat
    // until the circle has been closed. Continue looping through circles to find more
    // circles to draw
    drawShapes() {
        for (let y = 0; y < this.h; y++) {
            for (let x = 0; x < this.w; x++) {
                let init_circle = true;
                let break_circle = false;
                if (this.circles[y][x] == true) {
                    beginShape();
                    while (true) {
                        if (break_circle == true) {
                            endShape();
                            break;
                        }
                        let break_flag = false;

                        for (let i = -1; i <= 1; i++) {
                            if (break_flag == true || break_circle == true) { break; }
                            for (let j = -1; j <= 1; j++) {
                                if (i == j && i == 0) {

                                }
                                else {
                                    if (this.circles[y + i][x + j] == true) {
                                        curveVertex(x * sizeX + sizeX / 2, y * sizeY + sizeY / 2);
                                        if (init_circle == false) { this.circles[y][x] = false; }
                                        x = x + j; y = y + i;
                                        break_flag = true;
                                        break;
                                    }
                                    if (i == j && i == 1 && this.circles[y + i][x + j] == false) {
                                        curveVertex(x * sizeX + sizeX / 2, y * sizeY + sizeY / 2);
                                        this.circles[y][x] = false;
                                        break_flag = true;
                                        break_circle = true
                                        break;
                                    }
                                }
                            }
                            if (break_flag == true || break_circle == true) { break; }
                        }
                        init_circle = false;
                    }
                }
            }
        }
    }
}
