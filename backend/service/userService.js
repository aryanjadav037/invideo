export default class UserService {
    constructor(userModel) {
      this.userModel = userModel;
    }
  
    async getUserById(userId) {
      const user = await this.userModel.findById(userId).select('-password');
      if (!user) throw new Error('User not found');
      return user;
    }
  
    async updateUser(userId, updateData) {
      const user = await this.userModel.findByIdAndUpdate(
        userId,
        { $set: updateData },
        { new: true, runValidators: true }
      ).select('-password');
  
      if (!user) throw new Error('User not found or update failed');
      return user;
    }
  
    async deleteUser(userId) {
      const user = await this.userModel.findByIdAndDelete(userId);
      if (!user) throw new Error('User not found or already deleted');
      return { message: 'User deleted successfully' };
    }
  }
  