// userController.js
export default class UserController {
    constructor(userService) {
      this.userService = userService;
    }
  
    async getProfile(req, res) {
      try {
        const user = await this.userService.getUserById(req.user.id);
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(404).json({ success: false, message: error.message });
      }
    }
  
    async updateProfile(req, res) {
      try {
        const updatedUser = await this.userService.updateUser(req.user.id, req.body);
        res.status(200).json({ success: true, data: updatedUser });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
    }
  
    async deleteAccount(req, res) {
      try {
        const result = await this.userService.deleteUser(req.user.id);
        res.status(200).json({ success: true, message: result.message });
      } catch (error) {
        res.status(404).json({ success: false, message: error.message });
      }
    }
  }
  