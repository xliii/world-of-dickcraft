class Enemy {
    constructor(x, y, config, maxX, rotation) {
        this.width = config.width;
        this.height = config.height;
        this.hitbox = config.hitbox;
        this.x = x;
        this.y = y;
        this.vx = config.minSpeed + (config.maxSpeed - config.minSpeed) * Math.random();
        if (!rotation) {
            this.vx = -this.vx;
        }
        this.maxX = maxX;
        this.img = config.randomSprite();
        this.maxHp = config.hp;
        this.hp = this.maxHp;
    }

    update() {
        this.x += this.vx;

        return this.outOfBounds();
    }

    outOfBounds() {
        return this.x > this.maxX + 100 || this.x < -this.width - 100;
    }

    drawHp(ctx) {
        if (this.hp < this.maxHp) {
            let hpBarWidth = 50;
            let hpBarOffset = 50 * (this.hp / this.maxHp);
            ctx.fillStyle = 'green';
            ctx.fillRect(this.x + this.width / 2 - hpBarWidth / 2, this.y - 10, hpBarOffset, 10);
            ctx.fillStyle = 'red';
            ctx.fillRect(this.x + this.width / 2 - hpBarWidth / 2 + hpBarOffset, this.y - 10, hpBarWidth - hpBarOffset, 10);
        }
    }

    draw(ctx, debug=false) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        this.drawHp(ctx);

        if (debug) {
            this.hitbox.draw(ctx, this.centerX(), this.centerY());
        }
    }

    centerX() {
        return this.x + this.width / 2;
    }

    centerY() {
        return this.y + this.height / 2;
    }

    collides(x, y) {
        return this.hitbox.overlaps(this.centerX(), this.centerY(), x, y);
    }

    hit() {
        this.hp--;
        return this.hp <= 0;
    }
}