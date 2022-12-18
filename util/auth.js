import { post, get } from "./request";
import { storeData, getData, clearData } from "./storage";

const userIsLoggedIn = async () => {
  const result = await getData("token");
  return result;
};

const refreshToken = async (token) => {
  try {
    let response = await post('api-token-refresh', {
      token
    }, {}, false);

    await storeData('token', response.data.token)

    return {
      status: 200,
      message: "Token atualizado com sucesso!",
    };
  } catch (err) {
    return {
      status: 400,
      message: "",
    };
  }
}

const login = async (username, password) => {
  try {
    let response = await post('api-token-auth', {
      username, password
    }, {}, false);

    await storeData('token', response.data.token)
    response = await get(`profile/get_by_username`, {}, {username}, true);

    const { team, patent, team_image, image } = response.data;
    storeData('user', {
       patent, team_image, image,
       ...response.data.user,
       ...{
          team_id: response.data.team.id,
          team_name: response.data.team.name,
          team_image: response.data.team.image
       }
    })

    return {
      status: response.status,
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
  storeData("token", null);
};

export { login, register, userIsLoggedIn, logout };
