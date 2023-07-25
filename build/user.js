"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const db_1 = __importDefault(require("./lib/db"));
class UserService {
    static createUser(payload) {
        const { firstName, lastName, email, password } = payload;
        const salt = (0, crypto_1.randomBytes)(32).toString();
        const hashedPassword = (0, crypto_1.createHmac)("sha256", salt)
            .update(password)
            .digest('hex');
        return db_1.default.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                salt
            }
        });
    }
}
exports.default = UserService;
