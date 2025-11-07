import axios from "axios";

const instance = axios.create({
       baswURL:''

})

const useAxiosSecure = () =>{
 // set token in the header for all the api call using axiosSecure hook
       return instance;
}

export default useAxiosSecure;