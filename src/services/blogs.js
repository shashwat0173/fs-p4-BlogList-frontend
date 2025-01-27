import axios from 'axios'
const baseUrl = '/api/blogs'
const loginUrl = '/api/login'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const login = async (credentials) => {
  const response = await axios.post(loginUrl, credentials)
  return response.data;
}

export default { getAll, login }