import axios from "axios";
import { Quiz } from "../../../types";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

export const addQuiz = async(quiz: Quiz) => {
    const { data } = await axiosWithCredentials.post(`${REMOTE_SERVER}/addQuiz`, quiz);
    return data;
}