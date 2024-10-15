import userModel from '../models/user.model.js'

export default class UserDAO {

    async getAllUsers() {
        try {
            return await userModel.find();
        } catch (error) {
            throw new Error('Error fetching all users: ' + error.message);
        }
    }



    async getUserById(uid) {
        try {
        return await userModel.findOne({_id:uid})
    } catch (error) {
        throw new Error('Error fetching user: ' + error.message);
    }
}
    

async updateUserById(uid, updatedFields) {
    try {
        return await userModel.updateOne({ _id: uid }, updatedFields);
    } catch (error) {
        throw new Error('Error updating user: ' + error.message);
    }
}

async deleteUserById(uid) {
    try {
        return await userModel.deleteOne({ _id: uid });
    } catch (error) {
        throw new Error('Error deleting user: ' + error.message);
    }
}
}




