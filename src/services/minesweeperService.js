import axios from 'axios'

const basePath = '/results'

const findAll = async () => {
  const res = await axios.get(`${basePath}`)
  return res.data
}

const create = async result => {
  const res = await axios.post(`${basePath}`, result)
  return res.data
}

export default {
  findAll,
  create
}