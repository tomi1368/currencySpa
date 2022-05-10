import { Formik, Field, Form } from "formik";
import { useNavigate } from "react-router-dom";
import {
  initialValue,
  Schema,
  errorHandler,
} from "./registerConfig/registerConfig";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { registerRequest } from "./registerConfig/registerRequest";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.scss";
const Register = ({invite}) => {
  const navigate = useNavigate();
  const {referr} = useParams()
  const registerSubmit = async (value) => {
    const { ok } = await registerRequest(value,referr);
    if (ok) {
      navigate("/login");
    } else {
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
  };

  return (
    <>
      <ToastContainer />
      <div className="register">
        <Formik
          initialValues={initialValue}
          validationSchema={Schema}
          validateOnChange={false}
          validateOnBlur={false}
          validateOnMount={false}
          onSubmit={registerSubmit}
        >
          {({ errors }) => {
            return (
              <Form className="register-form">
                <h1>Register</h1>
                <Field
                  name="username"
                  className="register-form__field"
                  placeholder="Enter name..."
                />
                {errorHandler(errors).username()}
                <Field
                  name="email"
                  className="register-form__field"
                  placeholder="Enter email..."
                />
                {errorHandler(errors).email()}
                <Field
                  name="password"
                  className="register-form__field"
                  type="password"
                  placeholder="Enter your Password..."
                />
                {errorHandler(errors).password()}
                <Field
                  name="address"
                  className="register-form__field"
                  placeholder="Enter your Address..."
                />
                <Field
                  className="register-form__field"
                  as="select"
                  name="gender"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Field>
                <button type="submit">Sign-Up</button>
                <Link to={"/"}>Go Home</Link>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default Register;
