import axios from 'axios'
import { createError, createUrl } from './utils'

export async function signupUser(firstName, lastName, Email, Password) {
  try {
    const url = createUrl('/emp/')
    var Name=firstName+lastName
    const body = {
      Name,
      Email,
      Password,
    }
    
    const response = await axios.post(url, body)
    
    return response.data
  } catch (ex) {
    return createError(ex)
  }
}

export async function signinUser(Email, Password) {
  try {
    const url = createUrl('/emp/login')
    const body = {
      Email,
      Password,
    }
    const response = await axios.post(`${url}`, body)
    
    return response.data
  } catch (ex) {
    return createError(ex)
  }
}
