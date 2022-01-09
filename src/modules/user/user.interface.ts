export interface IUserDto {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export type ICreateUserDto = Omit<IUserDto, '_id'>;

export type IUpdateUserDto = Partial<IUserDto>;
