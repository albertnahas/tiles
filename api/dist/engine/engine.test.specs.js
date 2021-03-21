"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const engine_1 = __importDefault(require("./engine"));
// import Cell from '../models/cell';
const engine = new engine_1.default();
engine.setBoard([[0, 0, 1], [0, 2, 2], [2, 1, 1]]);
describe('Engine', () => {
    describe('Origin', () => {
        it('should return cell', () => {
            expect(typeof engine.getOrigin())
                .toEqual('Cell');
        });
    });
});
//# sourceMappingURL=engine.test.specs.js.map