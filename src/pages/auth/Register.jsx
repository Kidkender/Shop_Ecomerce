import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import RegisterImg from "~/assets/images/register.jpg";
import { Card, Loader } from "~/components";

import { useState } from "react";
import styles from "./Auth.module.scss";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "~/firebase/config";
import httpRequest from "~/utils/httpRequest";

const cx = classNames.bind(styles);
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [Cpassword, setCpassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();

    if (password !== Cpassword) {
      toast.error("Passwords do not match.");
      return;
    }
    setIsLoading(true);

    try {
      const res = await httpRequest.post("/auth/signup", {
        email,
        password,
      });
      setIsLoading(false);
      console.log("IdToken", res);
      navigate("/");
      toast.success("Register successfully...");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }

    // createUserWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     const user = userCredential.user;
    //     // console.log(user);
    //     setIsLoading(false);
    //     toast.success("Registration Successful...");
    //     navigate("/login");
    //   })

    //   .catch((error) => {
    //     toast.error(error.message);
    //     setIsLoading(false);
    //   });
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${cx("auth")}`}>
        <div className={cx("form")}>
          <h2>Register</h2>
          <Card>
            <form onSubmit={registerUser}>
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setpassword(e.target.value)}
                pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                onInvalid={(e) => {
                  e.target.setCustomValidity(
                    "Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
                  );
                }}
                onInput={(e) => e.target.setCustomValidity("")}
                required
              />

              <input
                type="password"
                value={Cpassword}
                onChange={(e) => setCpassword(e.target.value)}
                placeholder="Confirm Password"
                required
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Register
              </button>
            </form>
            <span className={cx("register")}>
              <p>Already an account ?</p>
              <Link to="/login">&nbsp; Login</Link>
            </span>
          </Card>
        </div>
        <div className={cx("img")}>
          <img src={RegisterImg} alt="Register" width="400" />
        </div>
      </section>
    </>
  );
};

export default Register;
