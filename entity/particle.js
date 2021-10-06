class Particle {
    constructor(x, y, vx, vy, maxY) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.size = Math.random() * 0.75 + 1.5;

        this.maxY = maxY;
    }

    update(clouds) {
        this.y += this.vy;
        this.x += this.vx;

        for (let i = 0; i < clouds.length; i++) {
            let cloud = clouds[i];
            if (cloud.collides(this.x, this.y)) {
                if (cloud.hit()) {
                    clouds.splice(clouds.indexOf(cloud), 1);
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