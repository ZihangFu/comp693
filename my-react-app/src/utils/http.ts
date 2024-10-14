import axios from "axios";
const instance = axios.create({
    baseURL: 'http://13.238.254.19:8848/api/',
    // baseURL: 'http://localhost:8848/api/',
    timeout: 1500,
});
export default instance;