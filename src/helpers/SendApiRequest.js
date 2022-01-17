import axios from 'axios'

export const SendGetRequest = (bearerToken, apiUrl) => {
    const localStorageToken = localStorage.getItem('token')
    const response = axios.get(`http://localhost:3001/${apiUrl}`, {
        headers: { Authorization: `Bearer ${localStorageToken}` }
    })
        .then((response) => {
            return response.data.data
        })
        .catch((error) => {
            console.log('error: ', error.response.data.message)
            return { errorData: error.response.data, error: true }
        })

    if (response.error) {
        return { error: true, message: response.errorData.message, status: response.errorData.statusCode }
    } else {
        return response
    }
}

export const SendPostRequest = (bearerToken, apiUrl, data = null) => {
    const localStorageToken = localStorage.getItem('token')
    const response = axios.post(`http://localhost:3001/${apiUrl}`, data, {
        headers: { Authorization: `Bearer ${localStorageToken}` }
    })
        .then((response) => {
            return response.data.data
        })
        .catch((error) => {
            console.log(error.response.data)
            return { errorList: error.response.data, error: true }
        })

    return response
}

export const SendPostMultipartRequest = (bearerToken, apiUrl, data = null) => {
    const localStorageToken = localStorage.getItem('token')
    const response = axios.post(`http://localhost:3001/${apiUrl}`, data, {
        headers: { Authorization: `Bearer ${localStorageToken}`, 'Content-Type': 'multipart/form-data' }
    })
        .then((response) => {
            return response.data.data
        })
        .catch((error) => {
            console.log(error.response.data)
            return { errorList: error.response.data, error: true }
        })

    return response
}

const sendApiRequestHelpers = { SendGetRequest, SendPostRequest, SendPostMultipartRequest }

export default sendApiRequestHelpers