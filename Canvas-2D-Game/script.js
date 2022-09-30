const canvas = document.getElementById("canvasDemo");
const CTX = canvas.getContext('2d');
//CTX.clearRect(0, 0, 500, 500);

// CTX.fillStyle = "#0000ff";
// CTX.fillRect( 5, 225, 50, 50); //player
// //enemies
// CTX.fillStyle = "#ff0000";
// CTX.fillRect(120, 5, 50, 50);
// CTX.fillRect(240, 5, 50, 50);
// CTX.fillRect(360, 5, 50, 50);
// //Player Target:
// CTX.rect(435, 225, 60, 60); 
// CTX.stroke();

//Draw the game component.
class Box {
    constructor(size, color){
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
    }
}

class Enemy extends Box {
    constructor(speed) {
        super(50, "red");
        this.y = 5;
        //for movement of boxes vertically
        this.speed = speed;
    }
    //for modularity in code
    move() {
        this.y += this.speed;
        if(this.y + this.size > 495) {
            //at the canvas floor make the boxes bounce back by making speed negative.
            this.speed = -(Math.abs(this.speed));
        }
        if(this.y < 5) {
            //at the top make the boxes start repeating or again bounce back.
            this.speed = Math.abs(this.speed);
        }
    };
}

//make player objects
let player = new Player();
let e1 = new Enemy(1);
let e2 = new Enemy(2);
let e3 = new Enemy(3);
e1.x = 120;
e2.x = 240;
e3.x = 360;

function drawBox(box) {
    CTX.fillStyle = box.color;
    CTX.fillRect(box.x, box.y, box.size, box.size);
}
updateGame();
// setInterval(() => {}, 100);

function updateGame() {
    window.requestAnimationFrame(() => {
        console.log("log update")
        CTX.clearRect(0, 0, 500, 500);
        e1.move();
        e2.move();
        e3.move();
        drawBox(player);
        drawBox(e1);
        drawBox(e2);
        drawBox(e3);
        updateGame(); 
    });
}
