import React, { useState, useEffect } from "react";
import Footer from "../../components/footer/Footer";
import Loading from "../../components/loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.scss";
import { Link } from "react-router-dom";
import setting from "../../setting.js";

export default function Home() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="container-fluid m-0 p-0 wrap-home vh-100 bg-lazy">
      {loading ? (
        <Loading />
      ) : (
        <>
          {setting.ROLE_LOCAL === setting.ROLE_TYPE.USER.code ? (
            <header>Bạn chưa được cấp quyền sử dụng hệ thống</header>
          ) : (
            <>
              <header>Chào mừng bạn trở lại</header>
              <div className="container">
                <div className="d-flex gap-3">
                  <Link className="wrap-item" to="/dashboard">
                    <FontAwesomeIcon
                      className="icon mt-15"
                      icon="fas fa-users"
                      title="Hệ thống quản lý nhân viên"
                    />
                    <span>Hệ thống quản lý nhân viên</span>
                  </Link>

                  <Link className="wrap-item" to="/dashboard">
                    <Link to="/dashboard">
                      <FontAwesomeIcon
                        className="icon mt-15"
                        icon="fas fa-warehouse"
                        title="Hệ thống quản lý kho"
                      />
                    </Link>
                    <span>Hệ thống quản lý kho</span>
                  </Link>
                </div>
              </div>
            </>
          )}
          <Footer />
        </>
      )}
    </div>
  );
}
