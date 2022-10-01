const canvas = document.getElementById("canvasPlayground");
const CTX = canvas.getContext('2d');

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

//adding some game event:
canvas.addEventListener('mousedown', () => {
    player.moving = true;
});
canvas.addEventListener('mouseup', () => {
    player.moving = false;
});

function gameLoop() {
    //console.log("log update")
    CTX.clearRect(0, 0, 450, 500);
    e1.move();
    e2.move();
    e3.move();
    player.move();
    drawBox(player);
    drawBox(e1);
    drawBox(e2);
    drawBox(e3);
    window.requestAnimationFrame(gameLoop);
}

gameLoop();