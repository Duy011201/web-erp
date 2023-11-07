import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Loading from "../../components/loading/Loading";
import appConfig from "/src/config/appConfig.js";
import isEmptyNullUndefined from "/src/common/core.js";
import "./style.scss";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEmptyNullUndefined(appConfig.appLocalStorage)) {
      window.location = "/login";
      return;
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, []);

  return (
    <div
      className="container-fluid m-0 p-0 wrap-home vh-100 bg-lazy wrap-dashboard"
      data-bg-src="/src/assets/images/bg-dashboard.jpg"
    >
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <h1>Dashboard</h1>
          <Footer />
        </>
      )}
    </div>
  );
}
