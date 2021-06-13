const p5 = require('p5')

const toRadians = angleInDegrees => (Math.PI / 180.000) * angleInDegrees;

class NGon {
  points = []
  width;
  diameter;
  radius;
  rotation;
  N;
  constructor(diameter, rotation, N = 6) {

    const createHex = (i) => this.hexCorner(
      {
        x: 0,
        y: 0,
      },
      diameter /2,
      i,
      rotation % (360 / N)
    );

    this.N = N;
    this.points = [...Array(N).keys()].map(createHex);
    this.diameter = diameter;
    // distance to point
    this.radius = diameter / 2;
    // side size
    this.width = this.radius * sin(toRadians(30)) * 2;
    this.rotation = rotation;
  }

  hexCorner(center, size, i, rotation) {
    let angle_deg = rotation + (360 / this.N) * i;
    let angle_rad = toRadians(angle_deg);
    return {
      x: center.x + size * Math.cos(angle_rad),
      y: center.y + size * Math.sin(angle_rad),
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
        push();
        const hex = new NGon(diameter, rotation, n);
        const shift = {
          x: currentColumn * hex.radius * sin(toRadians(360 / n) + Math.abs(toRadians((hex.rotation - (360/2/n)) % (360/n)))) * 2,
          y: currentRow * hex.radius * sin(toRadians(360 / n) + Math.abs(toRadians(hex.rotation % (360 / n)))) * 2
        }
        translate(shift.x, shift.y);

        // translate(hex.width * currentColumn, -hex.width * currentRow)
        if (currentRow % 2 === 1) {
          translate(hex.width* sin(toRadians(360 / n) + Math.abs(toRadians((hex.rotation - (360/2/n)) % (360/n)))),0);
        }

        beginShape();
        hex.points.forEach(({ x, y }) => vertex(x, y));
        endShape(CLOSE);

        text(`${currentColumn},${currentRow},${hex.rotation}`, 0, 0);
        pop();
      }
    }
    pop();
    //line(0,0,10,10)
  }

  setup = () => {
    createCanvas(800, 500);

    rotationSlider = createSlider(0, 360, 0);
    rotationSlider.position(0, 0);
    rotationSlider.style('width', `${(width/3)-10}px`);
    nSlider = createSlider(1, 12, 6);
    nSlider.position(width/3, 0);
    nSlider.style('width', `${(width/3)-10}px`);
    amountSlider = createSlider(1, 50, 4);
    amountSlider.position(width/3*2, 0);
    amountSlider.style('width', `${(width/3)-10}px`);
  };

  draw = () => {
    let rotation = rotationSlider.value();
    let n = nSlider.value();
    let amount = amountSlider.value();
    background(220);
    translate(100, 100);
    drawHexes(60, rotation, n, [amount,amount]);
    push()
    translate(width / 2, 0)
    drawHexes(60, rotation + 30, n, [amount,amount]);
    pop()
  }
}

new p5(context => sketch.bind(context)());
