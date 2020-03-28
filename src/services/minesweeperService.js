import axios from 'axios'

const basePath = '/results'

export const findAll = async () => {
  const res = await axios.get(`${basePath}`)
  return res.data
}

export const create = async result => {
  const res = await axios.post(`${basePath}`, result)
  return res.data
}