import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";

const instance = axios.create({
       baseURL:'http://localhost:3000'

})

const useAxiosSecure = () =>{
       const  {user}  = useAuth();
 // set token in the header for all the api call using axiosSecure hook
 
 useEffect((user) =>{
      // request interceptor 
     const requestInterceptor = instance.interceptors.request.use((config) =>{
       console.log(config);
       config.headers.Authorization = `Bearer ${user.accessToken}`
       return config;
 })

 // response interceptor
instance.interceptors.response.use(res => {
       return res;

}, err => {
       const status = err.status;
       if(status === 401 || status ===403){
              console.log('logout the user for bad request')
       }
})


 return () =>{
      instance.interceptors.request.eject(requestInterceptor)
 }
 }, [user])
       return instance;
}

export default useAxiosSecure;