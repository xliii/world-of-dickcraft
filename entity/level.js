class Level {
    constructor(index, name, enemies = [], targetScore = 4, maxEnemies = 2, character="character", spawnRate = 0.005) {
        this.index = index;
        this.name = name;

        this.targetScore = targetScore;
        this.maxEnemies = maxEnemies;
        this.spawnRate = spawnRate;

        this.character = loadImage("sprites/" + character + ".png");
        this.background = loadImage("sprites/level" + this.index + "/background.png");
        this.enemies = [];
        for (let i = 0; i < enemies.length; i++) {
            let enemy = enemies[i];
            this.enemies.push(loadImage("sprites/level" + this.index + "/enemy/" + enemy + ".png"));
        }
    }

    randomEnemySprite() {
        return this.enemies[Math.floor(Math.random() * this.enemies.length)];
    }
}