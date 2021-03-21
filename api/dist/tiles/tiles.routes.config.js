"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TilesRoutes = void 0;
const common_routes_config_1 = require("../common/common.routes.config");
const engine_1 = __importDefault(require("../engine/engine"));
const ai_1 = __importDefault(require("../engine/ai"));
class TilesRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'UsersRoutes');
    }
    configureRoutes() {
        // get board by dimensions and colors count
        this.app.route(`/tiles/:dimensions/:colors`)
            .get((req, res) => {
            const dimensions = parseInt(req.params.dimensions, 10);
            const colors = parseInt(req.params.colors, 10);
            const engine = new engine_1.default(dimensions, colors);
            const message = engine.toString();
            res.status(200).send(engine.board);
        });
        // submit selected color and return the new board
        this.app.route(`/tiles`)
            .post((req, res) => {
            const color = parseInt(req.body.color, 10);
            const board = req.body.board;
            const engine = new engine_1.default();
            engine.setBoard(board);
            engine.setOriginAndAdjacents(color);
            res.status(200).send({
                board: engine.board,
                won: engine.checkWin()
            });
        });
        // solve the board with AI
        this.app.route(`/solve`)
            .post((req, res) => {
            const board = req.body.board;
            const engine = new engine_1.default();
            engine.setBoard(board);
            const ai = new ai_1.default();
            const result = ai.solve(engine.board);
            res.status(200).send(result);
        });
        return this.app;
    }
}
exports.TilesRoutes = TilesRoutes;
//# sourceMappingURL=tiles.routes.config.js.map