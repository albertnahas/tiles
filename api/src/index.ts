import express from 'express';
import * as http from 'http';
import * as bodyparser from 'body-parser';

import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import {CommonRoutesConfig} from './common/common.routes.config';
import {TilesRoutes} from './tiles/tiles.routes.config';
import debug from 'debug';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 3002;
const routes: CommonRoutesConfig[] = [];
const debugLog: debug.IDebugger = debug('app');

// adding middleware to parse all incoming requests as JSON
app.use(bodyparser.json());

// adding middleware to allow cross-origin requests
app.use(cors());

// adding the TilesRoutes to our array,
routes.push(new TilesRoutes(app));

// configuring the expressWinston error-logging middleware,
app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    )
}));

app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send(`Server up and running!`)
});


server.listen(port, () => {
    debugLog(`Server running at http://localhost:${port}`);
    routes.forEach((route: CommonRoutesConfig) => {
        debugLog(`Routes configured for ${route.getName()}`);
    });
});