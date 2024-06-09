import axios from "axios";

const BASE_URL = "https://dogapi.dog/api/v2/";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleResponse = (response: { data?: any }) => {
  if (response.data) {
    return response.data;
  } else throw new Error("No data in response");
};

const handleError = (error: { message?: string }) => {
  console.log(error);
};

export const getBreeds = async (page: number = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}breeds?page[number]=${page}`);
    return handleResponse(response);
  } catch (e) {
    handleError(e as { message?: string });
  }
};
