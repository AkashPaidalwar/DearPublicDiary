import React, { useRef } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { userContext } from "../../Context/Context";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { setUser } = React.useContext(userContext);
  const [loginSuccess, setLoginSuccess] = React.useState(true);

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const credentials = {
        username: userRef.current.value,
        password: passwordRef.current.value
      };
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
      });
      const userFound = await res.json();
      userFound._id && setUser(userFound);
      if (!userFound._id) {
        setLoginSuccess(false);
      }
    } catch {
      console.log("Something is wrong");
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleLogin}>
        <label className="loginFormLabel">Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your username..."
          ref={userRef}
        />
        <label className="loginFormLabel">Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit">
          Login
        </button>
        <button className="loginRegisterButton">
          <Link className="link" to="/register">
            Register
          </Link>
        </button>
      </form>
      {!loginSuccess && (
        <span style={{ margin: "25px", color: "red", fontSize: "25px" }}>
          Incorrect Username or Password
        </span>
      )}
    </div>
  );
}
