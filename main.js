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

   // RESIZING WINDOW - WINDOW EVENT LISTENER FOR SCREEN RESIZE
   window.addEventListener('resize', function (){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

// MOUSE COORDINATES - SETTING UP THE MOUSE VARIABLE TO CONTAIN THE COORDINATES OF X & Y
const mouse = { x: undefined, y: undefined }

// CLICK EVENT LISTENER - ON CLICK
canvas.addEventListener('click' , function(e) {
    // ADD COORDINATES TO MOUSE POSITION ON CLICK
    mouse.x = e.x;
    mouse.y = e.y;
    // LOOP TO CREATE PARTICLES
    for(let i = 0; i < 1; i ++){
        particlesArray.push(new Particle)
        console.log(particlesArray.length)

    }
});

// MOVE EVENT LISTENER - ON MOUSE MOVE
canvas.addEventListener('mousemove', function(e){
    // ADD COORDINATES TO MOUSE POSITION WHILE MOVING
    mouse.x = e.x;
    mouse.y = e.y;
    // CALL NEW PARTICLES
    for(let i = 0; i < 10; i ++){
        particlesArray.push(new Particle)
        // console.log(particlesArray.length)

    }
});

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
    }
    }
}
}


// PARTICLE CLASS
class Particle {
    // CONSTRUCTOR 
    constructor(){
        // SETS PARTICLE TO MOUSE COORDINATES
        this.x = mouse.x;
        this.y = mouse.y;

        // PARTICLES SIZE, SPEED, & COLOR
        this.size = Math.random() * 10 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'hsl(' + hue + ', 100%, 50%)';
    }

    // UPDATE
    update(){
        // UPDATE THE PARTICLES IN RELATION TO THE SPEED
        this.x += this.speedX;
        this.y += this.speedY;
        // DESTROY PRODUCT IF UNDER A CERTAIN
        if(this.size > 10.2 )  this.size -= 0.1; // size > 0.2
    }

    // DRAWING THE PARTICLE
    draw(){
        ctx.fillStyle = this.color;
        // ctx.lineWidth = 15;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size, 0, Math.PI * 2);
        ctx.fill();
    }
};

// HANDLE PARTICLES FUNCTION
function handleParticles(){
    for(let i = 0; i < particlesArray.length; i++){

        // CALL UPDATE FOR SINGLE PARTICLE
        particlesArray[i].update();
        // CALL DRAW FOR SINGLE PARTICLE
        particlesArray[i].draw();
        // LOOP THE PARTICLES ARRAY 
        // for (let j = i; j < particlesArray.length; j++){
        //     const dx = particlesArray[i].x - particlesArray[j].x;
        //     const dy = particlesArray[i].y - particlesArray[j].y;
        //     const distance = Math.sqrt(dx * dx + dy * dy);
        //     if ( distance < 100 ){  
        //         ctx.beginPath();
        //         ctx.strokeStyle = particlesArray[i].color;
        //         ctx.lineWidth = 0.2;
        //         // UPDATE MOUSE POSITION
        //         ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        //         ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        //         ctx.stroke();
        //         ctx.closePath();
        //     }
        // }
        // SPLICE PARTICLE FROM PARTICLES ARRAY IF THE SIZE IS TO SMALL
        // if(particlesArray[i].size <= 0.3){
        //     particlesArray.splice(i, 1);
        //     i--;
        // }
    }
}

// ANIMATE LOOP
function animate(){
    // CLEARING THE CANVAS
    ctx.clearRect(0,0, canvas.width, canvas.height);
    // CALL HANDLE PARTICLES
    handleParticles();
    // CHANGE HUE SATURATE HUE FOR CHANGING COLORS
    hue += 2;
    // CALL ANIMATE LOOP
    requestAnimationFrame(animate);
}

// CALL ANIMATE FUNCTION
animate();

