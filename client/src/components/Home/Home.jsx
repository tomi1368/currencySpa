import { Link } from "react-router-dom";
import "./Home.scss"
const Home = () => {
  return (
    <>
      <nav className="nav">
        <div className="nav-logo">
          <img src="https://getonbrd-prod.s3.amazonaws.com/uploads/users/logo/5695/logo-SII2.jpg" alt="" />
        </div>
        <div className="nav-links">
          <Link className="nav-links__link" to={"/login"}>Login</Link>
          <Link className="nav-links__link" to={"/register"}>SignUp</Link>
        </div>
      </nav>
      <main className="main">
        <div className="main-img">
          <img src="https://media-exp1.licdn.com/dms/image/C4D0BAQFDFoqLuZFq1A/company-logo_200_200/0/1623333813854?e=2147483647&v=beta&t=Ur1e1vST9B1nYicLjCm4VNpJng-uiyaha4dABqSoVds" alt="" />
        </div>
        <h1 className="main-title">Welcome to Currency SPA!</h1>
      </main>
    </>
  );
};

export default Home;
