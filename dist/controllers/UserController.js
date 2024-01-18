"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const data_source_1 = require("../data-source");
const User_1 = require("../entity/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
exports.UserController = {
    createUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { username, email, password } = req.body;
            const user = new User_1.User();
            user.username = username;
            user.email = email;
            const hashedPassword = yield bcrypt_1.default.hash(password, 12);
            user.password = hashedPassword;
            yield userRepository.save(user);
            return res.status(200).json({
                status: "sucess",
                message: "New user crated sucessfuly",
            });
        }
        catch (error) {
            return res.status(500).json({
                status: "fail",
                error,
            });
        }
    }),
    getUsers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield userRepository.find();
            return res.status(200).json({
                status: "sucess",
                data: users
            });
        }
        catch (error) {
            res.status(500).json({
                status: 'fail',
                error
            });
        }
    }),
};
