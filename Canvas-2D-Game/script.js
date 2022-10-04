const canvas = document.getElementById("canvasPlayground");
const CTX = canvas.getContext('2d');

let gameOn = true;

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
        if (this.x + this.size >= 495) {
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
e1.x = 85;
e2.x = 225;
e3.x = 365;

function drawBox(box) {
    CTX.fillStyle = box.color;
    CTX.fillRect(box.x, box.y, box.size, box.size);
}

//detect collision:
function isPlayerCollided(box1, box2) {
    //collision region
    let pLeft = box2.x;
    let pRight = box2.x + box2.size;
    let pTop = box2.y;
    let pBottom = box2.y + box2.size; //player & enemy have same size

    let eLeft = box1.x;
    let eRight = box1.x + box1.size;
    let eTop = box1.y;
    let eBottom = box1.y + box1.size;

    //Crash between enemy & player condition: overlapping occurs in this case.
    // if((pRight > eLeft && pRight < eRight) && (eBottom > pTop && eBottom < pBottom)
    //   || (pLeft > eLeft && pLeft < eRight) && (eTop > pTop && eTop < pBottom)) {
    //     return true;
    // }

    //condition for no crash between player and enemy: no overlapping here.
    if((pTop > eBottom) || (pBottom < eTop) || (pLeft > eRight) || (pRight < eLeft)) {
        return false;
    }
    return true;
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
    CTX.clearRect(0, 0, 500, 500);
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