import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { error, success, confirmDialog } from "../../common/sweetalert2.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import isEmptyNullUndefined from "../../common/core.js";

import Header from "../../components/header/Header.jsx";
import Footer from "../../components/footer/Footer.jsx";
import Loading from "../../components/loading/Loading.jsx";

import "./style.scss";
import { GET_USER_BY_ID, UPDATE_USER_BY_ID } from "../service.js";
import setting from "../../setting.js";

export default function Personal() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState("");
  const [formData, setFormData] = useState({
    id: "",
    hoTen: "",
    gioiTinh: "",
    diaChi: "",
    soCCCD: "",
    maChucVu: "",
    maPhongBan: "",
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const update = async () => {
    setOpen(false);

    if (isEmptyNullUndefined(formData.hoTen)) {
      error("Bạn chưa nhập tên!");
      return;
    }

    if (isEmptyNullUndefined(formData.gioiTinh)) {
      error("Bạn chưa nhập giới tính!");
      return;
    }

    if (isEmptyNullUndefined(formData.diaChi)) {
      error("Bạn chưa nhập địa chỉ!");
      return;
    }

    if (isEmptyNullUndefined(formData.soCCCD)) {
      error("Bạn chưa nhập số CCCD!");
      return;
    }

    if (isEmptyNullUndefined(formData.maChucVu)) {
      error("Bạn chưa nhập mã chức vụ!");
      return;
    }

    if (isEmptyNullUndefined(formData.maPhongBan)) {
      error("Bạn chưa nhập mã phòng ban!");
      return;
    }

    setLoading(true);
    await UPDATE_USER_BY_ID(formData).then(res => {
      setLoading(false);
      if (res.status === setting.STATUS_CODE.OK) {
        success(res.data.msg);
        window.location = "/";
      } else {
        error(res.data.msg);
      }
    });
  };

  const handleDialog = async (status, action) => {
    setAction(action);
    setOpen(status);
    if (status === setting.ACTION.CLOSE) {
      window.location = "/";
    }
  };

  async function getUserByID() {
    try {
      setLoading(true);
      await GET_USER_BY_ID(JSON.parse(setting.USER_LOCAL).id).then(res => {
        setLoading(false);
        if (res.status === setting.STATUS_CODE.OK) {
          setFormData(res.data.data[0]);
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    handleDialog(setting.ACTION.OPEN, "");
    setTimeout(() => {
      getUserByID();
    }, 300);
  }, []);

  return (
    <div className="container-fluid m-0 p-0 wrap-home bg-lazy">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <Dialog
            open={open}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>Sửa thông tin cá nhân</DialogTitle>
            <DialogContent>
              <div className="row">
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="hoTen">Họ tên</label>
                  <input
                    type="text"
                    className="form-control"
                    name="hoTen"
                    value={formData.hoTen}
                    placeholder="Nhập họ tên"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="diaChi">Địa chỉ</label>
                  <input
                    type="text"
                    name="diaChi"
                    value={formData.diaChi}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Nhập địa chỉ"
                    required
                  />
                </div>
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="soCCCD">Số CCCD</label>
                  <input
                    type="text"
                    className="form-control"
                    name="soCCCD"
                    value={formData.soCCCD}
                    placeholder="Nhập số CCCD"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6 mt-10">
                  <label htmlFor="gioiTinh">Giới tính</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={formData.gioiTinh}
                    onChange={handleInputChange}
                    name="gioiTinh"
                  >
                    <option value="">Chọn giới tính</option>
                    {Object.values(setting.GENDER_STATUS).map(e => (
                      <option key={e.code} value={e.code}>
                        {e.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="maChucVu">Mã chức vụ</label>
                  <input
                    type="text"
                    name="maChucVu"
                    value={formData.maChucVu}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Nhập mã chức vụ"
                    disabled
                    required
                  />
                </div>
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="maPhongBan">Mã phòng ban</label>
                  <input
                    type="text"
                    name="maPhongBan"
                    value={formData.maPhongBan}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Nhập mã phòng ban"
                    disabled
                    required
                  />
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => handleDialog(setting.ACTION.CLOSE, "", {})}
              >
                Hủy
              </Button>
              <Button onClick={() => update()}>Lưu</Button>
            </DialogActions>
          </Dialog>
          <Footer />
        </>
      )}
    </div>
  );
}
