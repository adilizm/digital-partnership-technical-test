import { Outlet,Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/UserContext.jsx'

function GuestLayout() {

  const { token } = useAuth()

    if (token) {
        return <Navigate to="/" />
    }

  return (
    <div> 
        <Outlet/>
    </div>
  )
}

export default GuestLayout