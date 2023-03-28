import "./style.css";
import { data } from "./data";
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
let previousMouse = { x: 0, y: 0 };
let currentMouse = { x: 0, y: 0 };
let hue = 0;
let theta = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const init = async () => {
  const angle = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

  for (let i = 0; i < 9800; i++) {
    await sleep(0);

    if (previousMouse.x !== 0) {
      currentMouse.x = previousMouse.x;
      currentMouse.y = previousMouse.y;
    }

    if (previousMouse.x === 0) {
      currentMouse.x = 0;
      currentMouse.y = 0;
      previousMouse.x = currentMouse.x;
      previousMouse.y = currentMouse.y;
    }

    theta = angle[data[i]];
    let path = new TracePath();
    path.draw();
    hue += 0.2;
  }
};

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

class TracePath {
  prevMouseX: number;
  prevMouseY: number;
  currMouseX: number;
  currMouseY: number;

  constructor() {
    this.prevMouseX = previousMouse.x;
    this.prevMouseY = previousMouse.y;
    this.currMouseX = currentMouse.x;
    this.currMouseY = currentMouse.y;
  }

  draw() {
    let r = 25;
    let newCoordinateX = this.currMouseX + r * Math.cos(theta);
    let newCoordinateY = this.currMouseY + r * Math.sin(theta);

    ctx.beginPath();
    ctx.strokeStyle = "hsl(" + hue + ", 100%, 50%)";
    ctx.moveTo(this.currMouseX, this.currMouseY);
    
    // avoiding messing up with the borders of the canvas
    if (newCoordinateX < 0 || newCoordinateX >= canvas.width) {
      (newCoordinateX < 0) ?  newCoordinateX= -newCoordinateX : newCoordinateX -= r; 
    }

    if (newCoordinateY < 0 || newCoordinateY >= canvas.height) {
      (newCoordinateY < 0) ? newCoordinateY= -newCoordinateY : newCoordinateY -= r; 
    }

    ctx.lineTo(newCoordinateX, newCoordinateY);
    ctx.lineTo(this.prevMouseX, this.prevMouseY);
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
    ctx.save();

    ctx.beginPath();
    ctx.fillStyle = "hsl(" + hue + ", 100%, 50%)";
    ctx.arc(this.currMouseX, this.currMouseY, 3.5, 0, Math.PI * 2);
    ctx.fill();

    previousMouse.x = newCoordinateX;
    previousMouse.y = newCoordinateY;
  }
}

export function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

init();

