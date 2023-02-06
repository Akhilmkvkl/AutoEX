import axios from "axios";

export const axiosUserInstance = axios.create({
    baseURL: "/users"
})

export const axiosExpertInstance = axios.create({
    baseURL: "/expert"
})

export const axiosAdminInstance = axios.create({
    baseURL: "/admin"
})