import { BASE_URL_API } from '@env';
import axios from 'axios';
import { getData } from './storage';

let headers = {
    'Content-Type': 'application/json'
};

const getToken = async (header) => {
    const token = await getData('token');
    if(token){
        header['Authorization'] = `JWT ${token}`;
    }
    return header;
}

const get = async (endpoint, header={}, params={}, sendToken=true) => {
    headers = {
        ...headers,
        ...header
    };

    if(sendToken){
        headers = await getToken(headers);
    }

    return await axios({
        method: "get",
        url: `${BASE_URL_API}/${endpoint}/`,
        params,
        headers
    });
}

const post = async (endpoint, data, header={}, sendToken=true) => {
    headers = {
        ...headers,
        ...header
    };

    if(sendToken){
        headers = await getToken(headers);
    }

    return await axios({
        method: "post",
        url: `${BASE_URL_API}/${endpoint}/`,
        data,
        headers
    });
}

export {
    get, post
}