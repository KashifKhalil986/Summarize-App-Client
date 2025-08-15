import axios from "axios";

const fetchData = async (url, method = "GET", data = {}, params = {}) => {
  try {
    const config = {
      url,
      method,
      ...(method !== "GET" && { data }),
      params,
      headers: {
        authorization: `${localStorage.getItem("token")}`,
      },
    };

    const response = await axios(config);
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};



export { fetchData };
