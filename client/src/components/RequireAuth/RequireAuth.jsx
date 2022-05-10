import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../../context/authContext";
import { useContext } from "react";

const RequireAuth = ({ allowedRoles }) => {
  const {auth} = useContext(AuthContext)

  const auto = ()=> allowedRoles.includes(auth.role) 
  return auto ? (
    <Outlet />
  ) : isLogged ? (
    <Navigate to={"/unauthorized"} replace/>
  ) : (
    <Navigate to={"/login"} replace/>
  );
};

export default RequireAuth