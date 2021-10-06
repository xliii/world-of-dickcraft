const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1600;
canvas.height = 800;

const character = loadImage("character.png");
const bg = loadImage("background.png");
const cloudSprites = [];
cloudSprites.push(loadImage("cloud1.png"));
cloudSprites.push(loadImage("cloud2.png"));
cloudSprites.push(loadImage("cloud3.png"));

let particles = [];
const maxParticles = 1000;
const gravity = 0.12;
const color = "#ffff00";
const DEBUG = false;
let clouds = [];
const maxClouds = 2;

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

let countdown = 4;

function loadImage(src) {
    let img = new Image();
    img.src = src;
    img.addEventListener("load", function() {
        init();
    });

    return img;
}

function init() {
    countdown--;
    if (countdown === 0) {
        animate();
    }
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
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
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
    ctx.fillText(clouds.length.toString(), 10, 20);
}

function updateParticles() {
    ctx.fillStyle = color;
    for (let i = 0; i < particles.length; i++) {
        let particle = particles[i];
        if (particle.update(clouds)) {
            particles.splice(particles.indexOf(particle), 1);
        }
        particle.draw(ctx);
    }
}

function spawnCloud() {
    let model = cloudSprites[Math.floor(Math.random() * cloudSprites.length)];
    let left = Math.random() < 0.5;
    let y = Math.random() * canvas.height / 10 + canvas.height / 7;
    let x = left ? -200 : canvas.width;
    let v = Math.random() * 1.25 + 0.5;
    let vx = left ? v : -v;
    console.log(x);
    clouds.push(new Cloud(x, y, vx, model, canvas.width));
}

function updateClouds() {
    for (let i = 0; i < clouds.length; i++) {
        let cloud = clouds[i];
        if (cloud.update()) {
            clouds.splice(clouds.indexOf(cloud), 1);
        }
        cloud.draw(ctx);
    }

    if (clouds.length < maxClouds) {
        if (Math.random() < 0.005) {
            spawnCloud();
        }
    }
}

function updateDick() {
    ctx.drawImage(character, mouse.x - canvas.width / 16.5, canvas.height / 6 * 5, 200, 150);
}

function animate() {
    clearScreen();

    if (mouse.pressed) {
        spawn(6);
    }

    updateDick();
    updateClouds();
    updateParticles();
    drawUI();
    requestAnimationFrame(animate);
}

animate();
