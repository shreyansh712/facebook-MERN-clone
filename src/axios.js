import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://fb-mern-by-shreyansh.herokuapp.com'
})

export default instance