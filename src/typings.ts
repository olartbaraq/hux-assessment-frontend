export type UserResponse = {
  token: string;
  isLoggedIn: boolean;
  user: UserData;
};

export type UserData = {
  email: string;
  id: string;
};

export type signupUser = {
  email: string;
  password: string;
  name: string;
};

export type signUpResponse = {
  data: {
    name: string;
  };
};
