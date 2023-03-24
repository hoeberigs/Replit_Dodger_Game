const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const playerWidth = 30;
const playerHeight = 30;
const playerSpeed = 5;
const enemySize = 30;
const enemySpeed = 2;

let player = {
    x: canvas.width / 2 - playerWidth / 2,
    y: canvas.height - playerHeight - 10
};

let enemies = [];
let gameOver = false;

document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowLeft') {
        player.x -= playerSpeed;
    } else if (e.code === 'ArrowRight') {
        player.x += playerSpeed;
    }
});

function spawnEnemy() {
    const x = Math.random() * (canvas.width - enemySize);
    const enemy = { x, y: -enemySize };
    enemies.push(enemy);
}

function updateEnemies() {
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].y += enemySpeed;

        if (enemies[i].y > canvas.height) {
            enemies.splice(i, 1);
            i--;
        }

        if (isColliding(player, enemies[i])) {
            gameOver = true;
            break;
        }
    }
}

function isColliding(rect1, rect2) {
    return rect1.x < rect2.x + enemySize &&
        rect1.x + playerWidth > rect2.x &&
        rect1.y < rect2.y + enemySize &&
        rect1.y + playerHeight > rect2.y;
}

function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, playerWidth, playerHeight);
}

function drawEnemies() {
    ctx.fillStyle = 'red';
    for (const enemy of enemies) {
        ctx.fillRect(enemy.x, enemy.y, enemySize, enemySize);
    }
}

function gameLoop() {
    if (gameOver) {
        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';
        ctx.fillText('Game Over', canvas.width / 2 - 80, canvas.height / 2);
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.02) {
        spawnEnemy();
    }

    updateEnemies();
    drawPlayer();
    drawEnemies();
}

setInterval(gameLoop, 1000 / 60); // Run gameLoop 60 times per second
