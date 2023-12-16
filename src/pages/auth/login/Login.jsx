import React, { useState, useEffect } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { error, success } from "/src/common/sweetalert2.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "../../../components/loading/Loading";
import { CHECK_LOGIN } from "../../service.js";
import { isEmptyNullUndefined } from "../../../common/core.js";
import setting from "../../../setting.js";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

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

    await CHECK_LOGIN(formData).then(res => {
      setLoading(false);
      if (res.data.data.length > 0) {
        localStorage.setItem("role", res.data.data[0].quyen);
        localStorage.setItem(
          "user",
          JSON.stringify({ id: res.data.data[0].id })
        );
        window.location = "/";
        success(res.data.msg);
      } else {
        error("Tài khoản hoặc mật khẩu không chính xác!");
        return;
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
      className="container-fluid d-flex justify-content-center align-items-center vh-100 wrap-login bg-lazy"
      data-bg-src="/src/assets/images/bg-auth.jpg"
    >
      {loading ? (
        <Loading />
      ) : (
        <div className="wrap-content p-5 rounded">
          <h2 className="text-center">Login</h2>
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
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
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
                placeholder="Nhập mật mật"
                required
              />
              <FontAwesomeIcon
                className="icon-password position-absolute"
                icon="fas fa-lock"
              />
            </div>
            <div className="d-flex align-items-center justify-content-between mt-10">
              <div className="form-check font-16">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="checkbox"
                />
                <small className="form-text text-muted form-check-label">
                  Remember me
                </small>
              </div>

              <Link className="text-decoration-underline" to="/forgot-password">
                <small className="form-text text-muted form-check-label">
                  Forgot password?
                </small>
              </Link>
            </div>
            <button type="submit" className="btn btn-primary mt-10 w-100">
              Login
            </button>
            <small className="form-text text-muted form-check-label mt-10">
              Don't have an account?
              <Link className="text-decoration-underline ml-5" to="/register">
                Register
              </Link>
            </small>
          </form>
        </div>
      )}
    </div>
  );
}
