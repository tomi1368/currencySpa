import * as Yup from "yup";


const initialValue = {username:"",email:"",password:"",gender:"Male",address:""}

const Schema = Yup.object().shape({
    username:Yup.string()
    .required("Username is required")
    .min(6, "Username must be at least 6 characters")
    .max(40, "Username must not exceed 40 characters"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    gender: Yup.string(),
    address:Yup.string()
  });


const errorHandler = (errors)=>{
    return{
        username(){
            return (
                errors.username && <div>{errors.username}</div>
            )
        },
        email(){
            return (
                errors.email && <div>{errors.email}</div>
            )
        },
        password(){
            return (
                errors.password && <div>{errors.password}</div>
            )
        }
    }
}

export {errorHandler,Schema,initialValue}