class Level {
    constructor(index, name, enemies, character="character") {
        this.index = index;
        this.name = name;

        this.character = loadImage("sprites/" + character + ".png");

        this.background = loadImage("sprites/level" + this.index + "/background.png");

        this.enemies = [];
        for (let i = 0; i < enemies.length; i++) {
            let enemy = enemies[i];
            this.enemies.push(loadImage("sprites/level" + this.index + "/enemy/" + enemy + ".png"));
        }
    }
}