import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Loading from "../../components/loading/Loading";
import "./style.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import setting from "../../setting.js";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("role", "ADMIN");
      setRole(setting.ROLE_LOCAL);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="container-fluid m-0 p-0 vh-100 bg-lazy">
      {loading ? (
        <Loading />
      ) : (
        <div className="wrap-dashboard">
          <Header />
          <div className="container mt-20">
            {role === setting.ROLE_TYPE.EMPLOYEE.code ||
            role === setting.ROLE_TYPE.ADMIN.code ? (
              <div className="d-flex gap-3">
                <Link className="wrap-item" to="/employee">
                  <FontAwesomeIcon
                    className="icon"
                    icon="fas fa-user"
                    title="Hồ sơ nhân viên"
                  />
                  <span>Hồ sơ nhân viên</span>
                </Link>

                <Link className="wrap-item" to="/reward-discipline">
                  <FontAwesomeIcon
                    className="icon"
                    icon="fas fa-scale-balanced"
                    title="Khen thưởng - Kỷ luật"
                  />
                  <span>Khen thưởng - Kỷ luật</span>
                </Link>

                <Link className="wrap-item" to="#">
                  <FontAwesomeIcon
                    className="icon"
                    icon="fas fa-business-time"
                    title="Quá trình công tác"
                  />
                  <span>Quá trình công tác</span>
                </Link>

                <Link className="wrap-item" to="#">
                  <FontAwesomeIcon
                    className="icon"
                    icon="fas fa-sitemap"
                    title="Chức vụ"
                  />
                  <span>Chức vụ</span>
                </Link>

                <Link className="wrap-item" to="#">
                  <FontAwesomeIcon
                    className="icon"
                    icon="fas fa-certificate"
                    title="Trình độ học vấn"
                  />
                  <span>Trình độ học vấn</span>
                </Link>
              </div>
            ) : (
              <></>
            )}
            {role === setting.ROLE_TYPE.ADMIN.code ||
            role === setting.ROLE_TYPE.STORE.code ? (
              <div className="d-flex gap-3">
                <Link className="wrap-item" to="/store">
                  <FontAwesomeIcon
                    className="icon"
                    icon="fas fa-warehouse"
                    title="Kho"
                  />
                  <span>Kho</span>
                </Link>

                <Link className="wrap-item" to="/warehouse-receipt">
                  <FontAwesomeIcon
                    className="icon"
                    icon="fas fa-warehouse"
                    title="Nhập kho"
                  />
                  <span>Nhập kho</span>
                </Link>

                <Link className="wrap-item" to="/warehouse-export">
                  <FontAwesomeIcon
                    className="icon"
                    icon="fas fa-warehouse"
                    title="Xuất kho"
                  />
                  <span>Xuất kho</span>
                </Link>

                <Link className="wrap-item" to="/product">
                  <FontAwesomeIcon
                    className="icon"
                    icon="fas fa-square"
                    title="Sản phẩm"
                  />
                  <span>Sản phẩm</span>
                </Link>

                <Link className="wrap-item" to="/material">
                  <FontAwesomeIcon
                    className="icon"
                    icon="fas fa-recycle"
                    title="Nguyên vật liệu"
                  />
                  <span>Nguyên vật liệu</span>
                </Link>
              </div>
            ) : (
              <></>
            )}
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}
