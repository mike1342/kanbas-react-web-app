import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

// export const deleteEnrollment = async (enrollmentId: string) => {
//  const response = await axios.delete(`${ENROLLMENTS_API}/${enrollmentId}`);
//  return response.data;
// };

// export const findEnrollments = async (userId: string) => {
//   const response = await axios
//     .get(`${ENROLLMENTS_API}/${userId}`);
//   return response.data;
// };

// export const createEnrollment = async (userId: string, courseId: string) => {
//   const response = await axios.post(
//     `${ENROLLMENTS_API}/${userId}/${courseId}`);
//   return response.data;
// };