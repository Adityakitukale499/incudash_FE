import axios from "axios";

const baseUrl = import.meta.env.VITE_REACT_BASE_URL

export const putData = async (path, body) => {
    const response = await axios.put(`${baseUrl}/${path}`, body);
    if (response.status === 200) return response;
    else throw Error(JSON.stringify(response.message));
}

export const postData = async (path, body) => {
    const response = await axios.post(`${baseUrl}/${path}`, body);
    if (response.status === 200) return response;
    else throw Error(JSON.stringify(response.message));
}

export const getData = async (path) => {
    const response = await axios.get(`${baseUrl}/${path}`);
    if (response.status === 200) return response;
    else throw Error(JSON.stringify(response.message));
}

export const deleteData = async(path) => {
    const response = await axios.delete(`${baseUrl}/${path}`);
    if (response.status === 200) return response;
    else throw Error(JSON.stringify(response.message));
}



