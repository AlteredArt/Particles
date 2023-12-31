// PARTICLES WITH JS

// SETTING UP THE CANVAS
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
// CANVAS WIDTH & HEIGHT
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// PARTICLE ARRAY
const particlesArray = [];
// HUE
let hue = 0;

// RESIZING WINDOW
window.addEventListener('resize', function (){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
 
})

// MOUSE COORDINATES
const mouse = { x: undefined, y: undefined }

// CLICK EVENT LISTENER
canvas.addEventListener('click' , function(e) {
    mouse.x = e.x;
    mouse.y = e.y;
    // CALL NEW PARTICLES
    for(let i = 0; i < 10; i ++){
        particlesArray.push(new Particle)
    }
});

// MOVE EVENT LISTENER
canvas.addEventListener('mousemove', function(e){
    mouse.x = e.x;
    mouse.y = e.y;
    // CALL NEW PARTICLES
    for(let i = 0; i < 5; i ++){
        particlesArray.push(new Particle)
    }
});

// PARTICLE CLASS
class Particle {
    // CONSTRUCTOR 
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;

        // SIZE, SPEED, COLOR OF PARTICLES
        this.size = Math.random() * 15 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'hsl(' + hue + ', 100%, 50%)';
    }

    // UPDATE
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        // CHANGE SIZE OF PARTICLE
        if(this.size > 0.2 )  this.size -= 0.1;
    }

    // DRAW
    draw(){
        ctx.fillStyle = this.color;
        // ctx.lineWidth = 15;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size, 0, Math.PI * 2);
        ctx.fill();
    }
};

// HANDLE PARTICLES
function handleParticles(){
    for(let i = 0; i < particlesArray.length; i++){
        // CALL UPDATE FOR SINGLE PARTICLE
        particlesArray[i].update();
        // CALL DRAW FOR SINGLE PARTICLE
        particlesArray[i].draw();
        // LOOP THE PARTICLES ARRAY 
        for (let j = i; j < particlesArray.length; j++){
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if ( distance < 100 ){  
                ctx.beginPath();
                ctx.strokeStyle = particlesArray[i].color;
                ctx.lineWidth = 0.2;
                // UPDATE MOUSE POSITION
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
                ctx.closePath();
            }
        }
        // SPLICE PARTICLE FROM PARTICLES ARRAY IF THE SIZE IS TO SMALL
        if(particlesArray[i].size <= 0.3){
            particlesArray.splice(i, 1);
            i--;
        }
    }
}

// ANIMATE LOOP
function animate(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    // CALL HANDLE PARTICLES
    handleParticles();
    // CHANGE HUE
    hue += 2;
    // CALL ANIMATE LOOP
    requestAnimationFrame(animate);
}

// CALL ANIMATE LOOP
animate();

// END