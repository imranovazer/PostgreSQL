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
exports.AuthController = void 0;
const User_1 = require("../entity/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const data_source_1 = require("../data-source");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
const createSendToken = (user, statusCode, req, res) => {
    const { access, refresh } = signToken(user._id);
    res.cookie("access", access, {
        expires: new Date(Date.now() + 15 * 60 * 1000),
        httpOnly: true,
        secure: req.secure || req.headers["x-forwarded-proto"] === "https",
        sameSite: 'None',
    });
    res.cookie("refresh", refresh, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: req.secure || req.headers["x-forwarded-proto"] === "https",
        sameSite: 'None',
    });
    // Remove password from output
    user.password = undefined;
    res.status(statusCode).json({
        status: "success",
        tokens: {
            access,
            refresh
        },
        data: {
            user,
        },
    });
};
const signToken = (id) => {
    const access = jsonwebtoken_1.default.sign({ id }, process.env.SECRET_KEY || "smth", {
        expiresIn: 100 * 60,
    });
    const refresh = jsonwebtoken_1.default.sign({ id }, process.env.SECRET_KEY_REFRESH || "smth", {
        expiresIn: '7d'
    });
    return { access, refresh };
};
exports.AuthController = {
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
                data: user,
            });
        }
        catch (error) {
            return res.status(500).json({
                status: "fail",
                error,
            });
        }
    }),
};
