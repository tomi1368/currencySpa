import {Routes,Route, Navigate} from "react-router-dom"
import Home from "./components/Home/Home"
import "./App.scss"
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import UserLink from "./components/UserLink/UserLink"
import RequireAuth from "./components/RequireAuth/RequireAuth"
import { AllowCodes } from "./constants/allowCodes"
import AllUser from "./components/AllUsers/AllUser"
import Unauthorized from "./components/Unauthorized/Unauthorized"
import { useContext } from "react"
import AuthContext from "./context/authContext"
const App = ()=> {
  const {auth} = useContext(AuthContext)
  return (
    <Routes>
      {/* Public */}
      <Route path='/' element={auth ? <UserLink/> : <Home/>}/>
      <Route path='/login' element={auth? <Navigate to={"/"} replace/> : <Login/>}/>
      <Route path='/register' element={auth ? <Navigate to={"/"} replace/> : <Register/> }/>
      <Route path='/register/invite/:referr' element={auth ? <Navigate to={"/"} replace/> : <Register/>}/>
      <Route path="/unauthorized" element={<Unauthorized/>}/>
      {/* Private */}
      <Route element={<RequireAuth allowedRoles={AllowCodes.admin}/>}>
        <Route path='/admin' element={<AllUser/>}/>
      </Route>
      {/* Get not found */}
      <Route path='*'/>
    </Routes>
  )
}

export default App
