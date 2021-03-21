import { Cell } from "../models/cell";
import Engine from "./engine";


export default class AI {


    constructor() {

    }

    solve(board: number[][]) {
        const engine: Engine = new Engine();
        engine.setBoard(board);
        let origin = engine.getOrigin();
        let cluster = engine.getCluster(origin);
        let steps = 0;
        const history = [];

        while (!engine.checkWin()) {
            const color = this.getMostFrequentColor(cluster.differentColoredAdjacents).val;
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

    getMostFrequentColor(cells: Cell[]) {
        return cells.sort((a, b) =>
            cells.filter(v => v.val === a.val).length
            - cells.filter(v => v.val === b.val).length
        ).pop();
    }

}