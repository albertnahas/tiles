"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Engine {
    constructor(dimensions, colors) {
        if (dimensions && colors && dimensions > 1 && colors > 1) {
            this.board = this.generateBoard(dimensions, colors);
            // avoid generating a won board
            while (this.checkWin()) {
                this.board = this.generateBoard(dimensions, colors);
            }
        }
    }
    // Set the board after initialize
    setBoard(board) {
        this.board = board;
    }
    // Returns the value of a cell (coordinates and color)
    getCell(y, x) {
        return {
            x,
            y,
            val: y >= 0
                && x >= 0
                && x < this.board.length
                && y < this.board.length ?
                this.board[y][x] : undefined
        };
    }
    // Returns the origin cell at the top left corner
    getOrigin() {
        return {
            x: 0,
            y: 0,
            val: this.board[0][0]
        };
    }
    // Generate a new board randomly based on dimensions and colors count
    generateBoard(dimensions, colors) {
        const arr = [];
        for (let i = 0; i < dimensions; i++) {
            arr[i] = [];
            for (let j = 0; j < dimensions; j++) {
                arr[i][j] = (Math.random() * colors | 0);
            }
        }
        return arr;
    }
    // Change the origin cell color and convert adjacent cell to the same color
    setOriginAndAdjacents(color) {
        const origin = this.getOrigin();
        this.board[origin.y][origin.x] = color;
        this.convertAdjacents(origin, color, origin.val);
        return this.board;
    }
    // Returns all direct adjacent cells
    getAdjacents(y, x) {
        return [
            this.getCell(y - 1, x),
            this.getCell(y, x + 1),
            this.getCell(y + 1, x),
            this.getCell(y, x - 1),
        ].filter((c) => c.val !== undefined);
    }
    // Convert adjacent cells to targetColor
    convertAdjacents(cell, color, tagetColor, visited = []) {
        if (this.checkWin())
            return;
        for (const adj of this.getAdjacents(cell.y, cell.x)) {
            if (!visited.filter((c) => c.x === adj.x && c.y === adj.y).length &&
                adj.val === tagetColor) {
                this.board[adj.y][adj.x] = color;
                visited.push(adj);
                this.convertAdjacents(adj, color, tagetColor, visited);
            }
        }
    }
    // Returns all cells that has path with the passed cell
    // including cells of the same color and different colors on the cluster edges
    getCluster(cell, visited = []) {
        const color = cell.val;
        let cluster = [];
        let neighbors = [];
        cluster.push(cell);
        visited.push(cell);
        const adjacents = this.getAdjacents(cell.y, cell.x);
        for (const adj of adjacents) {
            const isVisited = visited.filter((c) => c.x === adj.x && c.y === adj.y).length;
            if (!isVisited && adj.val === color) {
                const { sameColoredAdjancents, differentColoredAdjacents } = this.getCluster(adj, visited);
                cluster = cluster.concat(sameColoredAdjancents);
                neighbors = neighbors.concat(differentColoredAdjacents);
            }
            else if (!isVisited) {
                neighbors.push(adj);
            }
        }
        return {
            sameColoredAdjancents: cluster,
            differentColoredAdjacents: neighbors
        };
    }
    // Get the number of colors on the board
    getColorsCount() {
        let array = [];
        for (const row of this.board) {
            array = array.concat(row);
        }
        const unique = [...new Set(array)];
        return unique.length;
    }
    // Get the number of occurences for one color
    getColorOccurences(color) {
        let array = [];
        for (const row of this.board) {
            array = array.concat(row);
        }
        return array.filter((c) => c === color).length;
    }
    // Return a copy of the current board
    cloneBoard() {
        const board = this.board.map((arr) => {
            return arr.slice();
        });
        return board;
    }
    // Test if the board has only one color left
    checkWin() {
        const color = this.getOrigin().val;
        return this.board.filter((row) => row.every(col => col === color)).length === this.board.length;
    }
}
exports.default = Engine;
//# sourceMappingURL=engine.js.map