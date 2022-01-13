import axios from "axios";

export const SendGetRequest = (bearerToken, apiUrl) => {
    const response = axios.get(`http://localhost:3001/${apiUrl}`, {
        headers: { Authorization: `Bearer ${bearerToken}` }
    })
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            console.log(error);
        });

    return response;
}

export const SendPostRequest = (bearerToken, apiUrl, data = null) => {
    const response = axios.post(`http://localhost:3001/${apiUrl}`, data, {
        headers: { Authorization: `Bearer ${bearerToken}` }
    })
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            console.log(error);
        });

    return response;
}

export const SendPostMultipartRequest = (bearerToken, apiUrl, data = null) => {
    const response = axios.post(`http://localhost:3001/${apiUrl}`, data, {
        headers: { Authorization: `Bearer ${bearerToken}`, 'Content-Type': 'multipart/form-data' }
    })
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            console.log(error);
        });

    return response;
}

const sendApiRequestHelpers = { SendGetRequest, SendPostRequest, SendPostMultipartRequest };

export default sendApiRequestHelpers;