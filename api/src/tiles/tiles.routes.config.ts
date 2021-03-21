import { CommonRoutesConfig } from '../common/common.routes.config';
import express from 'express';

import Engine from '../engine/engine';
import AI from '../engine/ai';

export class TilesRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'UsersRoutes');
    }
    configureRoutes() {
        this.app.route(`/tiles/:dimensions/:colors`)
            .get((req: express.Request, res: express.Response) => {
                const dimensions = parseInt(req.params.dimensions, 10);
                const colors = parseInt(req.params.colors, 10);
                const engine = new Engine(dimensions, colors);

                const message = engine.toString();

                res.status(200).send(engine.board);
            })
        this.app.route(`/tiles`)
            .post((req: express.Request, res: express.Response) => {
                const color = parseInt(req.body.color, 10);
                const board = req.body.board;
                const engine = new Engine();
                engine.setBoard(board);
                engine.setOriginAndAdjacents(color);
                res.status(200).send({
                    board: engine.board,
                    won: engine.checkWin()
                });
            })
        this.app.route(`/solve`)
            .post((req: express.Request, res: express.Response) => {
                const board = req.body.board;
                const engine = new Engine();
                engine.setBoard(board);
                const ai = new AI();
                const result = ai.solve(engine.board);

                res.status(200).send(result);
            })
        return this.app;
    }
}