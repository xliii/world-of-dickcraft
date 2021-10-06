class Cloud {
    constructor(x, y, vx, img, maxX) {
        this.width = 250;
        this.height = 100;
        this.x = x;
        this.y = y;
        this.vx = vx;

        this.maxX = maxX;
        this.img = img;
        this.hp = 500;
    }

    update() {
        this.x += this.vx;

        return this.outOfBounds();
    }

    outOfBounds() {
        return this.x > this.maxX + 100 || this.x < -this.width - 100;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    collides(x, y) {
        return !(x < this.x || x > this.x + this.width) && !(y < this.y || y > this.y + this.height);
    }

    hit() {
        this.hp--;
        return this.hp <= 0;
    }
}