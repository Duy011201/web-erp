import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Loading from "../../components/loading/Loading";
import "./style.scss";

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
          <Header />
          Home page
          <Footer />
        </>
      )}
    </div>
  );
}
