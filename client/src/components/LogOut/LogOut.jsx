import { useContext } from 'react'
import AuthContext from '../../context/authContext'
import {useNavigate} from "react-router-dom"
import "./LogOut.scss"
const LogOut = () => {
 const {setAuth} = useContext(AuthContext)
 const navigate = useNavigate()
  const handleLogOut = ()=>{
      localStorage.removeItem("user-currency")
      setAuth(null)
      navigate("/")
  }
  return (
   <button className='logout' onClick={()=>handleLogOut()}>Log Out</button>
  )
}

export default LogOut