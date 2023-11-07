import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import "./style.scss";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`container-fluid m-0 p-0 wrap-header d-flex justify-content-around align-items-center ${
        scrolled ? "scrolled" : ""
      }`}
    >
      <div className="wrap-logo">
        <Link to="/">
          <img src="" />
          Logo
        </Link>
      </div>
      <ul className="wrap-navbar d-flex gap-4">
        <li>
          <Link to="/workflow" className="text-uppercase fw-500">
            Workflow
          </Link>
        </li>
        <li>
          <Link to="#home" className="text-uppercase fw-500">
            Home
          </Link>
        </li>
        <li>
          <Link to="#home" className="text-uppercase fw-500">
            Home
          </Link>
        </li>
        <li>
          <Link to="#home" className="text-uppercase fw-500">
            Home
          </Link>
        </li>
      </ul>
      <Link to="/login">
        <button className="wrap-auth">Login</button>
      </Link>
      <Outlet />
    </div>
  );
}
