const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1600;
canvas.height = 800;

let level1 = new Level(1, "Vanilla", ['cloud1', 'cloud2', 'cloud3'], 2);
let levels = [level1];

let level = level1;

let particles = [];
const maxParticles = 1000;
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

window.addEventListener("mousedown", function() {
    mouse.pressed = true;
});

window.addEventListener("mouseup", function() {
    mouse.pressed = false;
});

window.addEventListener("mousemove", function(e) {
    let rect = canvas.getBoundingClientRect();
    let scaleX = canvas.width / rect.width;
    let scaleY = canvas.height / rect.height;

    mouse.x = (e.clientX - rect.left) * scaleX;
    mouse.y = (e.clientY - rect.top) * scaleY;
});

function loadImage(src) {
    let img = new Image();
    console.log("Load image:" + src);
    img.src = src;
    //img.addEventListener("load", imageLoaded);

    return img;
}

function init() {
    animate();
}

function spawn(n = 1) {
    for (let i = 0; i < n; i++) {
        if (particles.length < maxParticles) {
            let particle = new Particle(mouse.x, canvas.height / 7 * 6, Math.random() * 2 - 1, Math.random() * -2 - 9, canvas.height);
            particles.push(particle);
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
    ctx.fillText(score.toString(), canvas.width / 2, 50);
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
    let model = level.randomEnemySprite();
    let left = Math.random() < 0.5;
    let y = Math.random() * canvas.height / 10 + canvas.height / 7;
    let x = left ? -200 : canvas.width;
    let v = Math.random() * 1.25 + 0.5;
    let vx = left ? v : -v;
    enemies.push(new Enemy(x, y, vx, model, canvas.width));
}

function updateEnemies() {
    for (let i = 0; i < enemies.length; i++) {
        let enemy = enemies[i];
        if (enemy.update()) {
            enemies.splice(enemies.indexOf(enemy), 1);
        }
        enemy.draw(ctx);
    }

    if (enemies.length < level.maxEnemies) {
        if (Math.random() < 0.005) {
            spawnEnemy();
        }
    }
}

function updateDick() {
    ctx.drawImage(level.character, mouse.x - canvas.width / 16.5, canvas.height / 6 * 5, 200, 150);
}

function updateScore() {
    if (score >= level.targetScore) {
        enemies = [];
        ctx.fillText("You win!", canvas.width / 2, canvas.height / 2);
    }
}

function animate() {
    clearScreen();

    if (mouse.pressed) {
        spawn(6);
    }

    updateScore();
    updateDick();
    updateEnemies();
    updateParticles();
    drawUI();
    requestAnimationFrame(animate);
}

animate();
