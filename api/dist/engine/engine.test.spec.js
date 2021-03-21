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
        it('should return top left cell', () => {
            expect(engine.getOrigin().x)
                .toEqual(0);
            expect(engine.getOrigin().y)
                .toEqual(0);
            expect(engine.getOrigin().val)
                .toEqual(0);
        });
    });
    describe('Get Cell', () => {
        it('should return the correct cell', () => {
            expect(engine.getCell(0, 1).y)
                .toEqual(0);
            expect(engine.getCell(0, 1).x)
                .toEqual(1);
            expect(engine.getOrigin().val)
                .toEqual(0);
        });
    });
    describe('Get Adjacents', () => {
        it('should return the correct array', () => {
            expect(engine.getAdjacents(0, 0))
                .toEqual([{
                    "val": 0,
                    "x": 1,
                    "y": 0,
                },
                {
                    "val": 0,
                    "x": 0,
                    "y": 1,
                },
            ]);
        });
    });
    describe('Check Win', () => {
        it('should return false', () => {
            expect(engine.checkWin())
                .toEqual(false);
        });
        engine.setBoard([[1, 1, 1], [1, 1, 1], [1, 1, 1]]);
        it('should return false', () => {
            expect(engine.checkWin())
                .toEqual(true);
        });
    });
});
//# sourceMappingURL=engine.test.spec.js.map