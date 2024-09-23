import axios from "axios";
export const baseUrl = 'http://localhost:1337';

export const api = axios.create({
    baseURL: baseUrl,
});