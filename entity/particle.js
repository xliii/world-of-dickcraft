class Particle {
    constructor(x, y, vx, vy, maxY) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.size = Math.random() * 0.75 + 1.5;

        this.maxY = maxY;
    }

    update(enemies) {
        this.y += this.vy;
        this.x += this.vx;

        for (let i = 0; i < enemies.length; i++) {
            let enemy = enemies[i];
            if (enemy.collides(this.x, this.y)) {
                if (enemy.hit()) {
                    enemies.splice(enemies.indexOf(enemy), 1);
                    score++;
                }
                return true;
            }
        }

        if (this.y > this.maxY) {
            return true;
        }

        this.vy += gravity;
        return false;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}