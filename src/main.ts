import "./style.css";
// import { data } from "./data";
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
let previousMouse = { x: 0, y: 0 };
let currentMouse = { x: 0, y: 0 };
let hue = 0;
// let theta = 0;
// 9853

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const init = async () => {
  for (let i = 0; i < 5000; i++) {
    await sleep(10);
    if (previousMouse.x !== 0) {
      currentMouse.x = previousMouse.x;
      currentMouse.y = previousMouse.y;
    }

    if (previousMouse.x === 0) {
      currentMouse.x = canvas.width / 2;
      currentMouse.y = canvas.height / 2;
      previousMouse.x = currentMouse.x;
      previousMouse.y = currentMouse.y;
    }

    //  if (data[i] === 0) theta = 100;
    //  if (data[i] === 1) theta = 10;
    //  if (data[i] === 2) theta = 20;
    //  if (data[i] === 3) theta = 30;
    //  if (data[i] === 4) theta = 40;
    //  if (data[i] === 5) theta = 50;
    //  if (data[i] === 6) theta = 60;
    //  if (data[i] === 7) theta = 7;
    //  if (data[i] === 8) theta = 80;
    //  if (data[i] === 9) theta = 90;

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
    let theta = Math.random() * 180;
    let r = 20;

    ctx.beginPath();
    ctx.strokeStyle = "hsl(" + hue + ", 100%, 50%)";
    ctx.moveTo(this.currMouseX, this.currMouseY);
    ctx.lineTo(
      this.currMouseX + r * Math.cos(theta),
      this.currMouseY + r * Math.sin(theta)
    );
    ctx.lineTo(this.prevMouseX, this.prevMouseY);
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();
    ctx.save();

    ctx.beginPath();
    ctx.fillStyle = "hsl(" + hue + ", 100%, 50%)";
    ctx.arc(this.currMouseX, this.currMouseY, 3, 0, Math.PI * 2);
    ctx.fill();

    previousMouse.x = this.currMouseX + r * Math.cos(theta);
    previousMouse.y = this.currMouseY + r * Math.sin(theta);
  }
}

init();

export function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
