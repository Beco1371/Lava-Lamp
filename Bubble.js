class Bubble {
    constructor(x, y, vx, vy, sz) {
        this.x = x; this.y = y;
        this.vx = vx; this.vy = vy;
        this.sz = sz;
        this.temperature = random(-1000, 1000);
        this.gravity = 0.001;
    }

    // heating/cooling/gravity/velocity effects on the bubbles position
    update() {
        let fvx = this.vx; let fvy = this.vy + this.gravity;
        let heatSource = map(this.y, 0, height, -0.5, 0.75, true);

        if (heatSource <= 0) { this.temperature += -(heatSource ** 2); }
        else { this.temperature += heatSource ** 2; }

        fvy -= map(this.temperature, -1000, 1000, -5, 5)
        this.x += fvx;
        this.y += fvy;
        this.vy += this.gravity;
        if (this.x > Grid_w || this.x < 0) { this.vx *= -1; }
        if (this.y > Grid_h || this.y < 0) {
            if (this.y < 0) { this.y = 0; }
            if (this.y > Grid_h) { this.y = Grid_h; }
        }
    }
}
