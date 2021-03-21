import { Cell } from "../models/cell";
import Engine from "./engine";


export default class AI {


    constructor() {
    }

    // Solve a specific board with AI
    /* history: the steps of the soluction
     board: final board
     steps: how many steps it took to solve the board */
    solve(board: number[][]) {
        const engine: Engine = new Engine();
        engine.setBoard(board);
        let origin = engine.getOrigin();
        let cluster = engine.getCluster(origin);
        let steps = 0;
        const history = [];

        while (!engine.checkWin()) {
            const color = this.getMostFrequentAdjacentsColor(cluster.differentColoredAdjacents, engine);
            engine.setOriginAndAdjacents(color);
            origin = engine.getOrigin();
            cluster = engine.getCluster(origin);
            history.push(engine.cloneBoard());
            steps++;
        }
        return {
            history,
            board: engine.board,
            steps
        }
    }
    // Returns the most repeated color in array of Cells
    getMostFrequentAdjacentsColor(cells: Cell[], engine: Engine) {
        const colors = [...new Set(cells.map((c) => c.val))];
        let colorsFreq = colors.map((color) => {
            return {
                val: color,
                cells: [],
                frequencey: 0,
                boardFrequency: 0,
            }
        });

        for (const cell of cells) {
            const cluster = engine.getCluster(cell);
            const color = colorsFreq.filter((c) => c.val === cell.val)[0];
            if (color) {
                color.cells = color.cells.concat(cluster.differentColoredAdjacents)
            }
        }
        for (const color of colorsFreq) {
            color.frequencey = this.unique(color.cells, ['x', 'y']).length;
        }

        colorsFreq = colorsFreq.sort((a, b) => a.frequencey - b.frequencey);
        const topColor = colorsFreq[colorsFreq.length - 1];
        let topColors = colorsFreq.filter((c) => c.val === topColor.val);
        if (topColors.length === 1) {
            return topColor.val;
        }
        console.log('we have tie');
        for (const color of topColors) {
            color.boardFrequency = engine.getColorOccurences(color.val);
        }
        topColors = topColors.sort((a, b) => b.boardFrequency - a.boardFrequency);
        return topColors.pop().val
    }

    unique(arr: any[], keyProps: any[]) {
        return Object.values(arr.reduce((uniqueMap, entry) => {
            const key = keyProps.map(k => entry[k]).join('|');
            if (!(key in uniqueMap)) uniqueMap[key] = entry;
            return uniqueMap;
        }, {}));
    }

}