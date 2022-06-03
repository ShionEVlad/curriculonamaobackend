export type UserDTO = {
  user: {
    id: number;
    email: string;
    name: string;
  };
  token: string;
  refreshToken: string;
};

export type CreateUserDTO = {
  email: string;
  name: string;
  password: string;
};
