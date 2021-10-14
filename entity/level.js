class Level {
    constructor(index, name, enemyConfig, targetScore = 4, character="character") {
        this.index = index;
        this.name = name;

        this.targetScore = targetScore;
        this.enemyConfig = enemyConfig;

        this.character = loadImage("sprites/" + character + ".png");
        this.background = loadImage("sprites/level" + this.index + "/background.png");

    }
}