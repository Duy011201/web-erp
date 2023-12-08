import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Loading from "../../components/loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.scss";
import { Link, Outlet } from "react-router-dom";

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
        <body className="wrap-home">
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
          <Footer />
        </body>
      )}
    </div>
  );
}
