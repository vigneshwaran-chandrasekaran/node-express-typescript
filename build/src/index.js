"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const startup_1 = require("./startup");
const constants_1 = require("./utils/constants");
const middleware_1 = require("./middleware");
const utils_1 = require("./utils");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const app = (0, express_1.default)();
process.on("uncaughtException", (ex) => {
    console.log(constants_1.unCaughtException, ex);
});
process.on("unhandledRejection", (ex) => {
    console.log(constants_1.unHandledRejection, ex);
});
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.static(utils_1.env.IMAGES_FOLDER));
app.use((0, helmet_1.default)());
(0, startup_1.connectMongoDB)();
app.use(middleware_1.logs);
(0, startup_1.cors)(app);
(0, startup_1.routes)(app);
const PORT = utils_1.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`);
    console.log(`Server running on http://localhost:${PORT}/`);
});
app.use((err, req, res, next) => {
    /**
     * next is important to handle express errors, don't remove it
     */
    console.log("!!!!!!!err!!!!!!!", err);
    console.log("err.name", err.name);
    console.log("err.code", err.code);
    console.log("err.message", err.message);
    if (err.name === "MongoServerError" && err.code === 11000) {
        const errors = {};
        Object.keys(err.keyValue).forEach((key) => {
            errors[key] = `${err.keyValue[key]} already Exists`;
        });
        return res.status(http_status_codes_1.default.UNPROCESSABLE_ENTITY).json({
            errors,
        });
    }
    if (err.name === "ValidationError") {
        const errors = {};
        Object.keys(err.errors).forEach((key) => {
            errors[key] = err.errors[key].message;
        });
        return res.status(http_status_codes_1.default.UNPROCESSABLE_ENTITY).json({
            errors,
        });
    }
    return res.status(err.status || http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
        errors: "Internal server error",
        stack: utils_1.env.NODE_ENV === "production" ? null : err.stack,
    });
});
