import axios from 'axios'
import { createError, createUrl } from './utils'

export async function getAllPizzas() {
  try {
    const headers = {
      headers: {
        id: sessionStorage['EmployeeId'],
      }
    }
    const url = createUrl('/sales/emp/')
    
    const response = await axios.get(`${url}`, headers)
    return response.data
  } catch (ex) {
    return createError(ex)
  }
}
export async function getAllInquiries() {
  try {
    
    const url = createUrl('/inq/')
    
    const response = await axios.get(`${url}`)
    return response.data
  } catch (ex) {
    return createError(ex)
  }
}

export async function getInquiriesById(id,carid) {

  try {
    const headers = {
      headers: {
        CustomerId: id,
        CarId: carid,
      }
    }
    
    const url = createUrl('/inq/reqbycustomer/')
    
    const response = await axios.get(`${url}`, headers)
    return response.data
  } catch (ex) {
    return createError(ex)
  }
}


export async function updatedStatus(id,status) {
  try {
    const body = {
      
        id,
        status,
      
    }
    console.log(body)
    const url = createUrl('/inq/')
    
    const response = await axios.put(`${url}`,body)
    return response.data
  } catch (ex) {
    return createError(ex)
  }
}