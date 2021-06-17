import { Hex } from "./Hex";

export class Grid {
    grid: Hex[][];

    constructor(protected width: number,
        protected height: number,
        protected initialRotation: number = 0,
        protected initialDiameter: number = 30) {
        this.grid = !!!this.grid ? [] : this.grid;

        for (let currentColumn = 0; currentColumn < width; currentColumn++) {
            this.grid[currentColumn] = !!!this.grid[currentColumn] ? [] : this.grid[currentColumn];
            for (let currentRow = 0; currentRow < height; currentRow++) {
                this.grid[currentColumn][currentRow] = new Hex(initialDiameter, initialRotation, { x: currentColumn, y: currentRow });
            }

        }
    }

    getFlatGrid(): Hex[] {
        return this.grid.reduce((pv, cv) => [...pv, ...cv]);
    }
}
