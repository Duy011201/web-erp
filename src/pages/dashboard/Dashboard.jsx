import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Loading from "../../components/loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.scss";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="container-fluid m-0 p-0 vh-100 bg-lazy">
      {loading ? (
        <Loading />
      ) : (
        <body className="wrap-dashboard">
          <Header></Header>
          <div className="container">ERP</div>
          <Footer />
        </body>
      )}
    </div>
  );
}
