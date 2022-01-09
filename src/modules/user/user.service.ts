import { ICreateUserDto, IUpdateUserDto } from './user.interface.js';
import UserModel from './user.model.js';

class UserService {
  async getAllUsers(page: number, limit: number) {
    const amountToSkip = page * limit;

    const users = await UserModel.find()
      .find()
      .skip(amountToSkip)
      .limit(limit)
      .select('-_id first_name last_name email phone');

    return users;
  }

  async getUserById(id: string) {
    const user = await UserModel.findById(id);
    return user;
  }

  async createUser(userDto: ICreateUserDto) {
    const user = await UserModel.create(userDto);
    return user;
  }

  async updateUser(id: string, userDto: IUpdateUserDto) {
    const user = await UserModel.findByIdAndUpdate(id, userDto, { new: true });
    return user;
  }

  async deleteUser(id: string) {
    const user = await UserModel.findByIdAndDelete(id);
    return user;
  }
}

const userService = new UserService();

export default userService;
