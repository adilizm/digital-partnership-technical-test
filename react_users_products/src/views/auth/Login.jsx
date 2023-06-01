import { useRef, useState } from 'react'
import axiosClient from '../../axios-client'
import { useAuth } from '../../contexts/UserContext.jsx'

function Login() {
  const email_Ref = useRef()
  const password_Ref = useRef()
  const {setToken, setUser } = useAuth()

  const [errors, setErrors] = useState(null)

  const submit = (e) => {
    setErrors(null)
    e.preventDefault()
    const payload = {
      email: email_Ref.current.value,
      password: password_Ref.current.value,
    }
    console.log('payload = ', payload)
    axiosClient.post('/login', payload)
      .then(({ data }) => {
        const userinfo = data.user
        setUser(userinfo)
        setToken(data.token)
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          if (response.data.errors) {
            setErrors(response.data.errors)
          } else {
            setErrors({
              email: [response.data.message]
            })
          }
        }
      })
  }

  return (
    <div className='login-signup-form animated fadeInDown'>
              <div className='form'>
                <form onSubmit={submit}>
                  <h1 className='title'> Login To Your Account</h1>
                  {errors && <ul className='alert'>
                    {Object.keys(errors).map(key => (
                      <li key={key}>{errors[key][0]}</li>
                    ))}</ul>}
                  <input ref={email_Ref} placeholder='Email' type='email' />
                  <input ref={password_Ref} placeholder='password' type='password' />
                  <button className='btn btn-block'> Login</button>
                </form>
                <br />
                      <strong> user 1 :</strong>
                <br />
                      Email : adil@gmail.com
                <br />  password: password
                <br />
                <br />
                <strong> user 2 :</strong>
                <br />
                      Email : brahim@gmail.com
                <br />  password: password
              </div>
            </div>
  )
}

export default Login
