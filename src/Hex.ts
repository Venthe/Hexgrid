import { toRadians } from "./Math";

export interface Point {
    x: number;
    y: number;
}

export class Hex {
    points: Point[] = []
    width: number;
    diameter: number;
    radius: number;
    rotation: number;
    toSide: number;
    shift: Point & { xOffset: number, yOffset: number };
    hMult: number;
    vMult: number;
    constructor(scale: number, initialRotation: number, public origin: Point = { x: 0, y: 0 }) {
        this.diameter = 1;
        // distance to point
        this.radius = this.diameter / 2;
        this.rotation = initialRotation;
        this.origin = origin;

        const createHex = (i: any) => this.hexCorner(
            this.origin, this.radius, i, initialRotation % 60
        );

        this.points = [0, 1, 2, 3, 4, 5].map(createHex);
        // side size
        this.width = this.radius * Math.sin(toRadians(30)) * 2;
        this.toSide = this.radius * Math.cos(toRadians(30))
        this.hMult = Math.abs(Math.cos(toRadians(this.rotation * 3)))
        this.vMult = Math.abs(Math.sin(toRadians(this.rotation * 3)))
        const multiplier = (a: number, b: number) => a * this.toSide * 2 + b * (this.radius * 2);
        this.shift = {
            x: multiplier(this.vMult, this.hMult),
            y: multiplier(this.hMult, this.vMult),
            xOffset: this.hMult * (this.radius + this.width / 2) + this.vMult * this.toSide,
            yOffset: this.hMult * 1 + this.vMult * (-(this.radius - this.width / 2))
        }
    }

    getTranslation(column: number, row: number) {
        return {
            x: column * this.shift.x + this.vMult * this.toSide
                * (row % 2 === 1 ? 1 : 0) + this.hMult * (-this.radius / 2) * column,
            y: row * this.shift.y + this.vMult * (-this.radius / 2) * row
                + this.hMult * (column % 2 === 1 ? 1 : 0) * (this.toSide)
        }
    }

    getPoints() {
        const translation = this.getTranslation(this.origin.x, this.origin.y)
        return this.points.map(({ x, y }) => ({ x: x + translation.x, y: y + translation.y }))
    }

    getOrigin() {
        const translation = this.getTranslation(this.origin.x, this.origin.y)
        return { x: this.origin.x + translation.x, y: this.origin.y + translation.y }
    }

    draw(f: (points: Point[], origin: Point) => void, scale: number = 1) {
        f(
            this.getPoints().map(({ x, y }) => ({ x: x * scale, y: y * scale })),
            { x: this.origin.x * scale, y: this.origin.y * scale }
        );
    }

    hexCorner(center: { x: any; y: any; }, size: number, i: number, rotation: number) {
        let angle = toRadians(rotation + 60 * i);
        return {
            x: center.x + size * Math.cos(angle),
            y: center.y + size * Math.sin(angle),
        };
    }
}