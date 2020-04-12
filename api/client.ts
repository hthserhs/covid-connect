import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api-stage.covidmanager.com/'
});

export default apiClient;
