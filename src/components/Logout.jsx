import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

export function Logout () {
  const navigate = useNavigate()
  const { clearUser } = useContext(UserContext)
  useEffect(() => {
    localStorage.clear();
    clearUser()
    return navigate('/login')
  }, [])
  return null
}
