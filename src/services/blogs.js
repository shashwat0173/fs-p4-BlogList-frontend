import axios from 'axios'
const baseUrl = '/api/blogs'
const loginUrl = '/api/login'

let token = null;

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const increaseLike = async (id) => {
  const blog = await get(id);
  blog.likes += 1
  
  return update(id, blog)

}

const get = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const update = (id, updatedBlog) => {
  const request = axios.put(`${baseUrl}/${id}` , updatedBlog)
  return request.then(response => response.data)

}

const deleteBlog = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}


const login = async (credentials) => {
  const response = await axios.post(loginUrl, credentials)
  return response.data;
}

export default { getAll, login, setToken, create, increaseLike, deleteBlog }