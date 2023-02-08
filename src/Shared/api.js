import axios from "axios";

const url = "https://backend-uye2.onrender.com"

export const api =axios.create({
    baseURL: url
})