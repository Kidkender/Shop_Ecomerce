import { PropTypes } from "prop-types";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "~/redux/slice/authSlice";

const ShowOnLogIn = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (isLoggedIn) {
    return children;
  }

  return null;
};
export const ShowOnLogOut = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (!isLoggedIn) {
    return children;
  }

  return null;
};
ShowOnLogIn.propTypes = {
  children: PropTypes.object,
};

export default ShowOnLogIn;
