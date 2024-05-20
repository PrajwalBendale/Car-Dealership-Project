import axios from 'axios'
import { createError, createUrl } from './utils'

export async function getAllSales() {
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
    
    const url = createUrl('/inq/')
    const response = await axios.put(`${url}`,body)
    return response.data
  } catch (ex) {
    return createError(ex)
  }
}

export async function getAllCars(){

  const url = createUrl('/cars/')
   const response = await axios.get(`${url}`)
   
   return response.data
}

export async function deleteCar(id){

  const body = {
    CarID: id,
  }
  
  const url = createUrl('/cars/')
  const response = await axios.delete(`${url}`, { data: body })
  
  return response.data
}
//
//item.CarID,item.Make,item.Model,item.VIN,item.Price,item.Year,item.Status
export async function onStatusChanged(CarID,Status){
  const body ={
    CarID,Status,
  }
  const url = createUrl('/cars/status/')
  const response = await axios.put(`${url}`,body)
  return response.data
}