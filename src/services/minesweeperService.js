import axios from 'axios'

const basePath = '/minesweepers'

export const findAll = async () => {
  const res = await axios.get(`${basePath}`)
  return res.data
}