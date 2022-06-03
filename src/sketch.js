/*
  Isotropic Diffusion, as well known as Heat Equation

  Dev: MorcilloSanz
  Email: amorcillosanz@gmail.com
  GitHub: https://github.com/MorcilloSanz
*/

const conductivity = 0.02;

function Square(x, y, conductivity, temperature) {
  
  this.x = x;
  this.y = y;
  this.conductivity = conductivity;
  this.temperature = temperature;
}

// n columns, m rows, squareWidth and squareHeight
function ScalarField(n, m, squareWidth, squareHeight) {
  
  this.n = n;
  this.m = m;
  this.squareWidth = squareWidth;
  this.squareHeight = squareHeight;
  this.squares = [];
  
  // Initialize every square - Boundary conditions, border -> conductivity = 0
  for(let j = 0; j < this.m; j ++) {
    for(let i = 0; i < this.n; i ++) {
      let square = null;
      const temperature = 0;
      if(i == 0 || j == 0 || i == this.n - 1 || j == this.m - 1)
        square = new Square(0 + (i * this.squareWidth), 0 + (j * this.squareHeight), 0, 0);
      else
        square = new Square(0 + (i * this.squareWidth), 0 + (j * this.squareHeight), conductivity, temperature);
      if(square != null)
        this.squares.push(square);
    }
  }
  
  this.applyDiffusion = function(cooling) {
    
    const dx = 1, dt = 1;
    
    for(let i = 0; i < this.n; i ++) {
      for(let j = 0; j < this.m; j ++) {
        
        let currentSquare = this.getSquare(i, j);
        
        // Boundary conditions
        if(i == 0 || j == 0 || i == this.n - 1 || j == this.m - 1) {
          currentSquare.temperature = 0;
          continue;
        }
        
        // Square lattice
        let temp = 0;
        if(cooling) temp = currentSquare.temperature;
        
        let temperatureNorth = this.getSquare(i, j - 1).temperature - temp;
        let temperatureSouth = this.getSquare(i, j + 1).temperature - temp;
        let temperatureWest = this.getSquare(i - 1, j).temperature - temp;
        let temperatureEast = this.getSquare(i + 1, j).temperature - temp;
        
        // Diffusion
        let alpha = (currentSquare.conductivity * dt) / (2 * dx * dx);
        let newTemperature = currentSquare.temperature + alpha * (temperatureNorth + temperatureSouth + temperatureEast + temperatureWest);
        currentSquare.temperature = newTemperature;
        
      }
    }
  }
  
  this.draw = function() {
    
    // Draw temperature
    for(let i = 0; i < this.squares.length; i ++) {
      let temperature = this.squares[i].temperature;
      
      // Calculate colors
      let r = 2 * temperature;
      let g = (r / 255) * (255 / 2);
      let b = 0;
      if(temperature > 255)
        r = g = b = 255;
      
      // Draw
      if(this.squares[i].conductivity == 0)
        fill(40, 40, 40);
      else
        fill(r, g, b);
      
      stroke(40, 40, 40);
      rect(this.squares[i].x, this.squares[i].y, this.squareWidth, this.squareHeight);
    }
    
  }
  
  this.getSquare = function(x, y) {
    return this.squares[x + y * this.n];
  }
}

const squareSize = 20;
var scalarField = null;

function initDiffusion() {
  scalarField = new ScalarField(width / squareSize, height / squareSize, squareSize, squareSize);
  
  // Create obstacles
  for(let j = 5; j < height / squareSize - 5; j ++) {
    scalarField.getSquare(13, j).conductivity = 0;
    scalarField.getSquare(15, j).conductivity = 0;
  }
  scalarField.getSquare(13, 15).conductivity = conductivity;
  scalarField.getSquare(15, 15).conductivity = conductivity;
  
  for(let i = 14; i < scalarField.n; i ++) {
    scalarField.getSquare(i, 6).conductivity = 0;
    scalarField.getSquare(i, scalarField.m -1 - 6).conductivity = 0;
  }
}

function drawPointer() {
  if(scalarField != null) {
    let x = floor(mouseX / squareSize);
    let y = floor(mouseY / squareSize);
    if(x >= 0 && x < scalarField.n && y >= 0 && y < scalarField.m) {
      let square = scalarField.getSquare(x, y);
      stroke(0, 255, 0);
      //point(square.x + squareSize / 2, square.y + squareSize / 2);
      const r = 5;
      circle(square.x + squareSize / 2, square.y + squareSize / 2, r);
    }
    
  }
}

// If cooling enabled, initial temperature is warmer (obviously)
let cooling = false;
const DEFAULT_TEMPERATURE = 25;
const COOLING_TEMPERATURE = 2500;

function setup() {
  createCanvas(620, 620);
  initDiffusion();
}

function draw() {
  background(220);
  
  if(scalarField != null) {
    scalarField.draw();
    scalarField.applyDiffusion(cooling);
  }
  
  drawPointer();
  
  fill(255);
  stroke(0);
  text("Press R in order to reset diffusion", 20, 30);
  text("Press C in order to enable/disable cooling: " + cooling, 20, 50);
  text("Click in order to apply temperature", 20, 70);
}

function keyPressed() {
  if(key == "R" || key == "r")  
    initDiffusion();
  else if(key == "C" || key == "c") {
    cooling = !cooling;
    initDiffusion();
  }
}

function mousePressed() {
  // Apply temperature
  let x = floor(mouseX / squareSize);
  let y = floor(mouseY / squareSize);
  if(x >= 0 && x < scalarField.n && y >= 0 && y < scalarField.m) {
    if(scalarField.getSquare(x, y).conductivity > 0)
    scalarField.getSquare(x, y).temperature = (!cooling) ? DEFAULT_TEMPERATURE : COOLING_TEMPERATURE;
  }
}
