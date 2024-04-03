import axios from 'axios'
import { createError, createUrl } from './utils'
import config from '../config'

export async function signupUser(firstName, lastName, email, password) {
  try {
    const url = createUrl('user/signup')
    const body = {
      firstName,
      lastName,
      email,
      password,
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
