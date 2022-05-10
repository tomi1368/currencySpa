import { Formik, Field, Form } from "formik";
import {useNavigate } from "react-router-dom";
import { initialValue, Schema, errorHandler } from "./loginConfig/loginConfig";
import loginRequest from "./loginConfig/loginRequest";
import { Link } from "react-router-dom";
import { useContext } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Login.scss";
import AuthContext from "../../context/authContext";
const Login = () => {
  const navigate = useNavigate()
  const {auth,setAuth}= useContext(AuthContext)
  const loginSubmit = async (v)=>{
    const {data,ok} = await loginRequest(v)
    if(ok){
        localStorage.setItem("user-currency",JSON.stringify(data.user))
        setAuth(data.user)
        navigate("/")
    }else{
        toast.error('Error to login', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }
  }

  return (
    <>
    <ToastContainer/>
    <div className="login">
      <Formik
        initialValues={initialValue}
        validationSchema={Schema}
        validateOnChange={false}
        validateOnBlur={false}
        validateOnMount={false}
        onSubmit={loginSubmit}
      >
        {({ errors }) => {
          return (
            <Form className="login-form">
              <h1>Login</h1>
              <Field
                name="email"
                className="login-form__field"
                placeholder="Enter email..."
              />
              {errorHandler(errors).email()}
              <Field
                name="password"
                className="login-form__field"
                type="password"
                placeholder="Enter your Password..."
              />
              {errorHandler(errors).password()}
              <button type="submit">Sign-In</button>
              <Link to={"/"}>Go Home</Link>
            </Form>
          );
        }}
      </Formik>
    </div>
    </>
  );
};

export default Login;
