import React, { useState, useEffect } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { error, success } from "/src/common/sweetalert2.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "../../../components/loading/Loading";
import { REGISTER, UPDATE_PASSWORD } from "../../service";
import setting from "../../../setting.js";

export default function Forgot() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [verifyCode, setVerifyCode] = useState({
    isCode: false,
  });

  const handleSubmit = async e => {
    e.preventDefault();
    await REGISTER(formData).then(async res => {
      setLoading(false);
      if (res.data.data.length === 0) {
        error("Tài khoản không tồn tại!");
        return;
      } else {
        const data = res.data.data[0];
        if (verifyCode.isCode === false) {
          console.log(res.data.data[0]);
          setVerifyCode({ isCode: true });
          return;
        } else {
          await UPDATE_PASSWORD({
            id: data.maTK,
            password: formData.password,
          }).then(res => {
            setLoading(false);
            if (res.data.status === setting.STATUS_CODE.OK) {
              window.location = "/login";
              success(res.data.msg);
              return;
            } else {
              error("Có lỗi xảy ra vui lòng thử lại sau!");
              return;
            }
          });
        }
      }
    });
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center vh-100 wrap-forgot bg-lazy"
      data-bg-src="/src/assets/images/bg-auth.jpg"
    >
      {loading ? (
        <Loading />
      ) : (
        <div className="wrap-content p-5 rounded">
          <h2 className="text-center">Forgot Password</h2>
          <form onSubmit={handleSubmit} className="mt-10">
            <div className="form-group mt-10 position-relative">
              <label htmlFor="inputEmail">Email address</label>
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                name="email"
                value={formData.email}
                aria-describedby="emailHelp"
                placeholder="Nhập email"
                onChange={handleInputChange}
                required
              />
              <small id="emailHelp" className="form-text text-muted">
                Enter verification email to change password.
              </small>
              <FontAwesomeIcon
                className="icon-email position-absolute"
                icon="fas fa-envelope"
              />
            </div>
            {verifyCode.isCode ? (
              <div className="form-group mt-10 position-relative">
                <label htmlFor="inputPassword">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="form-control"
                  id="inputPassword"
                  placeholder="Nhập mật khẩu mới"
                  required
                />
                <FontAwesomeIcon
                  className="icon-password position-absolute"
                  icon="fas fa-lock"
                />
              </div>
            ) : null}
            <button type="submit" className="btn btn-primary mt-10 w-100">
              {verifyCode.isCode ? "Forgot" : "Verify Code"}
            </button>
            <p className="mt-10 text-center">
              Already have an account?{" "}
              <Link className="text-decoration-underline" to="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      )}
    </div>
  );
}
