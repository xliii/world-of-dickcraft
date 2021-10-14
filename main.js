const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1600;
canvas.height = 800;
ctx.textAlign = "center";

let levels = [
    new Level(1, "Vanilla", new EnemyConfig(
        1, ['cloud1', 'cloud2', 'cloud3'], 250, 100, 100, 3, 0.01
    ), 10),
    new Level(2, "Burning Pissade", new EnemyConfig(
        2, ['cloud1'], 250, 100, 250, 3, 0.01, 1.5, 0.2
    ), 10),
    new Level(3, "Wrath of the Piss King", new EnemyConfig(
        3, ['cloud1'], 100, 120, 150, 7, 0.01
    ), 20),
    new Level(4, "PeePeeClysm", new EnemyConfig(
        4, ['cloud1'], 500, 200, 600, 2, 0.01
    ), 5),
    new Level(5, "Mists of Pissdaria", new EnemyConfig(
        5, ['cloud1'], 300, 300, 450, 10, 0.01
    ), 20),
    new Level(6, "Warlords of Wankinor", new EnemyConfig(
        6, ['cloud1'], 350, 150, 300, 20, 0.1
    ), 30),
    new Level(7, "Jerkion", new EnemyConfig(
        7, ['cloud1'], 400, 300, 2000, 2, 0.01, 0.5, 0.4
    ), 10),
    new Level(8, "Battle for Onanism", new EnemyConfig(
        8, ['cloud1'], 250, 250, 500, 10, 0.01
    ), 50),
    new Level(9, "Shadowanks", new EnemyConfig(
        9, ['cloud1'], 250, 100, 150, 70, 0.2, 3, 1
    ), 100),
    new Level("credits", "Congratulations!", new EnemyConfig(
        '', [], 100, 100, 100, 0, 0
    ), 0)
];

let level = null;

let particles = [];
const maxParticles = 700;
const gravity = 0.12;
const color = "#ffff00";
const DEBUG = false;
let enemies = [];

let score = 0;

const mouse = {
    x: canvas.width / 2,
    y: 0,
    pressed: false
};

function mouseup() {
    mouse.pressed = false;
}

function mousedown() {
    mouse.pressed = true;
}

window.addEventListener("mousedown", mousedown);

window.addEventListener("mouseup", mouseup);

window.addEventListener("touchstart", mousedown);
window.addEventListener("touchend", mouseup);
window.addEventListener("touchcancel", mouseup);
window.addEventListener("mousemove", move);
window.addEventListener("touchmove", touchmove);

function touchmove(e) {
    e.preventDefault();
    if (e.changedTouches.length > 0) {
        move(e.changedTouches[0]);
    }
}

function move(e) {
    let rect = canvas.getBoundingClientRect();
    let scaleX = canvas.width / rect.width;
    let scaleY = canvas.height / rect.height;

    mouse.x = (e.clientX - rect.left) * scaleX;
    mouse.y = (e.clientY - rect.top) * scaleY;
}

function loadImage(src) {
    let img = new Image();
    console.log("Load image:" + src);
    img.src = src;

    return img;
}

function shoot(n = 1) {
    for (let i = 0; i < n; i++) {
        if (particles.length < maxParticles) {
            let particle = new Particle(mouse.x, canvas.height / 7 * 6, Math.random() * 2 - 1, Math.random() * -2 - 9, canvas.height);
            particles.push(particle);

            if (level.index === 'credits') {
                let particle2 = new Particle(canvas.width / 2, canvas.height / 4, Math.random() * 2 - 1, Math.random() * -2 - 9, canvas.height);
                particles.push(particle2);
            }
        }
    }
}

function clearScreen() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(level.background, 0, 0, canvas.width, canvas.height);
}

function drawUI() {
    ctx.fillStyle = 'white';
    ctx.font = '50px Arial';
    ctx.fillText(level.name, canvas.width / 2, 50);
    if (level.targetScore > 0) {
        ctx.fillText(score + "/" + level.targetScore, canvas.width / 2, 100);
    }
    debug();
}

function debug() {
    if (!DEBUG) return;

    ctx.font = '10px Arial';
    ctx.fillText(particles.length.toString(), 10, 10);
    ctx.fillText(enemies.length.toString(), 10, 20);
}

function updateParticles() {
    ctx.fillStyle = color;
    for (let i = 0; i < particles.length; i++) {
        let particle = particles[i];
        if (particle.update(enemies)) {
            particles.splice(particles.indexOf(particle), 1);
        }
        particle.draw(ctx);
    }
}

function spawnEnemy() {
    let left = Math.random() < 0.5;
    let y = Math.random() * canvas.height / 10 + canvas.height / 7;
    let x = left ? -200 : canvas.width;
    enemies.push(new Enemy(x, y, level.enemyConfig, canvas.width, left));
}

function updateEnemies() {
    for (let i = 0; i < enemies.length; i++) {
        let enemy = enemies[i];
        if (enemy.update()) {
            enemies.splice(enemies.indexOf(enemy), 1);
        }
        enemy.draw(ctx);
    }

    if (enemies.length < level.enemyConfig.maxEnemies) {
        if (Math.random() < level.enemyConfig.spawnRate) {
            spawnEnemy();
        }
    }
}

function updateDick() {
    ctx.drawImage(level.character, mouse.x - canvas.width / 16.5, canvas.height / 6 * 5, 200, 150);
}

function updateScore() {
    if (score >= level.targetScore) {
        nextLevel();
    }
}

function nextLevel() {
    let index = levels.indexOf(level);
    if (index < levels.length - 1) {
        level = levels[index + 1];
        startLevel();
    }
}

function startLevel() {
    console.log("Start level: ", level);
    score = 0;
    enemies = [];
    particles = [];
}

function animate() {
    clearScreen();

    if (mouse.pressed) {
        shoot(6);
    }

    updateScore();
    updateDick();
    updateEnemies();
    updateParticles();
    drawUI();
    requestAnimationFrame(animate);
}

nextLevel();

animate();
