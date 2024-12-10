import axios from "axios";
import { Quiz } from "../../../types";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

export const addQuiz = async(quiz: Quiz) => {
    const { data } = await axiosWithCredentials.post(`${REMOTE_SERVER}/addQuiz`, quiz);
    return data;
}

export const getQuizById = async (id: string) => {
    const { data } = await axiosWithCredentials.get(`${REMOTE_SERVER}/getQuizById/${id}`);
    return data;
}

export const updateQuiz = async(quiz: Quiz) => {
    const { data } = await axiosWithCredentials.put(`${REMOTE_SERVER}/updateQuiz`, quiz);
    return data;
}

export const deleteQuiz = async (quizId: string) => {
    const response = await axios.delete(`${REMOTE_SERVER}/deleteQuiz/${quizId}`);
    return response.data;
   };