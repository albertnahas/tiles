"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const engine_1 = __importDefault(require("./engine"));
class AI {
    constructor() {
    }
    solve(board) {
        const engine = new engine_1.default();
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
        };
    }
    getMostFrequentColor(cells) {
        return cells.sort((a, b) => cells.filter(v => v.val === a.val).length
            - cells.filter(v => v.val === b.val).length).pop();
    }
}
exports.default = AI;
//# sourceMappingURL=ai.js.map