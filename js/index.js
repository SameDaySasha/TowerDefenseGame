const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1280;
canvas.height = 768;

c.fillStyle = "white";
c.fillRect(0, 0, canvas.width, canvas.height);
console.log(canvas);

const image = new Image();
image.onload = () => {};
image.src = "img/gameMap.png";



class Enemy {
  constructor({position = { x: 0, y: 0 }}) {
    this.position = position
    this.width = 100;
    this.height = 100;
  }
  draw(){
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update(){
    this.draw();
    
    this.position.x += 1;
    const yDistance = this.position.y
    const angle = Math.atan2(yDistance, xDistance);
  }
}
const enemy = new Enemy({position: { x: 200, y:400 }});
const enemy2 = new Enemy({position: { x: 0, y:400 }});
function animate() {
  requestAnimationFrame(animate);

  c.drawImage(image, 0, 0);
  enemy.update();
  enemy2.update();
}

animate();
