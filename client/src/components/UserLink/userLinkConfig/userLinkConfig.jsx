import * as Yup from "yup";


const initialValue = {email:"",name:""}

const Schema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    name: Yup.string()
      .required("User is required")
      .min(6, "User must be at least 6 characters")
      .max(40, "User must not exceed 40 characters"),
  });


const errorHandler = (errors)=>{
    return{
        email(){
            return (
                errors.email && <div>{errors.email}</div>
            )
        },
        name(){
            return (
                errors.name && <div>{errors.name}</div>
            )
        }
    }
}

export {errorHandler,Schema,initialValue}