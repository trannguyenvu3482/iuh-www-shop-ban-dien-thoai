import axios from "../axios";

const login = async (email, password) => {
  try {
    const { data } = await axios.post("/login", {
      username: email,
      password: password,
    });

    return data;
  } catch (error) {
    return error.response.data;
  }
};

export { login };
