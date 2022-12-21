import React from "react";
import "./Contact.css";
import myImage from "./Akash.png";
export default function Contact() {
  return (
    <div className="mainContainer">
      <div className="textContainer">
        <p>Hey there,</p>
        <p>
          I am Akash Paidalwar and this website is created by me for showcasing
          my web development skills but the website is fully functional and you
          can add your blog on it if you want to and I will be happy to read it.
        </p>
        <p>
          To have a look at more such cool projects by me please visit my
          portfolio website here
        </p>
      </div>
      <div className="MyPIContainer">
        <img className="PIImage" src={myImage} alt=""></img>
      </div>
    </div>
  );
}
