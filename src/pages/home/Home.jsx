import React, { useState, useEffect } from "react";
import Footer from "../../components/footer/Footer";
import Loading from "../../components/loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.scss";
import { Link } from "react-router-dom";
import setting from "../../setting.js";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setRole(localStorage.getItem("role"));
    }, 500);
  }, []);

  return (
    <div className="container-fluid m-0 p-0 wrap-home vh-100 bg-lazy">
      {loading ? (
        <Loading />
      ) : (
        <>
          {role === setting.ROLE_TYPE.USER.code ? (
            <>
              <header>Bạn chưa được cấp quyền sử dụng hệ thống</header>
            </>
          ) : (
            <>
              <header>Chào mừng bạn trở lại</header>
              <div className="container">
                <Link to="/dashboard">
                  <FontAwesomeIcon
                    className="icon-user mt-15"
                    icon="fas fa-users"
                    title="Hệ thống quản lý nhân viên"
                  />
                </Link>
                <Link to="/dashboard">
                  <FontAwesomeIcon
                    className="icon-warehouse mt-15"
                    icon="fas fa-warehouse"
                    title="Hệ thống quản lý kho"
                  />
                </Link>
              </div>
            </>
          )}
          <Footer />
        </>
      )}
    </div>
  );
}
