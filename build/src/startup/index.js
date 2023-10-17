"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongoDB = exports.cors = exports.routes = void 0;
const routes_1 = __importDefault(require("./routes"));
exports.routes = routes_1.default;
const cors_1 = __importDefault(require("./cors"));
exports.cors = cors_1.default;
const db_1 = __importDefault(require("./db"));
exports.connectMongoDB = db_1.default;
