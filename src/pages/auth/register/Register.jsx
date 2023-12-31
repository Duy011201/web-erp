import React, { useState, useEffect } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { error, success } from "/src/common/sweetalert2.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "../../../components/loading/Loading";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleSubmit = e => {
    e.preventDefault();
    if (
      formData.email === "nguyenduy011201@gmail.com" &&
      formData.password === "123" &&
      formData.username
    ) {
      success("Register Success");
      window.location = "/login";
      return;
    } else {
      error("Register Failed");
      return;
    }
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
              <label htmlFor="inputUsername">Username</label>
              <input
                type="text"
                name="username"
                value={formData.password}
                onChange={handleInputChange}
                className="form-control"
                id="inputUsername"
                placeholder="Username"
                required
              />
              <FontAwesomeIcon
                className="icon-username position-absolute"
                icon="fas fa-user"
              />
            </div>
            <div className="form-group mt-10 position-relative">
              <label htmlFor="inputEmail">Email address</label>
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                name="email"
                value={formData.email}
                aria-describedby="emailHelp"
                placeholder="Enter email"
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
                placeholder="Password"
                required
              />
              <FontAwesomeIcon
                className="icon-password position-absolute"
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
