import axios from 'axios'; 

const api = axios.create({
  baseURL: 'https://omni-back.herokuapp.com/'
})

export default api;