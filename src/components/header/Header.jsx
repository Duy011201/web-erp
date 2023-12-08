import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./style.scss";
import setting from "../../setting.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
  const [role, setRole] = useState("");
  useEffect(() => {
    // localStorage.setItem("role", "admin");
    localStorage.setItem("role", "store");
    // localStorage.setItem("role", "employee");

    localStorage.setItem("user", JSON.stringify({ id: 1 }));
    setRole(setting.ROLE_LOCAL);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg wrap-header">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          {role === "admin"
            ? "ERP"
            : role === "employee"
            ? "Hệ thống quản lý nhân viên"
            : "Hệ thống quản lý kho"}
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
            {role === "admin" ? (
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
            {role === "employee" || role === "admin" ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Tài khoản
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Nhân viên
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/employee">
                        Hồ sơ nhân viên
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/reward-discipline">
                        Khen thưởng - Kỷ luật
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        Quá trình công tác
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        Chức vụ
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        Trình độ học vấn
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <></>
            )}
          </ul>
          {role === "admin" || role === "store" ? (
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Kho
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/store">
                        Kho
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/warehouse-receipt">
                        Nhập kho
                      </Link>
                    </li>

                    <li>
                      <Link className="dropdown-item" to="#">
                        Xuất kho
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/product">
                        Sản phẩm
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/material">
                        Nguyên vật liệu
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          ) : (
            <></>
          )}
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
