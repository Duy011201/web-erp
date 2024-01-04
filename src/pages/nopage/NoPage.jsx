import React, { useState, useEffect } from "react";
import "./style.scss";

export default function NoPage() {
  const [count, setCount] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      if (count > 0) {
        setCount(count - 1);
      } else {
        clearInterval(timer);
        window.location = "/login";
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [count]);

  return (
    <div className="container-fluid m-0 p-0 wrap-home vh-100 bg-lazy d-flex justify-content-center align-items-center">
      <div>
        <h3 className="text-center text-danger">
          Trang này không tồn tại hoặc bạn không có quyền truy cập!
        </h3>
        <h3 className="mt-2">
          Hệ thống sẽ tự động chuyển về trang đăng nhập sau {count}s
        </h3>
      </div>
    </div>
  );
}
