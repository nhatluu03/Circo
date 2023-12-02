import React from "react";
import { NavLink } from "react-router-dom";
import "./Layout.scss";

const Layout = ({ children, showSidebar }) => {
  return (
    <div className="app-container">
      <nav className="navbar">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/page1">Page 1</NavLink>
        <NavLink to="/page2">Page 2</NavLink>
        {/* Add more links as needed */}
      </nav>
      {showSidebar && <div className="sidebar">Sidebar Content</div>}
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;
