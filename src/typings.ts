export type UserResponse = {
  token: string;
  isLoggedIn: boolean;
  user: UserData;
};

export type UserData = {
  email: string;
  id: string;
  name: string;
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

export type Contact = {
  id: string;
  firstname: string;
  lastname: string;
  phone_number: string;
};

export type ContactParams = {
  firstname: string;
  lastname: string;
  phone_number: string;
};

export type Contacts = {
  contacts: Contact[];
};
