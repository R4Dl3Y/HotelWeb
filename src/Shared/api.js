import axios from "axios";

const url = "https://hotel4u.onrender.com/"

export const api =axios.create({
    baseURL: url
})