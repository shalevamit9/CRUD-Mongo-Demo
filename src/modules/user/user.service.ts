import { ICreateUserDto, IUpdateUserDto } from "./user.interface.js";
import UserModel from "./user.model.js";

export const getAllUsers = async (page: number, limit: number) => {
    const amountToSkip = page * limit;

    const users = await UserModel.find()
        .find()
        .skip(amountToSkip)
        .limit(limit)
        .select("-_id first_name last_name email phone");

    return users;
};

export const getUserById = async (id: string) => {
    const user = await UserModel.findById(id);
    return user;
};

export const createUser = async (userDto: ICreateUserDto) => {
    const user = await UserModel.create(userDto);
    return user;
};

export const updateUser = async (id: string, userDto: IUpdateUserDto) => {
    const user = await UserModel.findByIdAndUpdate(id, userDto, { new: true });
    return user;
};

export const deleteUser = async (id: string) => {
    const user = await UserModel.findByIdAndDelete(id);
    return user;
};
