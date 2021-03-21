"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const bodyparser = __importStar(require("body-parser"));
const winston = __importStar(require("winston"));
const expressWinston = __importStar(require("express-winston"));
const cors_1 = __importDefault(require("cors"));
const tiles_routes_config_1 = require("./tiles/tiles.routes.config");
const debug_1 = __importDefault(require("debug"));
const app = express_1.default();
const server = http.createServer(app);
const port = 3002;
const routes = [];
const debugLog = debug_1.default('app');
// adding middleware to parse all incoming requests as JSON
app.use(bodyparser.json());
// adding middleware to allow cross-origin requests
app.use(cors_1.default());
// adding the TilesRoutes to our array,
routes.push(new tiles_routes_config_1.TilesRoutes(app));
// configuring the expressWinston error-logging middleware,
app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(winston.format.colorize(), winston.format.json())
}));
app.get('/', (req, res) => {
    res.status(200).send(`Server up and running!`);
});
server.listen(port, () => {
    debugLog(`Server running at http://localhost:${port}`);
    routes.forEach((route) => {
        debugLog(`Routes configured for ${route.getName()}`);
    });
});
//# sourceMappingURL=index.js.map