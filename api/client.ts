import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://covid19-dev.ap-south-1.elasticbeanstalk.com'
});

export default apiClient;
