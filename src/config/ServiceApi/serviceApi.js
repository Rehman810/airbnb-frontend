import axios from 'axios';
import API_CONFIG from '../Api/Api';


const { apiKey } = API_CONFIG;


export const loginUser = async (endpoint , data) => {
  try {    
    const response = await axios.post(`${apiKey}/${endpoint}`, data);    
    return response.data;
  } catch (error) {
    // showErrorToast(error.message)
    throw new Error('Error logging in: ' + error.message);
  }
};

export const fetchData = async (endpoint, token) => {

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.get(`${apiKey}/${endpoint}`, config);
    const initialData = response.data;   
    return initialData;
  } catch (error) {
    throw new Error('Error fetching data: ' + error.message);
  }
};

export const fetchDataById = async (endpoint, token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.get(`${apiKey}/${endpoint}/${id}`, config);   
    // console.log(response);
    
    return response.data;
  } catch (error) {
    throw new Error('Error fetching data: ' + error.message);
  }
};

export const deleteDataById = async (endpoint, token, id, id2) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const url = id2 ? `${apiKey}/${endpoint}/${id}/${id2}` : `${apiKey}/${endpoint}/${id}`;

  try {
    const response = await axios.delete(url, config);       
    return response.data.data;
  } catch (error) {
    // showErrorToast(error.message)
    throw new Error('Error deleting data: ' + error.message);
  }
};

export const deleteData = async (endpoint, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const url = `${apiKey}/${endpoint}`;

  try {
    const response = await axios.delete(url, config);       
    return response.data.data;
  } catch (error) {
    // showErrorToast(error.message)
    throw new Error('Error deleting data: ' + error.message);
  }
};

export const updateDataById = async (endpoint, token, id, data, id2) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const url = id2 ? `${apiKey}/${endpoint}/${id}/${id2}` : `${apiKey}/${endpoint}/${id}`;


  try {
    const response = await axios.put(url, data, config); 
    emitEvent('send_message', response.data);
    // console.log(response);
    
    return response.data.data;
  } catch (error) {
    // showErrorToast(error.message);
    throw new Error('Error updating data: ' + error.message);
  }
};

export const postData = async (endpoint, data, token, isMultipart = false) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      ...(isMultipart
        ? {}
        : { "Content-Type": "application/json" }),
    },
  };

  try {
    const response = await axios.post(`${apiKey}/${endpoint}`, data, config);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error.response?.data || error.message);
    throw new Error("Error posting data: " + (error.response?.data?.message || error.message));
  }
};

export const postDataById = async (endpoint, data, token, id, id2) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const url = id2 ? `${apiKey}/${endpoint}/${id}/${id2}` : `${apiKey}/${endpoint}/${id}`;
// console.log(id2);

  try {
    const response = await axios.post(url, data, config);
    return response.data;
  } catch (error) {
    // showErrorToast(error.message)
    throw new Error('Error posting data: ' + error);
  }
};

export const postDataByIds = async (endpoint, data, token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.post(`${apiKey}/${endpoint}/786/${id}`, data, config);
    emitEvent('send_message', response.data);    
    return response.data;
  } catch (error) {
    // showErrorToast(error.message)
    throw new Error('Error posting data: ' + error);
  }
};

export const fetchDataByIds = async (endpoint, token, id1, id2) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.get(`${apiKey}/${endpoint}/${id1}/${id2}`, config);  
    return response.data.data;
  } catch (error) {
    throw new Error('Error fetching data: ' + error.message);
  }
};



