import axios from "axios";

const API = axios.create({

  baseURL: "http://localhost:5000/api",

  withCredentials: true
});

/* ---------------- REQUEST INTERCEPTOR ---------------- */

API.interceptors.request.use(

  (config) => {

    const token =
      localStorage.getItem(
        "accessToken"
      );

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => {

    return Promise.reject(error);
  }
);

/* ---------------- RESPONSE INTERCEPTOR ---------------- */

API.interceptors.response.use(

  (response) => response,

  async (error) => {

    const originalRequest =
      error.config;

    // prevent infinite loop
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {

      originalRequest._retry = true;

      try {

        // refresh token request
        const res = await axios.post(

          "http://localhost:5000/api/auth/refresh-token",

          {},

          {
            withCredentials: true
          }
        );

        const newAccessToken =
          res.data.data.accessToken;

        // store new token
        localStorage.setItem(
          "accessToken",
          newAccessToken
        );

        // update failed request
        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        // retry original request
        return API(originalRequest);

      } catch (refreshError) {

        console.log(
          "Refresh failed",
          refreshError
        );

        localStorage.removeItem(
          "accessToken"
        );

        localStorage.removeItem(
          "user"
        );

        window.location.href = "/";

        return Promise.reject(
          refreshError
        );
      }
    }

    return Promise.reject(error);
  }
);

export default API;