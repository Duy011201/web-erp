import React, { useState, useEffect } from "react";
import "./style.scss";

export default function NoPage() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      if (count < 10) {
        setCount(count + 1);
      } else {
        clearInterval(timer);
        window.location = "/login";
      }
    }, 1000);

    // Xóa hẹn giờ khi component bị unmounted
    return () => {
      clearInterval(timer);
    };
  }, [count]);

  return (
    <div className="container-fluid m-0 p-0 wrap-home vh-100 bg-lazy">
      Countdown: {count}
    </div>
  );
}
