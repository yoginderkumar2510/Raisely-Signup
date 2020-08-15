import axios from "axios";

const postRequest = (data) => ({ method: "POST", data });


//signup
export const signup = (data) => {
  let endpoint = 'v3/signup';
  let options = postRequest(data);
  return callApi(endpoint, options);
};

//Check User
export const existingUser = (email) => {
  let endpoint = 'v3/check-user';
  let options = postRequest({ email });
  return callApi(endpoint, options);
};

//root url
const myInitObject = {
  ROOT_URL: 'https://api.raisely.com'
}

//api calls
const callApi = async (endpoint, options = { method: "GET" }) => {
  let url = `${myInitObject.ROOT_URL}/${endpoint}`;
  try {
    const response = await axios({
      url,
      ...options,
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = response.data;
    console.log("api request: ", url, data);
    if (!data.success) {
      return {
        error: true,
        errors: data.error || "Something went wrong",
      };
    }
    return {
      data: data.data,
      error: false,
      errors: "",
    };
  } catch (err) {
    return {
      error: true,
      // errors: 'Looks like the server is taking to long to respond',
      errors: err.message,
    };
  }
};
