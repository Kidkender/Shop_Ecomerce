import Slider from "~/components/slider/Slider";
import styles from "./Home.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Home = () => {
  return (
    <div>
      <Slider />
    </div>
  );
};

export default Home;
