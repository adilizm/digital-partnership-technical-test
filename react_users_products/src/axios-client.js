import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/api`
})

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const onResponce = (responce) => responce 

const onError = (error) => {
    const { response } = error
  
    switch (response.status) {
        case 401:
            localStorage.removeItem('ACCESS_TOKEN')
            break;
        default:
            break;
    }
    throw error;
}

axiosClient.interceptors.response.use(onResponce, onError)

export default axiosClient;