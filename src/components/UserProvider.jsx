import { useState } from 'react'
import { UserContext } from '../context/UserContext'
import jwtDecode from 'jwt-decode'

export default function UserProvider (props) {
    const [user, setUser] = useState(
      JSON.parse(localStorage.getItem('user')) || null
    )
  
    const saveUser = (user) => {
      setUser(user)
      localStorage.setItem('user', JSON.stringify(user))
    }
  
    const clearUser = () => {
      setUser(null)
      localStorage.removeItem('user')
    }

    const decodeToken = () => {
      if (user) {
        const decodedToken =jwtDecode(user)
        return decodedToken
      } else {
        return null
      }
    }
    
    const autorize = ({ allowedRoles }) => {
      const userData = decodeToken()
      if (userData && allowedRoles) {
       // console.log(userData && userData.tipousuario && allowedRoles.includes(userData.tipousuario))
        return userData && userData.tipousuario && allowedRoles.includes(userData.tipousuario)
      }
      return false
    }
  
    return (
      <UserContext.Provider value={{ user, saveUser, clearUser, autorize, decodeToken }}>
        {props.children}
      </UserContext.Provider>
    )
  }
  