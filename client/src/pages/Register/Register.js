import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(false);
  //  const profilePic = "Default_Profile_Image.jpg";
  const handleSubmit = async event => {
    try {
      event.preventDefault();
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password }),
        Cache: "default"
      });
      const data = await res.json();
      data._id ? window.location.replace("/login") : setError(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="register" onSubmit={handleSubmit}>
        <span className="registerTitle">Register</span>
        <form className="registerForm">
          <label>Username</label>
          <input
            type="text"
            className="registerInput"
            placeholder="Enter your username..."
            onChange={event => setUsername(event.target.value)}
          />
          <label className="registerFormLabel">Email</label>
          <input
            type="text"
            className="registerInput"
            placeholder="Enter your email..."
            onChange={event => setEmail(event.target.value)}
          />
          <label className="registerFormLabel">Password</label>
          <input
            type="password"
            className="registerInput"
            placeholder="Enter your password..."
            onChange={event => setPassword(event.target.value)}
          />
          <button className="registerButton" type="submit">
            Register
          </button>
          <button className="registerLoginButton">
            <Link className="link" to="/login">
              Login
            </Link>
          </button>
          {error && (
            <span className="somethingwentwrong">Something Went Wrong!</span>
          )}
        </form>
      </div>
    </div>
  );
}
