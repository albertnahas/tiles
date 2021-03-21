"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Engine {
    constructor(dimensions, colors) {
        if (dimensions && colors) {
            this.board = this.generateBoard(dimensions, colors);
        }
    }
    setBoard(board) {
        this.board = board;
    }
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
    getOrigin() {
        return {
            x: 0,
            y: 0,
            val: this.board[0][0]
        };
    }
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
    setOriginAndAdjacents(color) {
        const origin = this.getOrigin();
        this.board[origin.y][origin.x] = color;
        this.convertAdjacents(origin, color, origin.val);
        return this.board;
    }
    getAdjacents(y, x) {
        return [
            this.getCell(y - 1, x),
            this.getCell(y, x + 1),
            this.getCell(y + 1, x),
            this.getCell(y, x - 1),
        ].filter((c) => c.val !== undefined);
    }
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
                // visited = visited.concat(cluster);
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
    getColorsCount() {
        let array = [];
        for (const row of this.board) {
            array = array.concat(row);
        }
        const unique = [...new Set(array)];
        return unique.length;
    }
    cloneBoard() {
        const board = this.board.map((arr) => {
            return arr.slice();
        });
        return board;
    }
    checkWin() {
        const color = this.getOrigin().val;
        return this.board.filter((row) => row.every(col => col === color)).length === this.board.length;
    }
    toString() {
        let stringArr = '';
        for (const row of this.board) {
            for (const col of row) {
                stringArr += ` ${row[col]}`;
            }
            stringArr += `\n`;
        }
        return stringArr;
        return this.board;
    }
}
exports.default = Engine;
//# sourceMappingURL=engine.js.map