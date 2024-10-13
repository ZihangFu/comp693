import axios from "axios";
const instance = axios.create({
    baseURL: 'http://localhost:8848/api/',
    timeout: 1500,
});
export default instance;