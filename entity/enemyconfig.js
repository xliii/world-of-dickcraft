class EnemyConfig {
    constructor(index, sprites, width, height, hp, maxEnemies, spawnRate, maxSpeed = 1.75, minSpeed = 0.5) {
        this.index = index;
        this.width = width;
        this.height = height;
        this.hp = hp;
        this.maxEnemies = maxEnemies;
        this.spawnRate = spawnRate;

        this.minSpeed = minSpeed;
        this.maxSpeed = maxSpeed;

        this.sprites = [];
        for (let i = 0; i < sprites.length; i++) {
            let sprite = sprites[i];
            this.sprites.push(loadImage("sprites/level" + this.index + "/enemy/" + sprite + ".png"));
        }
    }

    randomSprite() {
        return this.sprites[Math.floor(Math.random() * this.sprites.length)];
    }
}