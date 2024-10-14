import jwt from "jsonwebtoken";
import { createHash, isValidPassword } from "../utils/utils.js";
import CartDAO from "../daos/cart.dao.js";
import UserDAO from "../daos/user.dao.js";
import UserDTO from "../dtos/user.dto.js";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export default class SessionsRepository {
  constructor() {
    this.userDAO = new UserDAO();
    this.cartDAO = new CartDAO();
  }

  async register({ first_name, last_name, email, age, password }) {
    const userExists = await this.userDAO.getUserByEmail(email);
    if (userExists) {
      throw new Error("This user already exists. Please, login");
    }
    const newCart = await this.cartDAO.createCart();
    const newUser = {
      first_name,
      last_name,
      email,
      age,
      password: createHash(password),
      cart: newCart._id,
    };

    const savedUser = await this.userDAO.createUser(newUser);
    const token = jwt.sign(
      { id: savedUser._id, role: savedUser.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return token;
  }

  async login({ email, password }) {
    const user = await this.userDAO.getUserByEmail(email);
    if (!user || !isValidPassword(user, password)) {
      throw new Error("Wrong credentials used for login.");
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return token;
  }

  async logout() {
    return true;
  }
  async getCurrentUser(user) {
    const userDTO = new UserDTO(user);
    const cartId = user.cart;
    return { user: userDTO, cartId };
  }
}
