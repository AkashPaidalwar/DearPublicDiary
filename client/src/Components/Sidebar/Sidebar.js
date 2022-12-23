import React, { useEffect } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
export default function Sidebar() {
  const [cats, setCats] = React.useState([]);

   return (
    <div className="sidebar">
      <div className="sidebarItem">
        <div className="titleContainer">
          <span className="websiteTitle">Dear</span>
          <span className="websiteTitle">Public</span>
          <span className="websiteTitle">Diary....</span>
        </div>
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
              <li className="sidebarListItem">Fun</li>
              <li className="sidebarListItem">Entertainment</li>
              <li className="sidebarListItem">Movies</li>
              <li className="sidebarListItem">Life</li>
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
      </div>
      <div className="sidebarSocial">
        <i class="sidebarIcon fa-brands fa-square-facebook"></i>
        <i class="sidebarIcon fa-brands fa-square-twitter"></i>
        <i class="sidebarIcon fa-brands fa-square-instagram"></i>
        <i class="sidebarIcon fa-brands fa-square-pinterest"></i>
      </div>
    </div>
  );
}
