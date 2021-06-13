const maxColumns = 5;
const maxRows = 5;
const diameter = 60;
const marginTop = 50;
const marginLeft = 50;
const radius = diameter / 2;
const rotation = 0;
const offset = radius / 3;

const toRadians = (angleInDegrees) => (PI / 180) * angleInDegrees;


function hexCorner(center, size, i, rotation = 0) {
  let angle_deg = rotation + 60 * i;
  let angle_rad = toRadians(angle_deg);
  return {
    x: center.x + size * cos(angle_rad),
    y: center.y + size * sin(angle_rad),
  };
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  push();
  translate(marginLeft, marginTop);
  for (let currentColumn = 0; currentColumn < maxColumns; currentColumn++) {
    for (let currentRow = 0; currentRow < maxColumns; currentRow++) {
      push();
      translate(currentColumn * diameter, currentRow * diameter);
      const points = [0, 1, 2, 3, 4, 5].map((i) =>
        hexCorner(
          {
            x: 0,
            y: 0,
          },
          radius,
          i,
          rotation
        )
      );

      // height
      const height = diameter;
      // line(offset,-radius, offset, radius)

      // size
      const size = radius;
      // line(0,-radius, 0, 0)
      // line(0,0, points[3].x, points[3].y)

      // width
      const width = radius * sin(toRadians(60));
      // line(0, offset, width, offset)

      // shift X
      const shiftX = radius* sin(toRadians(30 + rotation)) - width;

      // shift Y
      const shiftYOffset = sin(toRadians(30 )) * radius;
      const shiftY = radius - shiftYOffset;
      // line(0, shiftYOffset, 0, shiftYOffset+ shiftY)

      translate(-shiftX * currentColumn * 2, -shiftY * currentRow);
      if (currentRow % 2 === 1) translate(width, 0);

      beginShape();
      points.forEach(({ x, y }) => vertex(x, y));
      endShape(CLOSE);

      text(`${currentColumn},${currentRow}`, 0, 0);
      pop();
    }
  }
  pop();
  //line(0,0,10,10)
}
