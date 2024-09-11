import axios from "axios";

const API_URL = "http://localhost:5000/testResults";

export const getTestResults = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createTestResult = async (resultData) => {
  const response = await axios.post(API_URL, resultData);
  console.log(response);
  return response.data.result;
};

export const deleteTestResult = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  console.log(response);
};

export const updateTestResultVisibility = async ({ id, visibility }) => {
  const response = await axios.patch(`${API_URL}/${id}`, { visibility });
  console.log(response);
};
