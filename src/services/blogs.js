import axios from 'axios'
const baseUrl = '/api/blogs'


let token = null; 

const setToken = (newToken) => {
  token = `bearer: ${newToken}`
}

const getAll = (user) => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (blog) => {
  const config = {
    headers: {'Authorization': token},
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const update = async ( id, blog ) => {
  const response = await axios.put(`${baseUrl}/:${id}`, blog)
  return response.then(response => response.data)
}


export default { getAll, create, update, setToken }