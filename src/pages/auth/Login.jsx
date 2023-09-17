import classNames from "classnames/bind";
import loginImg from "~/assets/images/login.jpg";
import styles from "./Auth.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { Card, Loader } from "~/components";
import { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "~/firebase/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const cx = classNames.bind(styles);
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setIsLoading(false);
        navigate("/");
        toast.success("Login Successfully...");
        console.log(user);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };
  //Login google

  const provider = new GoogleAuthProvider();

  const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log("token user", user);
        toast.success("Login Successfully...");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <ToastContainer />

      {isLoading && <Loader />}
      <section className={`container ${cx("auth")}`}>
        <div className={cx("img")}>
          <img src={loginImg} alt="Login" width="400" />
        </div>

        <div className={cx("form")}>
          <h2>Login</h2>
          <Card>
            <form onSubmit={loginUser}>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                placeholder="Password"
                required
              />

              <button type="submit" className="--btn --btn-primary --btn-block">
                Login
              </button>
              <div className={cx("links")}>
                <Link to="/reset">Reset Password</Link>
              </div>
              <p>---or---</p>
              <button
                type="submit"
                onClick={loginWithGoogle}
                className="--btn --btn-danger --btn-block"
              >
                <FaGoogle color="#fff" />
                &nbsp; Login With Google
              </button>
              <span className={cx("register")}>
                <p>Dont't have an account</p>
                <Link to="/register">Register</Link>
              </span>
            </form>
          </Card>
        </div>
      </section>
    </>
  );
};

export default Login;
