import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { signinUser } from '../services/user'

export function Signin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const onSignin = async () => {
    if (email.length == 0) {
      toast.warn('enter email')
    } else if (password.length == 0) {
      toast.warn('enter password')
    } else {
      // make the api call
      const result = await signinUser(email, password)
      if (result['message'] == 'success') {
        // cache the token
        
        const id = result['result'][0].EmployeeId
        const pos = result['result'][0].position
        const name = result['result'][0].name
        sessionStorage['EmployeeId'] = id
        sessionStorage['Position'] = pos
        
        toast.success('Welcome '+name)
        navigate('/home')
      } else {
        toast.error(result['result'])
      }
    }
  }

  return (
    <>
      <h1 className='title'>Signin</h1>

      <div className='row'>
        <div className='col'>
          <div className='form'>
            <div className='mb-3'>
              <label htmlFor=''>Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type='email'
                placeholder='abc@test.com'
                className='form-control'
              />
            </div>
            <div className='mb-3'>
              <label htmlFor=''>Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                placeholder='xxxxxxxx'
                className='form-control'
              />
            </div>
            <div className='mb-3'>
              <div>
                Don't have an account? <Link to='/signup'>Signup here</Link>
              </div> 
              <button onClick={onSignin} className='btn btn-primary mt-2'>
                Signin
              </button>
            </div>
          </div>
        </div>
        
      </div>
    </>
  )
}

export default Signin
