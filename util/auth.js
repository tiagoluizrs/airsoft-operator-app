import { storeData, getData } from "./storage";

const userIsLoggedIn = async () => {
  const result = await getData("user");
  return result;
};

const login = async (emailText, passwordText) => {
  try {
    return {
      status: 200,
      message: "Usuário logado co sucesso!",
    };
  } catch (err) {
    return {
      status: 400,
      message: "",
    };
  }
};

const register = async (email, password) => {
  try {
    return {
      status: 200,
      message: "Usuário criado co sucesso!",
    };
  } catch (err) {
    return {
      status: 400,
      message: "",
    };
  }
};

const logout = () => {
  storeData("user", null);
};

export { login, register, userIsLoggedIn, logout };
