import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./Settings.css";
import { userContext } from "../../Context/Context";
export default function Settings() {
  const { user, setUser } = React.useContext(userContext);
  const [file, setFile] = React.useState(null);
  const [username, setUsername] = React.useState(user.username);
  const [email, setEmail] = React.useState(user.email);
  const [password, setPassword] = React.useState(user.password);
  const [success, setSuccess] = React.useState(false);
  const publicFolder = "http://localhost:5000/images/";

  //////////////////////////////
  const handleSubmit = async event => {
    try {
      event.preventDefault();
      let fileName = "";
      const data = new FormData();

      if (file) {
        fileName = Date.now() + file.name;
        data.append("name", fileName);
        data.append("file", file);
      }
      await fetch("/api/upload", {
        method: "POST",
        body: data
      });
      const profileImageName = file ? fileName : user.profilePic;
      const updatedUser = {
        userID: user._id,
        username,
        email,
        password,
        profilePic: profileImageName
      };
      const res = await fetch("/api/user/" + user._id, {
        method: "PUT",
        body: JSON.stringify(updatedUser),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const newUser = await res.json();
      setUser(newUser);
      setSuccess(true);
    } catch (err) {
      console.log(err);
    }
  };

  ///////////////////////////////

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update your account</span>
          <span className="settingsDeleteTitle">Delete account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsProfilePicture">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : publicFolder + user.profilePic
              }
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon fa-regular fa-user"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={event => setFile(event.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={event => {
              setUsername(event.target.value);
            }}
          />
          <label>email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={event => setEmail(event.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={event => setPassword(event.target.value)}
          />
          <button className="settingsSubmit" type="submit">
            Update
          </button>
          {success && (
            <h1 style={{ color: "green", textAlign: "center", margin: "20px" }}>
              Profile Updated Seccessfully!
            </h1>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
