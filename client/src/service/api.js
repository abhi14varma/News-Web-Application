import axios from "axios";

export const getNews = async () => {
  const URL = "https://news-server-tqwo.onrender.com";
  try {
    return await axios.get(`${URL}/news`);
  } catch (error) {
    console.log("error while calling new api", error);
  }
};

const axiosInstance = axios.create({
  baseURL: URL,
  timeout: 10000, 
  headers: {
      "Content-Type": "application/json"
  }
});

axiosInstance.interceptors.request.use(
  function(config) {
      if (config.TYPE.params) {
          config.params = config.TYPE.params
      } else if (config.TYPE.query) {
          config.url = config.url + '/' + config.TYPE.query;
      }
      return config;
  },
  function(error) {
      return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function(response) {
      // Stop global loader here
      return processResponse(response);
  },
  function(error) {
      // Stop global loader here
      return Promise.reject(ProcessError(error));
  }
)

///////////////////////////////
// If success -> returns { isSuccess: true, data: object }
// If fail -> returns { isFailure: true, status: string, msg: string, code: int }
//////////////////////////////
const processResponse = (response) => {
  if (response?.status === 200) {
      return { isSuccess: true, data: response.data }
  } else {
      return {
          isFailure: true,
          status: response?.status,
          msg: response?.msg,
          code: response?.code
      }
  }
}

///////////////////////////////
// If success -> returns { isSuccess: true, data: object }
// If fail -> returns { isError: true, status: string, msg: string, code: int }
//////////////////////////////
export const ProcessError = (error) => {
  if (error.response) {
          console.log("ERROR IN RESPONSE: ", JSON.stringify(error));
          return {
              isError: true,
              msg: API_NOTIFICATION_MESSAGES.responseFailure,
              code: error.response.status
          }
      }
   else if (error.request) { 
      // The request was made but no response was received
      console.log("ERROR IN RESPONSE: ", JSON.stringify(error));
      return {
          isError: true,
          msg: API_NOTIFICATION_MESSAGES.requestFailure,
          code: ""
      }
  } else { 
      // Something happened in setting up the request that triggered an Error
      console.log("ERROR IN RESPONSE: ", JSON.stringify(error));
      return {
          isError: true,
          msg: API_NOTIFICATION_MESSAGES.networkError,
          code: ""
      }
  }
}

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
  API[key] = (body, showUploadProgress, showDownloadProgress) =>
      axiosInstance({
          method: value.method,
          url: value.url,
          data:  body,
          responseType: value.responseType,

          onUploadProgress: function(progressEvent) {
              if (showUploadProgress) {
                  let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                  showUploadProgress(percentCompleted);
              }
          },
          onDownloadProgress: function(progressEvent) {
              if (showDownloadProgress) {
                  let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                  showDownloadProgress(percentCompleted);
              }
          }
      });
}

export { API };
