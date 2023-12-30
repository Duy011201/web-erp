import React, { useState, useEffect } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { error, success } from "/src/common/sweetalert2.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "../../../components/loading/Loading";
import { REGISTER, CREATE_REGISTER } from "../../service.js";
import { isEmptyNullUndefined } from "../../../common/core.js";
import setting from "../../../setting.js";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rePassword: "",
  });

  const handleSubmit = async e => {
    e.preventDefault();

    if (isEmptyNullUndefined(formData.email)) {
      error("Bạn chưa nhập email!");
      return;
    }

    if (isEmptyNullUndefined(formData.password)) {
      error("Bạn chưa nhập mật khẩu!");
      return;
    }

    if (formData.rePassword !== formData.password) {
      error("Mật khẩu không khớp!");
      return;
    }

    if (formData.password.length < 5 || formData.password.length > 20) {
      error("Mật khẩu phải lớn hơn 5 ký tự hoặc nhỏ hơn 20 ký tự!");
      return;
    }

    await REGISTER(formData).then(async res => {
      setLoading(false);
      if (res.data.data.length > 0) {
        error("Tài khoản đã tồn tại!");
        return;
      } else {
        await CREATE_REGISTER(formData).then(res => {
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
      className="container-fluid d-flex justify-content-center align-items-center vh-100 wrap-register bg-lazy"
      data-bg-src="/src/assets/images/bg-auth.jpg"
    >
      {loading ? (
        <Loading />
      ) : (
        <div className="wrap-content p-5 rounded">
          <h2 className="text-center">Register</h2>
          <form onSubmit={handleSubmit}>
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
              <FontAwesomeIcon
                className="icon-email position-absolute"
                icon="fas fa-envelope"
              />
            </div>
            <div className="form-group mt-10 position-relative">
              <label htmlFor="inputPassword">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="form-control"
                id="inputPassword"
                placeholder="Nhập mật khẩu"
                required
              />
              <FontAwesomeIcon
                className="icon-password position-absolute"
                icon="fas fa-lock"
              />
            </div>
            <div className="form-group mt-10 position-relative">
              <label htmlFor="inputRePassword">RePassword</label>
              <input
                type="text"
                name="rePassword"
                value={formData.rePassword}
                onChange={handleInputChange}
                className="form-control"
                id="inputRePassword"
                placeholder="Nhập lại mật khẩu"
                required
              />
              <FontAwesomeIcon
                className="icon-repassword position-absolute"
                icon="fas fa-lock"
              />
            </div>
            <div className="form-check mt-10 font-16">
              <input
                type="checkbox"
                className="form-check-input"
                id="checkbox"
              />
              <small className="form-text text-muted form-check-label">
                I agree to the terms & conditions
              </small>
            </div>
            <button type="submit" className="btn btn-primary mt-10 w-100">
              Register
            </button>
            <small className="form-text text-muted form-check-label mt-10 text-center d-block">
              Already have an account?
              <Link className="text-decoration-underline ml-5" to="/login">
                Login
              </Link>
            </small>
          </form>
        </div>
      )}
    </div>
  );
}
