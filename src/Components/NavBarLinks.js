import { Link } from "react-router-dom";

const NavBarLinks = ({ isValidUser, setIsValidUser, setIsAdmin }) => {
  return (
    <div>
      <ul id="header-nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        {isValidUser ? (
          <li>
            <Link
              to="/"
              onClick={() => {
                setIsValidUser(false);
                setIsAdmin(false);
              }}
            >
              Sign Out
            </Link>
          </li>
        ) : (
          <li>
            <Link to="/sign-in">Sign in</Link>
          </li>
        )}
        <li>
          <Link
            to="/sign-up"
            // onClick={onSignUp}
          >
            Sign up
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBarLinks;
