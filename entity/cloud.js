class Cloud {
    constructor(x, y, vx, img, maxX) {
        this.width = 250;
        this.height = 100;
        this.x = x;
        this.y = y;
        this.vx = vx;

        this.maxX = maxX;
        this.img = img;
        this.maxHp = 500;
        this.hp = this.maxHp;
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
        if (this.hp < this.maxHp) {
            let hpBarWidth = 50;
            let hpBarOffset = 50 * (this.hp / this.maxHp);
            ctx.fillStyle = 'green';
            ctx.fillRect(this.x + this.width / 2 - hpBarWidth / 2, this.y - 10, hpBarOffset, 10);
            ctx.fillStyle = 'red';
            ctx.fillRect(this.x + this.width / 2 - hpBarWidth / 2 + hpBarOffset, this.y - 10, hpBarWidth - hpBarOffset, 10);
        }
    }

    collides(x, y) {
        return !(x < this.x || x > this.x + this.width) && !(y < this.y || y > this.y + this.height);
    }

    hit() {
        this.hp--;
        return this.hp <= 0;
    }
}