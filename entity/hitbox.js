class Hitbox {
    constructor(type, width, height, xOffset = 0, yOffset = 0) {
        this.type = type;
        this.width = width;
        this.height = height;

        this.xOffset = xOffset;
        this.yOffset = yOffset;
    }

    overlaps(centerX, centerY, x, y) {
        centerX = centerX + this.xOffset;
        centerY = centerY + this.yOffset;

        if (this.type === 'circle') {
            let dx = x - centerX;
            let rx = this.width / 2;
            let dy = y - centerY;
            let ry = this.height / 2;
            return (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry) < 1;
        } else {
            let left = centerX - this.width / 2;
            let right = centerX + this.width / 2;
            let top = centerY - this.height / 2;
            let bottom = centerY + this.height / 2;

            let outOfX = x < left || x > right;
            let outOfY = y < top || y > bottom;

            return !outOfX && !outOfY;
        }
    }

    draw(ctx, centerX, centerY) {
        centerX = centerX + this.xOffset;
        centerY = centerY + this.yOffset;

        ctx.strokeStyle = 'green';
        if (this.type === 'circle') {
            ctx.beginPath();
            ctx.ellipse(centerX, centerY, this.width / 2, this.height / 2, 0, 0, 2 * Math.PI);
            ctx.stroke();
        } else {
            let left = centerX - this.width / 2;
            let top = centerY - this.height / 2;

            ctx.strokeRect(left, top, this.width, this.height);
        }
    }
}