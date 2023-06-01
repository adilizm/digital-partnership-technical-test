import { Link, Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/UserContext.jsx'
import { useEffect } from 'react'
import axiosClient from '../axios-client'


function UserLayout() {

  const { user, token, setToken, setUser } = useAuth()

  // if user not set redirect to login
  if (!token) {
    return <Navigate to="/login" />
  }

  const Logout = (e) => { e.preventDefault(), axiosClient.post('/logout').then(res => { setUser(null), setToken(null) }) }

  useEffect(() => {
    axiosClient.get('/user')
      .then(({ data }) => {
        const userinfo = data
        setUser(userinfo)
      })
  }, [])

  return (
    <div id="defaultLayout">
      <div className='content'>
        <header>
          <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <strong>{user.name}</strong>
              <span>{user.email}</span>
            </div>
            <a href="#" onClick={Logout} className='btn-logout'>Logout</a>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default UserLayout