import classNames from "classnames";
import loginImg from "../../assets/images/login.jpg";
import styles from "./Auth.module.scss";
const cx = classNames.bind(styles);
const Login = () => {
  return (
    <section className={`container  ${cx("auth")}`}>
      <div className={cx("img")}>
        <img src={loginImg} alt="Login" />
      </div>
      <div className={cx("form")}>
        <h2>Login</h2>
        <form>
          <input type="text" placeholder="Email" required />
          <br />
          <input type="password" placeholder="Password" required />
          <button className="--btn">Login</button>
        </form>
      </div>
    </section>
  );
};

export default Login;
