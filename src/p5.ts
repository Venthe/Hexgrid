import p5 from "p5";
import { Grid } from "./Grid";
import { Hex, Point } from "./Hex";

const sketch = (context: p5) => {

  let rotationSlider: Element | any;
  let amountSlider: Element | any;

  function drawHexes(diameter: number, rotation: number, dimensions: Point) {

    new Grid(dimensions.x, dimensions.y, rotation, diameter)
      .getFlatGrid()
      .forEach(hex => {

        context.beginShape();
        hex.getPoints()
          .forEach(({ x, y }) => context.vertex(x, y));
        context.endShape(context.CLOSE);
        const { x, y } = hex.getOrigin()
        context.line(x, y, context.mouseX, context.mouseY);
        // context.text(`${hex.getOrigin().x}, ${hex.getOrigin().y}`, x, y)
      });
  }

  context.setup = () => {
    context.createCanvas(800, 500);

    rotationSlider = context.createSlider(0, 360, 0);
    rotationSlider.position(0, 0);
    rotationSlider.style('width', `${(context.width / 3) - 10}px`);
    amountSlider = context.createSlider(1, 50, 4);
    amountSlider.position(context.width / 3 * 2, 0);
    amountSlider.style('width', `${(context.width / 3) - 10}px`);
  };

  context.draw = () => {
    let rotation = rotationSlider.value();
    let amount = amountSlider.value();
    context.background(220);
    context.text(rotation, 0, 30)
    context.text(amount, context.width * 2 / 3, 30)
    drawHexes(60, rotation, {x: amount, y: amount});
  }
}

export const startP5 = () => new p5(sketch);
