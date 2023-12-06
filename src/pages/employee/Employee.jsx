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
import { isEmptyNullUndefined, isNumber } from "../../common/core.js";

import Header from "../../components/header/Header.jsx";
import Footer from "../../components/footer/Footer.jsx";
import Loading from "../../components/loading/Loading.jsx";

import "./style.scss";
import {
  GET_ALL_EMPLOYEE,
  GET_ALL_DEPARTMENT,
  GET_ALL_POSITION,
  DELETE_EMPLOYEE_BY_ID,
  UPDATE_EMPLOYEE_BY_ID,
  CREATE_EMPLOYEE,
} from "../service.js";
import setting from "../../setting.js";

export default function Employee() {
  const [loading, setLoading] = useState(false);
  const [listEmployee, setListEmployee] = useState([]);
  const [listPosition, setListPosition] = useState([]);
  const [listDepartment, setListDepartment] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState("");
  const [formData, setFormData] = useState({
    id: "",
    hoTen: "",
    gioiTinh: "",
    ngaySinh: "",
    soCCCD: "",
    diaChi: "",
    maPhongBan: 0,
    maChucVu: 0,
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const columns = [
    { field: "id", headerName: "Mã", width: 100 },
    { field: "hoTen", headerName: "Tên", width: 150 },
    { field: "gioiTinh", headerName: "Giới tính", width: 150 },
    { field: "ngaySinh", headerName: "Ngày sinh", width: 150 },
    { field: "soCCCD", headerName: "Số CCCD", width: 150 },
    { field: "diaChi", headerName: "Địa chỉ", width: 150 },
    { field: "tenPhongBan", headerName: "Tên phòng ban", width: 200 },
    { field: "tenChucVu", headerName: "Tên chức vụ", width: 150 },
    {
      field: "",
      headerName: "Thao tác",
      sortable: false,
      filterable: false,
      resizable: false,
      width: 200,
      renderCell: params => (
        <div className="d-flex justify-content-center w-100">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() =>
              handleDialog(setting.ACTION.OPEN, setting.ACTION.UPDATE, params)
            }
          >
            <FontAwesomeIcon className="icon-add mr-5" icon="fas fa-pencil" />
            Sửa
          </button>
          <button
            type="button"
            className="ml-10 btn btn-danger"
            onClick={() =>
              handleDialog(setting.ACTION.CLOSE, setting.ACTION.DELETE, params)
            }
          >
            <FontAwesomeIcon className="icon-add mr-5" icon="fas fa-trash" />
            Xóa
          </button>
        </div>
      ),
    },
  ];

  const update = async () => {
    setOpen(false);

    if (isEmptyNullUndefined(formData.hoTen)) {
      error("Bạn chưa nhập tên!");
      return;
    }

    if (isEmptyNullUndefined(formData.gioiTinh)) {
      error("Bạn chưa chọn giới tính!");
      return;
    }

    if (isEmptyNullUndefined(formData.ngaySinh)) {
      error("Bạn chưa chọn ngày sinh!");
      return;
    }

    if (isEmptyNullUndefined(formData.soCCCD)) {
      error("Bạn chưa nhập số CCCD!");
      return;
    }

    if (isEmptyNullUndefined(formData.diaChi)) {
      error("Bạn chưa nhập địa chỉ!");
      return;
    }

    if (isNumber(formData.maPhongBan)) {
      error("Bạn chưa chọn phòng ban!");
      return;
    }

    if (isNumber(formData.maChucVu)) {
      error("Bạn chưa chọn chức vụ!");
      return;
    }

    setLoading(true);
    await UPDATE_EMPLOYEE_BY_ID(formData).then(res => {
      setLoading(false);
      if (res.status === setting.STATUS_CODE.OK) {
        success(res.data.msg);
        getAllEmployee();
      } else {
        error(res.data.msg);
      }
    });
  };

  const create = async () => {
    setOpen(false);

    if (isEmptyNullUndefined(formData.hoTen)) {
      error("Bạn chưa nhập tên!");
      return;
    }

    if (isEmptyNullUndefined(formData.gioiTinh)) {
      error("Bạn chưa chọn giới tính!");
      return;
    }

    if (isEmptyNullUndefined(formData.ngaySinh)) {
      error("Bạn chưa chọn ngày sinh!");
      return;
    }

    if (isEmptyNullUndefined(formData.soCCCD)) {
      error("Bạn chưa nhập số CCCD!");
      return;
    }

    if (isEmptyNullUndefined(formData.diaChi)) {
      error("Bạn chưa nhập địa chỉ!");
      return;
    }

    if (isNumber(formData.maPhongBan)) {
      error("Bạn chưa chọn phòng ban!");
      return;
    }

    if (isNumber(formData.maChucVu)) {
      error("Bạn chưa chọn chức vụ!");
      return;
    }
    setLoading(true);

    await CREATE_EMPLOYEE(formData).then(res => {
      setLoading(false);
      if (res.status === setting.STATUS_CODE.OK) {
        success(res.data.msg);
        getAllEmployee();
      } else {
        error(res.data.msg);
      }
    });
  };

  const handleDialog = async (status, action, data) => {
    switch (action) {
      case setting.ACTION.ADD:
        if (status === setting.ACTION.OPEN) {
          setFormData({
            id: "",
            hoTen: "",
            gioiTinh: "",
            ngaySinh: "",
            soCCCD: "",
            diaChi: "",
            maPhongBan: 0,
            maChucVu: 0,
          });
        }
        break;
      case setting.ACTION.UPDATE:
        if (status === setting.ACTION.OPEN) {
          setFormData(data.row);
        } else {
          setFormData({
            id: "",
            hoTen: "",
            gioiTinh: "",
            ngaySinh: "",
            soCCCD: "",
            diaChi: "",
            maPhongBan: 0,
            maChucVu: 0,
          });
        }
        break;
      case setting.ACTION.DELETE:
        confirmDialog("Bạn muốn xóa sản phẩm này!").then(async result => {
          if (result.value) {
            setLoading(true);
            await DELETE_EMPLOYEE_BY_ID(data.id).then(res => {
              setLoading(false);
              if (res.status === setting.STATUS_CODE.OK) {
                success(res.data.msg);
                getAllEmployee();
              } else {
                error(res.data.msg);
              }
            });
          }
        });
        break;
    }
    setAction(action);
    setOpen(status);
  };

  const getAllEmployee = async () => {
    try {
      setLoading(true);
      let listEmployees;
      await GET_ALL_EMPLOYEE().then(res => {
        setLoading(false);
        if (res.status === setting.STATUS_CODE.OK) {
          listEmployees = res.data.data.map(e => {
            return {
              ...e,
              ngaySinh: e.ngaySinh
                ? dayjs(e.ngaySinh).format("YYYY-MM-DD")
                : "",
            };
          });
          setListEmployee(listEmployees);
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const getAllDepartment = async () => {
    try {
      setLoading(true);
      let listDepartment;
      await GET_ALL_DEPARTMENT().then(res => {
        setLoading(false);
        if (res.status === setting.STATUS_CODE.OK) {
          listDepartment = res.data.data;
          setListDepartment(listDepartment);
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const getAllPosition = async () => {
    try {
      setLoading(true);
      let listPosition;
      await GET_ALL_POSITION().then(res => {
        setLoading(false);
        if (res.status === setting.STATUS_CODE.OK) {
          listPosition = res.data.data;
          setListPosition(listPosition);
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      getAllDepartment();
      getAllPosition();
      getAllEmployee();
    }, 500);
  }, []);

  return (
    <div className="container-fluid m-0 p-0 wrap-home bg-lazy">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <div className="container-sm">
            <div className="d-flex justify-content-between mt-20">
              <span className="fw-700 pl-10 title-page font-30">
                Quản lý hồ sơ nhân viên
              </span>
              <button
                type="button"
                className="ml-10 btn btn-primary"
                onClick={() =>
                  handleDialog(setting.ACTION.OPEN, setting.ACTION.ADD, {})
                }
              >
                <FontAwesomeIcon className="icon-add mr-5" icon="fas fa-plus" />
                Thêm mới
              </button>
            </div>

            <div className="mt-20" style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={listEmployee}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                disableColumnSelector
              />
            </div>
          </div>
          <Dialog
            open={open}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>
              {`${
                action === setting.ACTION.ADD
                  ? "Thêm"
                  : action === setting.ACTION.UPDATE
                  ? "Sửa"
                  : "Xóa"
              } nhân viên`}
            </DialogTitle>
            <DialogContent>
              <div className="row">
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="hoTen">Tên nhân viên</label>
                  <input
                    type="text"
                    className="form-control"
                    name="hoTen"
                    value={formData.hoTen}
                    placeholder="Nhập tên nhân viên"
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
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="ngaySinh">Ngày sinh</label>
                  <input
                    type="date"
                    name="ngaySinh"
                    value={formData.ngaySinh}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Nhập ngày sinh"
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
                <div className="col-md-6 mt-10">
                  <label htmlFor="maChucVu">Chức vụ</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={formData.maChucVu}
                    onChange={handleInputChange}
                    name="maChucVu"
                  >
                    <option value="">Chọn chức vụ</option>
                    {listPosition.map(e => (
                      <option key={e.id} name={e.id} value={e.id}>
                        {e.tenChucVu}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6 mt-10">
                  <label htmlFor="maPhongBan">Phòng ban</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={formData.maPhongBan}
                    onChange={handleInputChange}
                    name="maPhongBan"
                  >
                    <option value="">Chọn phòng ban</option>
                    {listDepartment.map(e => (
                      <option key={e.id} name={e.id} value={e.id}>
                        {e.tenPhongBan}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => handleDialog(setting.ACTION.CLOSE, "", {})}
              >
                Hủy
              </Button>
              {action === setting.ACTION.ADD ? (
                <Button onClick={() => create()}>Thêm mới</Button>
              ) : (
                <Button onClick={() => update()}>Lưu</Button>
              )}
            </DialogActions>
          </Dialog>
          <Footer />
        </>
      )}
    </div>
  );
}
