import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./style.scss";
import setting from "../../setting.js";

export default function Header() {
  const [role, setRole] = useState("");
  useEffect(() => {
    setRole(setting.ROLE_LOCAL);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg wrap-header">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/dashboard">
          {role === setting.ROLE_TYPE.ADMIN.code
            ? "ADMIN"
            : role === setting.ROLE_TYPE.EMPLOYEE.code
            ? "Hệ thống quản lý nhân sự"
            : role === setting.ROLE_TYPE.STORE.code
            ? "Hệ thống quản lý kho"
            : "USER"}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {role === setting.ROLE_TYPE.ADMIN.code ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="#">
                    Phân quyền
                  </Link>
                </li>
              </>
            ) : (
              <></>
            )}
          </ul>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Cá nhân
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/personal">
                      Thông tin cá nhân
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/login">
                      Đăng xuất
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Outlet></Outlet>
    </nav>
  );
}
