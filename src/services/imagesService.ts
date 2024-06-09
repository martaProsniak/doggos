import axios from "axios";

const BASE_URL = "https://dog.ceo/api/";

export const getBreedsWithImages = async () => {
    return await axios.get(`${BASE_URL}breeds/list/all`);
};
