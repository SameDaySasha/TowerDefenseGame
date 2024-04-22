const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1280;
canvas.height = 768;

c.fillStyle = "white";
c.fillRect(0, 0, canvas.width, canvas.height);
console.log(canvas);
const image = new Image();
image.onload = () => {
  c.drawImage(image, 0, 0, canvas.width, canvas.height);
};
image.src = "img/gameMap.png";
