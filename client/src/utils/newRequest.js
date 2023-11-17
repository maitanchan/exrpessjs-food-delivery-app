import axios from 'axios'

const newRequest = axios.create({

    baseURL: "http://localhost:1337/api/",
    withCredentials: true

})

export default newRequest