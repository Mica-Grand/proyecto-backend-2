import userModel from '../models/user.model.js'

export default class UserDAO {
    
    async createUser(userData) {
        const newUser = new userModel(userData);
        return await newUser.save(); 
    }
    async getAllUsers() {
    return await userModel.find()
    }

    async getUserById(uid) {
        return await userModel.findOne({_id:uid})
    }
    
    async getUserByEmail(email) {
        return await userModel.findOne({ email: email });
    }
    async updateUserById(uid, updatedFields) {
        return await userModel.updateOne({_id:uid}, updatedFields)
    }

    async deleteUserById(uid) {
        return await userModel.deleteOne({_id:uid})
    }

  
    }




