"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const api_erros_1 = require("../../helpers/api-erros");
const userRepository_1 = require("../../repositories/userRepository");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../../entities/User");
class UserController {
    async create(req, res) {
        const { name, email, password } = req.body;
        const userExists = await userRepository_1.userRepository.findOneBy({ email });
        if (userExists) {
            throw new api_erros_1.BadRequestError('E-mail já existe');
        }
        const hashPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = new User_1.User();
        newUser.name = name;
        newUser.email = email;
        newUser.password = hashPassword;
        await userRepository_1.userRepository.save(newUser);
        const { password: _, ...user } = newUser;
        return res.status(201).json(user);
    }
    async login(req, res) {
        const { email, password } = req.body;
        const user = await userRepository_1.userRepository.findOneBy({
            email: email,
        });
        if (!user) {
            throw new api_erros_1.BadRequestError('E-mail ou senha inválidos');
        }
        const verifyPass = await bcrypt_1.default.compare(password, user.password);
        if (!verifyPass) {
            throw new api_erros_1.BadRequestError('E-mail ou senha inválidos');
        }
        const token = jsonwebtoken_1.default.sign({ id: user.email }, '$2b$10$7Zxg2U3O2sBwXun5C08jHOb82sCebCduNctbp7LLPxMmDxG0ybHNy', {
            expiresIn: '8h',
        });
        return res.json({
            token: token,
        });
    }
    async getProfile(req, res) {
        return res.json(req.user);
    }
}
exports.UserController = UserController;
