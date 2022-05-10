import { useContext } from 'react'
import AuthContext from '../../context/authContext'
import "./LogOut.scss"
const LogOut = () => {
 const {setAuth} = useContext(AuthContext)

  const handleLogOut = ()=>{
      localStorage.removeItem("user-currency")
      setAuth(null)
  }
  return (
   <button className='logout' onClick={()=>handleLogOut()}>Log Out</button>
  )
}

export default LogOut