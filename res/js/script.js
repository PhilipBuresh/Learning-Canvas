const canvas = document.getElementById('cnv');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

let x = canvas.width / 2;
let y = 300;
let width = 50;
let height = 50;

let drawPlayer = () => {
    c.fillStyle = "white";
    c.clearRect(0, 0, canvas.width, canvas.height)
    c.fillStyle = "red";
    c.fillRect(x,y,width,height)
}

c.fillStyle = "red";
c.fillRect(x,y,canvas.width,canvas.height);

let gravityId;
let jumpingId;
let animationIdRight;
let animationIdLeft;

let isJumping = false;
let isMovingRight = false;
let isMovingLeft = false;

let gravity = () => {
    drawPlayer();
    y = y * 1.01 + 1;
    gravityId = window.requestAnimationFrame(gravity)
    if(canvas.height - height < y){
        y = canvas.height - height;
        drawPlayer();
        cancelAnimationFrame(gravityId);
    }
}
gravity();

let jump = () => {
    let maxHeight = y - 150;
    let yJump = 17;
    const jumping = () => {
        drawPlayer();
            console.log("jump")
            yJump *= 0.9;
            y -= yJump;
            jumpingId = requestAnimationFrame(jumping);
            if(y < maxHeight){
                cancelAnimationFrame(jumpingId);
                setTimeout(() => {
                    gravity();
                }, 20);
            };
        
    }
    jumping();
}

let moveRight = () => {
    const movingRight = () => {
        drawPlayer();
        console.log("right");
        x += 3;
        animationIdRight = requestAnimationFrame(movingRight);
        if(x > canvas.width - width){
            cancelAnimationFrame(animationIdRight);
        }
    };
    movingRight();
};

let moveLeft = () => {
    const movingLeft = () => {
        drawPlayer();
        console.log("left");
        x -= 3;
        animationIdLeft = requestAnimationFrame(movingLeft);
        if(x < 0){
            cancelAnimationFrame(animationIdLeft);
        }
    };
    movingLeft();
};

sliding = 0.01;


window.addEventListener('keydown', (event) => {
    if (event.key == 'w' && isJumping == false) {
        console.log(y)
        if(canvas.height - height == y){
            isJumping = true;
            jump();
        }
    } else if (event.key == 'd' && isMovingRight == false && x < canvas.width - width) {
        isMovingRight = true;
        moveRight();
    } else if (event.key == 'a' && isMovingLeft == false && x > 0) {
        isMovingLeft = true;
        moveLeft();
    }
});

window.addEventListener('keyup', (event) => {
    if (event.key == 'd') {
        isMovingRight = false;
        cancelAnimationFrame(animationIdRight);
    }
    if (event.key == 'a') {
        isMovingLeft = false;
        cancelAnimationFrame(animationIdLeft);
    }
    if (event.key == 'w') {
        isJumping = false;
    }
});
