import axios from "axios";

const USERS_SERVICE_URI = "http://users-service:7101";

export default class UsersService {
  static async createUser({ email, password }) {
    const body = await axios
      .post(`${USERS_SERVICE_URI}/users`, {
        email,
        password,
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error;
      });

    return body;
  }
}
