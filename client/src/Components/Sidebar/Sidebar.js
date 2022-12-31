import React from "react";
import "./Sidebar.css";
export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <div className="titleContainer">
          <span className="websiteTitle">Dear</span>
          <span className="websiteTitle">Public</span>
          <span className="websiteTitle">Diary....</span>
        </div>
        <span className="sidebarTitle">Write Your Heart Out</span>
        <div className="sideTalkDiv">
          <p className="sidebarTalks">Hello,</p>
          <p className="sidebarTalks">I am Akash Paidalwar</p>
          <p className="sidebarTalks">
            Dear public diary is my portfolio project. This website is for
            educational purpose only. the website however is fully functional
            and you can register and start putting your blogs on the site. I
            will be happy to read blogs from you.
          </p>
          <p className="sidebarTalks">
            I am looking for a job opportunity as a web developer. Please feel
            free to contact me at below mentioned details
          </p>
          <p className="sidebarTalks">Email: paidalwar.akash@gmail.com</p>
          <p className="sidebarTalks">Ph: 9923525658</p>
        </div>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
      </div>
      <div className="sidebarSocial">
        <a
          className="socialIconLinks"
          href="https://www.facebook.com/paidalwar.akash"
          target="_blink"
        >
          <i class="sidebarIcon fa-brands fa-square-facebook"></i>
        </a>
        <a
          className="socialIconLinks"
          href="https://www.twitter.com"
          target="_blink"
        >
          <i class="sidebarIcon fa-brands fa-square-twitter"></i>
        </a>
        <a
          className="socialIconLinks"
          href="https://www.linkedin.com/in/akash-paidalwar-456238b0/"
          target="_blink"
        >
          <i class="sidebarIcon fa-brands fa-linkedin"></i>
        </a>
        <a
          className="socialIconLinks"
          href="https://github.com/AkashPaidalwar"
          target="_blink"
        >
          <i class="sidebarIcon fa-brands fa-github"></i>
        </a>
      </div>
    </div>
  );
}
