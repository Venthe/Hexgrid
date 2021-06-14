const p5 = require('p5')

const toRadians = angleInDegrees => Math.PI / 180 * angleInDegrees;

class Hex {
  points = []
  width;
  diameter;
  radius;
  rotation;
  toSide;
  shift;
  hMult;
  vMult;
  origin;
  constructor(diameter, initialRotation, origin = { x: 0, y: 0 }) {
    this.diameter = diameter;
    // distance to point
    this.radius = diameter / 2;
    this.rotation = initialRotation;
    this.origin = origin;

    const createHex = i => this.hexCorner(
      this.origin, this.radius, i, initialRotation % 60
    );

    this.points = [...Array(6).keys()].map(createHex);
    // side size
    this.width = this.radius * sin(toRadians(30)) * 2;
    this.toSide = this.radius * cos(toRadians(30))
    this.hMult = Math.abs(Math.cos(toRadians(this.rotation * 3)))
    this.vMult = Math.abs(Math.sin(toRadians(this.rotation * 3)))
    const multiplier = (a, b) => a * this.toSide * 2 + b * (this.radius * 2);
    this.shift = {
      x: multiplier(this.vMult, this.hMult),
      y: multiplier(this.hMult, this.vMult),
      xOffset: this.hMult * (this.radius + this.width / 2) + this.vMult * this.toSide,
      yOffset: this.hMult * 1 + this.vMult * (-(this.radius - this.width / 2))
    }
  }

  getTranslation(column, row) {
    return {
      x: column * this.shift.x + this.vMult * this.toSide
        * (row % 2 === 1 ? 1 : 0) + this.hMult * (-this.radius / 2) * column,
      y: row * this.shift.y + this.vMult * (-this.radius / 2) * row
        + this.hMult * (column % 2 === 1 ? 1 : 0) * (this.toSide)
    }
  }

  getPoints(column, row) {
    const translation = this.getTranslation(column, row)
    return this.points.map(({x, y})=>({x: x+translation.x, y:y+translation.y}))
  }

  getOrigin(column, row) {
    const translation = this.getTranslation(column, row)
    return {x: this.origin.x + translation.x, y: this.origin.y + translation.y}
  }

  hexCorner(center, size, i, rotation) {
    let angle = toRadians(rotation + 60 * i);
    return {
      x: center.x + size * Math.cos(angle),
      y: center.y + size * Math.sin(angle),
    };
  }
}

const sketch = () => {

  let rotationSlider;
  let nSlider;
  let amountSlider;

  function drawHexes(diameter, rotation, n, dimensions) {

    push();
    for (let currentColumn = 0; currentColumn < dimensions[0]; currentColumn++) {
      for (let currentRow = 0; currentRow < dimensions[1]; currentRow++) {
        const hex = new Hex(diameter, rotation);

        beginShape();
        hex.getPoints(currentColumn, currentRow)
           .forEach(({ x, y }) => vertex(x, y));
        endShape(CLOSE);
        const {x, y} = hex.getOrigin(currentColumn, currentRow)
        const d = text(`${currentColumn}, ${currentRow}`, x, y)
      }
    }
    pop();
    //line(0,0,10,10)
  }

  setup = () => {
    createCanvas(800, 500);

    rotationSlider = createSlider(0, 360, 0);
    rotationSlider.position(0, 0);
    rotationSlider.style('width', `${(width / 3) - 10}px`);
    nSlider = createSlider(1, 12, 6);
    nSlider.position(width / 3, 0);
    nSlider.style('width', `${(width / 3) - 10}px`);
    amountSlider = createSlider(1, 50, 4);
    amountSlider.position(width / 3 * 2, 0);
    amountSlider.style('width', `${(width / 3) - 10}px`);
  };

  draw = () => {
    let rotation = rotationSlider.value();
    let n = nSlider.value();
    let amount = amountSlider.value();
    background(220);
    text(rotation, 0, 30)
    text(n, width / 3, 30)
    text(amount, width * 2 / 3, 30)
    translate(100, 100);
    drawHexes(60, rotation, n, [amount, amount]);
    push()
    translate(width / 2, 0)
    drawHexes(60, rotation + 30, n, [amount, amount]);
    pop()
  }
}

new p5(context => sketch.bind(context)());
