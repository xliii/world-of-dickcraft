class HitboxConfig {
    constructor(hitboxes) {
        this.hitboxes = hitboxes;
    }

    overlaps(centerX, centerY, x, y) {
        for (let i = 0; i < this.hitboxes.length; i++) {
            let hitbox = this.hitboxes[i];
            if (hitbox.overlaps(centerX, centerY, x, y)) {
                return true;
            }
        }

        return false;
    }

    draw(ctx, centerX, centerY) {
        for (let i = 0; i < this.hitboxes.length; i++) {
            let hitbox = this.hitboxes[i];
            hitbox.draw(ctx, centerX, centerY);
        }
    }
}