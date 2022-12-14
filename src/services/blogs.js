import axios from 'axios'
const baseUrl = '/api/blogs'


let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async blog => {
  const config = {
    headers: { 'Authorization': token },
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const update = async (id, blog) => {
  console.log(blog)
  const response = axios.put(`${baseUrl}/${id}`, blog)
  return response.then(response => response.data)
}

const remove = async (id) => {
  console.log(id);
  const othereq = await axios.get(`${baseUrl}/${id}`)
  console.log(othereq.data)
  const config = {
    headers: { 'Authorization': token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  console.log(response)
}



export default { getAll, create, update, setToken, remove }