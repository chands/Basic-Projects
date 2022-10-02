const canvas = document.getElementById("canvasPlayground");
const CTX = canvas.getContext('2d');

let gameOn = true;
let crash  = false;

//Draw the game component.
class Box {
    constructor(size, color) {
        this.size = size;
        this.color = color;
        this.x = 0;
        this.y = 0;
    }
}

class Player extends Box {
    constructor() {
        super(50, "blue");
        this.x = 5;
        this.y = 225;
        //set player box initial speed
        this.speed = 5;
        this.moving = false;
    }
    //move player right & left:
    move() {
        if (this.moving) {
            this.x += this.speed;
        }
        if (this.x + this.size >= 445) {
            //at the canvas right end make the player box bounce back by making speed negative.
            this.speed = -(Math.abs(this.speed));
        }
        if (this.x <= 5) {
            //at the canvas left end side make the boxes start repeating or again move right.
            this.speed = Math.abs(this.speed);
        }
    }
}

class Enemy extends Box {
    constructor(speed) {
        super(50, "red");
        this.y = 5;
        //set enemies boxes speed
        this.speed = speed;
    }
    //move enemies up and down:
    move() {
        this.y += this.speed;
        if (this.y + this.size >= 495) {
            //at the canvas floor make the boxes bounce back by making speed negative.
            this.speed = -(Math.abs(this.speed));
        }
        if (this.y <= 5) {
            //at the top make the boxes start repeating or again bounce back.
            this.speed = Math.abs(this.speed);
        }
    };
}

//make player objects
let player = new Player();
let e1 = new Enemy(6);
let e2 = new Enemy(5);
let e3 = new Enemy(7);
e1.x = 80;
e2.x = 200;
e3.x = 320;

function drawBox(box) {
    CTX.fillStyle = box.color;
    CTX.fillRect(box.x, box.y, box.size, box.size);
}

//detect collision:
function isPlayerCollided(box1, box2) {
    //collision region
    let pLeftX = player.x;
    let pRightX = player.x + player.size;

    const e1CrashRightX = e1.x + e1.size;
    const e2CrashRightX = e2.x + e2.size;
    const e3CrashRightX = e3.x + e3.size;

    let e1BottomY = e1.y + e1.size;
    let e2BottomY = e2.y + e2.size;
    let e3BottomY = e3.y + e3.size;

    const crashTopY = player.y;
    const crashBottomY = player.y + player.size; //player & enemy have same size

    //Crash between e1 & player condition:
    if((pRightX > e1.x && pRightX < e1CrashRightX) && (e1BottomY > crashTopY && e1BottomY < crashBottomY)
      || (pLeftX > e1.x && pLeftX < e1CrashRightX) && (e1.y > crashTopY && e1.y < crashBottomY)) {
        crash = true;
    }
    if((pRightX > e2.x && pRightX < e2CrashRightX) && (e2BottomY > crashTopY && e2BottomY < crashBottomY)
      || (pLeftX > e2.x && pLeftX < e2CrashRightX) && (e2.y > crashTopY && e2.y < crashBottomY)) {
        crash = true;
    }
    if((pRightX > e3.x && pRightX < e3CrashRightX) && (e3BottomY > crashTopY && e3BottomY < crashBottomY)
      || (pLeftX > e3.x && pLeftX < e3CrashRightX) && (e3.y > crashTopY && e3.y < crashBottomY)) {
        crash = true;
    }
    return crash;
}

//adding some game event:
canvas.addEventListener('mousedown', () => {
    player.moving = true;
});
canvas.addEventListener('mouseup', () => {
    player.moving = false;
});

function gameLoop() {
    if(!gameOn) {
        return;
    }
    CTX.clearRect(0, 0, 450, 500);
    drawBox(player);
    drawBox(e1);
    drawBox(e2);
    drawBox(e3);
    e1.move();
    e2.move();
    e3.move();
    player.move();
    if(isPlayerCollided(e1, player) || isPlayerCollided(e2, player)|| isPlayerCollided(e3, player)) {
        gameOn = false;
        alert("Game Over!");
        //add restart option here.
    }
    window.requestAnimationFrame(gameLoop);
}

gameLoop();