import instance from './axios'
const API_URL =
  'https://vietnam-administrative-division-json-server-swart.vercel.app'

const apiGetProvinces = async () => {
  return await instance.get(`${API_URL}/province`)
}

const apiGetDistrict = async (idProvince) => {
    return await instance.get(
    `${API_URL}/district/?idProvince=${idProvince}`
  )
}

const apiGetCommune = async (idDistrict) => {
  return  await instance.get(
    `${API_URL}/commune/?idDistrict=${idDistrict}`
  )
}
export const provinceService = {
apiGetProvinces,
  apiGetDistrict,
  apiGetCommune,
}