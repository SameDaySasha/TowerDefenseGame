const canvas = document.querySelector("canvas"); // Select the first canvas element in the document
const c = canvas.getContext("2d"); // Get the 2D rendering context for the canvas

canvas.width = 1280; // Set the canvas width to 1280 pixels
canvas.height = 768; // Set the canvas height to 768 pixels

c.fillStyle = "white"; // Set the fill color to white
c.fillRect(0, 0, canvas.width, canvas.height); // Fill the entire canvas with white color
console.log(canvas); // Log the canvas element to the console

console.log(placementTilesData); // Log the placement tiles data to the console
const placementTilesData2d = []; // Initialize an empty array to hold 2D placement tiles data
for (let i = 0; i < placementTilesData.length; i += 20) {
  // Loop through the placement tiles data, incrementing by 20 each time
  placementTilesData2d.push(placementTilesData.slice(i, i + 20)); // Slice the data into chunks of 20 and push them to the 2D array
}

class PlacementTile {
  constructor({ position = { x: 0, y: 0 } }) {
    this.position = position; // Set the position of the tile
    this.size = 64; // Set the size of the tile
  }
  draw() {
    c.fillRect(this.position.x, this.position.y, this.size, this.size); // Draw the tile on the canvas
  }
}

const placementTiles = []; // Initialize an empty array to hold placement tile objects

placementTilesData2d.forEach((row, y) => {
  // Loop through each row in the 2D placement tiles data
  row.forEach((symbol, x) => {
    // Loop through each symbol in the row
    if (symbol === 14) {
      // If the symbol is 14, it represents a building placement tile
      placementTiles.push(new PlacementTile({ position: { x: x * 64, y: y * 64 } })); // Create a new placement tile and push it to the array
    }
  });
});
console.log(placementTiles); // Log the placement tiles array to the console

const image = new Image(); // Create a new Image object
image.onload = () => {}; // Set an empty onload handler for the image
image.src = "img/gameMap.png"; // Set the source of the image to the game map

class Enemy {
  constructor({ position = { x: 0, y: 0 } }) {
    this.position = position; // Set the position of the enemy
    this.width = 100; // Set the width of the enemy
    this.height = 100; // Set the height of the enemy
    this.waypointIndex = 0; // Initialize the waypoint index to 0
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    }; // Calculate the center position of the enemy
  }
  draw() {
    c.fillStyle = "red"; // Set the fill color to red
    c.fillRect(this.position.x, this.position.y, this.width, this.height); // Draw the enemy on the canvas
  }
  update() {
    this.draw(); // Draw the enemy

    const waypoint = waypoints[this.waypointIndex]; // Get the current waypoint
    const yDistance = waypoint.y - this.center.y; // Calculate the distance to the waypoint in the y direction
    const xDistance = waypoint.x - this.center.x; // Calculate the distance to the waypoint in the x direction
    const angle = Math.atan2(yDistance, xDistance); // Calculate the angle to the waypoint

    this.position.x += Math.cos(angle); // Update the x position based on the angle
    this.position.y += Math.sin(angle); // Update the y position based on the angle
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    }; // Recalculate the center position

    // Check if the enemy has reached the current waypoint
    if (
      Math.round(this.center.x) === Math.round(waypoint.x) &&
      Math.round(this.center.y) === Math.round(waypoint.y) &&
      this.waypointIndex < waypoints.length - 1
    ) {
      this.waypointIndex++; // Move to the next waypoint
    }
  }
}

const enemies = []; // Initialize an empty array to hold enemy objects
for (let i = 0; i < 15; i++) {
  // Loop to create 15 enemies
  const xOffset = i * 150; // Calculate the x offset for each enemy
  enemies.push(
    new Enemy({ position: { x: waypoints[0].x - xOffset, y: waypoints[0].y } })
  ); // Create a new enemy and push it to the array
}

function animate() {
  requestAnimationFrame(animate); // Request the next animation frame

  c.drawImage(image, 0, 0); // Draw the game map image on the canvas
  enemies.forEach((enemy) => enemy.update()); // Update and draw each enemy
}

animate(); // Start the animation
