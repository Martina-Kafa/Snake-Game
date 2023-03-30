// Get the canvas element and its context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set the size of the snake and the canvas grid
const size = 16;
const gridSize = canvas.width / size;

// Set the focus on the canvas element when the page loads
window.onload = function () {
  canvas.focus();
}; //IT IS NOT WORKING :/

// Set the initial position and direction of the snake
let worm = [{ x: 0, y: 5 }];
let direction = "right";

// Set the initial position of the food
let food = {
  x: Math.floor(Math.random() * gridSize),
  y: Math.floor(Math.random() * gridSize),
};

// Set the game loop interval
const interval = setInterval(() => {
  // Move the snake in the current direction
  let head = { x: worm[0].x, y: worm[0].y };
  switch (direction) {
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
    case "left":
      head.x--;
      break;
    case "right":
      head.x++;
      break;
  }

  // Check if the snake has collided with the canvas walls or itself
  // 1. head.x < 0: This checks if the x-coordinate of the snake's head is less than 0, which means the head has collided with the left edge of the game board.
  // 2. head.x >= gridSize: This checks if the x-coordinate of the snake's head is greater than or equal to the gridSize, which means the head has collided with the right edge of the game board.
  // 3. head.y < 0: This checks if the y-coordinate of the snake's head is less than 0, which means the head has collided with the top edge of the game board.
  // 4. head.y >= gridSize: This checks if the y-coordinate of the snake's head is greater than or equal to the gridSize, which means the head has collided with the bottom edge of the game board.
  // snake.some((segment) => segment.x === head.x && segment.y === head.y): This checks if any segment of the snake's body (other than the head) has the same coordinates as the head. If this condition is true, it means the snake has collided with itself.
  if (
    head.x < 0 ||
    head.x >= gridSize ||
    head.y < 0 ||
    head.y >= gridSize ||
    worm.some((segment) => segment.x === head.x && segment.y === head.y)
  ) {
    clearInterval(interval);
    alert("Game over!");
    location.reload(); // Reload the page
  } else {
    // The head object is added to the beginning of the snake array using the unshift() method, which represents the snake moving one unit in the current direction. If the head of the snake is on the same square as the food, the food is randomly regenerated on the game board.
    // Add the new head to the snake and remove the tail if it didn't eat the food
    worm.unshift(head);
    if (head.x === food.x && head.y === food.y) {
      food = {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize),
      };
    } else {
      worm.pop();
    }

    // Clear the canvas and draw the snake and food
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "hotpink";
    worm.forEach((segment) => {
      ctx.beginPath();
      ctx.arc(
        segment.x * size + size / 2,
        segment.y * size + size / 2,
        size / 2,
        0,
        Math.PI * 2
      );
      ctx.fill();
    });
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(
      food.x * size + size / 2,
      food.y * size + size / 2,
      size / 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
}, 100);
// This code block is responsible for drawing the snake and the food on the game board. Here's a breakdown of what each line does:
// 1. ctx.clearRect(0, 0, canvas.width, canvas.height);: This clears the canvas so that the previous frame's drawing is removed, making way for the new frame's drawing.
// 2. ctx.fillStyle = "hotpink";: This sets the fill color for the snake segments to hot pink.
// snake.forEach((segment) => { ... });: This loops through each segment of the snake and draws it on the canvas as a circle using the ctx.arc() method.
// 3. ctx.beginPath();: This begins a new path on the canvas, which is necessary for drawing a new shape.
// 4. ctx.arc(segment.x * size + size / 2, segment.y * size + size / 2, size / 2, 0, Math.PI * 2);: This draws a circle on the canvas at the location of the current snake segment. The x and y coordinates are calculated using the segment's position and the size of each cell on the game board. The size / 2 argument specifies the radius of the circle, and the 0 and Math.PI * 2 arguments specify the starting and ending angles for the circle.
// 5. ctx.fill();: This fills the current path on the canvas with the fill color specified earlier, which in this case is hot pink.
// 6. ctx.fillStyle = "red";: This sets the fill color for the food to red.
// 7. ctx.beginPath();: This begins a new path on the canvas, which is necessary for drawing a new shape.
// 8. ctx.arc(food.x * size + size / 2, food.y * size + size / 2, size / 2, 0, Math.PI * 2);: This draws a circle on the canvas at the location of the current food item. The x and y coordinates are calculated using the food's position and the size of each cell on the game board. The size / 2 argument specifies the radius of the circle, and the 0 and Math.PI * 2 arguments specify the starting and ending angles for the circle.
// 9. ctx.fill();: This fills the current path on the canvas with the fill color specified earlier, which in this case is red.
// By calling this code block repeatedly in the game loop, the snake and food are constantly updated and redrawn on the canvas to reflect the current state of the game.

// Change the direction of the snake based on keyboard input
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      if (direction !== "down") {
        direction = "up";
      }
      break;
    case "ArrowDown":
      if (direction !== "up") {
        direction = "down";
      }
      break;
    case "ArrowLeft":
      if (direction !== "right") {
        direction = "left";
      }
      break;
    case "ArrowRight":
      if (direction !== "left") {
        direction = "right";
      }
      break;
  }
});
