import axios from 'axios';
const Api = axios.create({
    basURL: 'http://localhost:3001/departments'});

export default Api;