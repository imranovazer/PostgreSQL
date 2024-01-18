"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source");
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const AuthRoutes_1 = __importDefault(require("./routes/AuthRoutes"));
require("dotenv/config");
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.listen(PORT, () => {
    console.log("Server has started on port ", PORT);
});
app.use('/user', UserRoutes_1.default);
app.use('/auth', AuthRoutes_1.default);
data_source_1.AppDataSource.initialize()
    .then(() => {
    // here you can start to work with your database
    console.log("DB initialized");
})
    .catch((error) => console.log(error));
