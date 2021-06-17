import p5 from "p5";
import { Hex } from "./Hex";

const sketch = (context: p5) => {

  let rotationSlider: Element | any;
  let nSlider: Element | any;
  let amountSlider: Element | any;

  function drawHexes(diameter: number, rotation: number, n: number, dimensions: number[]) {

    context.push();
    for (let currentColumn = 0; currentColumn < dimensions[0]; currentColumn++) {
      for (let currentRow = 0; currentRow < dimensions[1]; currentRow++) {
        const hex = new Hex(diameter, rotation);

        context.beginShape();
        hex.getPoints(currentColumn, currentRow)
          .forEach(({ x, y }) => context.vertex(x, y));
          context.endShape(context.CLOSE);
        const { x, y } = hex.getOrigin(currentColumn, currentRow)
        const d = context.text(`${currentColumn}, ${currentRow}`, x, y)
      }
    }
    context.pop();
    //line(0,0,10,10)
  }

  context.setup = () => {
    context.createCanvas(800, 500);

    rotationSlider = context.createSlider(0, 360, 0);
    rotationSlider.position(0, 0);
    rotationSlider.style('width', `${(context.width / 3) - 10}px`);
    nSlider = context.createSlider(1, 12, 6);
    nSlider.position(context.width / 3, 0);
    nSlider.style('width', `${(context.width / 3) - 10}px`);
    amountSlider = context.createSlider(1, 50, 4);
    amountSlider.position(context.width / 3 * 2, 0);
    amountSlider.style('width', `${(context.width / 3) - 10}px`);
  };

  context.draw = () => {
    let rotation = rotationSlider.value();
    let n = nSlider.value();
    let amount = amountSlider.value();
    context.background(220);
    context.text(rotation, 0, 30)
    context.text(n, context.width / 3, 30)
    context.text(amount, context.width * 2 / 3, 30)
    context.translate(100, 100);
    drawHexes(60, rotation, n, [amount, amount]);
    context.push()
    context.translate(context.width / 2, 0)
    drawHexes(60, rotation + 30, n, [amount, amount]);
    context.pop()
  }
}

export const startP5 = () => new p5(sketch);
