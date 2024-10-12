import UserDAO from "../daos/user.dao.js";
import UserDTO from '../dtos/user.dto.js'

export default class UsersRepository{
    constructur(){
        this.userDAO = new UserDAO()
    }

    async getAllUsers() {
        const users = await this.userDAO.getAllUsers();
        return users.map(user => new UserDTO(user));
    }

    async getUserById(uid) {
        const user = await this.userDAO.getUserById(uid);
        if (!user) {
            throw new Error('User not found');
        }
        return new UserDTO(user);
    }

    async updateUserById(uid, updatedFields) {
        return await this.userDAO.updateUserById(uid, updatedFields);
    }

    async deleteUserById(uid) {
        return await this.userDAO.deleteUserById(uid);
    }
}

