import React from "react";
import { Link } from "react-router-dom";
import "./TopBar.css";
import { userContext } from "../../Context/Context";

export default function TopBar() {
  const { user, setUser } = React.useContext(userContext);
  const publicFolder = "images/";

  const handleLogout = () => {
    setUser(null);
  };
  return (
    <div className="top">
      <div className="topLeft">
        <i class="topIcon fa-brands fa-square-facebook"></i>
        <i class="topIcon fa-brands fa-square-twitter"></i>
        <i class="topIcon fa-brands fa-square-instagram"></i>
        <i class="topIcon fa-brands fa-square-pinterest"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>

          <li className="topListItem">
            <Link className="link" to="/contact">
              CONTACT
            </Link>
          </li>

          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>

          <li className="topListItem">
            <Link className="link" to="/login" onClick={handleLogout}>
              {user ? "LOGOUT" : ""}
            </Link>
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="/settings">
            <img
              src={publicFolder + user.profilePic}
              alt=""
              className="topImage"
            ></img>
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>

            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}

        <i class="topSearchIcon fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  );
}
