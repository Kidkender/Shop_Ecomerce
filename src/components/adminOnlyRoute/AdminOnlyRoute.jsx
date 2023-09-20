import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectEmail } from "~/redux/slice/authSlice";

const AdminOnlyRoute = ({ children }) => {
  const userEmail = useSelector(selectEmail);
  if (userEmail === "kidkender@gmail.com") {
    return children;
  }

  return (
    <section style={{ height: "80vh" }}>
      <div className="container">
        <h2>Permission Denied</h2>
        <p>This page can only be accessed by admins.</p>\
        <br />
        <Link to="/">
          <button className="--btn">&larr; Back to home </button>
        </Link>
      </div>
    </section>
  );
};

export const AdminOnlyLink = ({ children }) => {
  const userEmail = useSelector(selectEmail);
  if (userEmail === "kidkender@gmail.com") {
    return children;
  }
  return null;
};

AdminOnlyRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

AdminOnlyLink.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
export default AdminOnlyRoute;
