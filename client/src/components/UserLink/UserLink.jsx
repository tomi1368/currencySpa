import { Formik, Field, Form } from "formik";
import { useState,useContext } from "react";
import { createLink } from "./userLinkConfig/linkRequest";
import { initialValue,Schema,errorHandler} from "./userLinkConfig/userLinkConfig";
import { ToastContainer, toast } from "react-toastify";
import AuthContext from "../../context/authContext";
import "react-toastify/dist/ReactToastify.css";
import "./UserLink.scss"
const UserLink = () => {
  const [link,setLink] = useState(null)
  const {auth} = useContext(AuthContext)
  const fetchLink = async (value,token)=>{
    console.log(value,token)
    try {
      const {data} = await createLink(value,token)
      setLink(data.link)
    } catch (error) {
      toast.error("Error to register", {
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
    <ToastContainer></ToastContainer>
    <Formik
    initialValues={initialValue}
    validationSchema={Schema}
    validateOnChange={false}
    validateOnBlur={false}
    validateOnMount={false}
    onSubmit={(v)=>fetchLink(v,auth.token)}
  >
    {({ errors }) => {
      return (
        <div className="referral">
        <Form className="referral-form">
          <h1>Generate Link</h1>
          <Field
            name="email"
            className="referral-form__field"
            placeholder="Enter email..."
          />
          {errorHandler(errors).email()}
          <Field
            name="name"
            className="referral-form__field"
            placeholder="Enter your Name..."
          />
          {errorHandler(errors).name()}
          <button type="submit">Compartir</button>
        </Form>
        {link && <div><a target="_blank" href={link}>{link}</a></div>}
        </div>
      );
    }}
  </Formik>
  </>
  )
}

export default UserLink