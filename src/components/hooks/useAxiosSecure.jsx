import axios from "axios";
import { use, useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

const instance = axios.create({
  baseURL: "https://smart-deals-server-alpha.vercel.app",
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  // set token in the header for all the api call using axiosSecure hook

  useEffect(
    (user) => {
      // request interceptor
      const requestInterceptor = instance.interceptors.request.use((config) => {
        const token = use.accessToken;
        if (token) {
          //    config.headers.Authorization = `Bearer ${user.accessToken}`;
          config.headers.Authorization = `Bearer ${token}`;
        }
        console.log(config);
        return config;
      });

      // response interceptor
      const responseInterceptor = instance.interceptors.response.use(
        (res) => {
          return res;
        },
        (err) => {
          const status = err.status;
          if (status === 401 || status === 403) {
            //      console.log("logout the user for bad request");
            logOut().then(() => {
              navigate("/register");
            });
          }
        }
      );

      return () => {
        instance.interceptors.request.eject(requestInterceptor);
        instance.interceptors.request.eject(responseInterceptor);
      };
    },
    [user, logOut, navigate]
  );
  return instance;
};

export default useAxiosSecure;
