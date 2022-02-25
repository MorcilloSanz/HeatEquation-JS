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
      const conductivity = 0.02;
      const temperature = 0;
      if(i == 0 || j == 0 || i == this.n - 1 || j == this.m - 1)
        square = new Square(0 + (i * this.squareWidth), 0 + (j * this.squareHeight), 0, 0);
      else
        square = new Square(0 + (i * this.squareWidth), 0 + (j * this.squareHeight), conductivity, temperature);
      if(square != null)
        this.squares.push(square);
    }
  }
  
  this.applyDiffusion = function() {
    
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
        let temperatureNorth = this.getSquare(i, j - 1).temperature;
        let temperatureSouth = this.getSquare(i, j + 1).temperature;
        let temperatureWest = this.getSquare(i - 1, j).temperature;
        let temperatureEast = this.getSquare(i + 1, j).temperature;
        
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
        fill(70, 70, 70);
      else
        fill(r, g, b);
      
      stroke(33, 33, 33);
      rect(this.squares[i].x, this.squares[i].y, this.squareWidth, this.squareHeight);
    }
    
  }
  
  this.getSquare = function(x, y) {
    return this.squares[x + y * this.n];
  }
}

var scalarField = null;

function setup() {
  createCanvas(600, 600);

  const squareSize = 20;
  scalarField = new ScalarField(width / squareSize, height / squareSize, squareSize, squareSize);
  
  // Start point
  scalarField.getSquare(8, 15).temperature = 1;
  
  // Create wall
  for(let j = 8; j < height / squareSize - 8; j ++)
    scalarField.getSquare(15, j).conductivity = 0;
}

function draw() {
  background(220);
  
  if(scalarField != null) {
    scalarField.draw();
    scalarField.applyDiffusion();
  }
}