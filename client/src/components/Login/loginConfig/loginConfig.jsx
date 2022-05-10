import * as Yup from "yup";


const initialValue = {email:"",password:""}

const Schema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
  });


const errorHandler = (errors)=>{
    return{
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