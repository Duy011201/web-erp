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
  DELETE_DEPARTMENT_BY_ID,
  UPDATE_DEPARTMENT_BY_ID,
  CREATE_DEPARTMENT,
  GET_ALL_DEPARTMENT,
} from "../service.js";
import setting from "../../setting.js";

export default function Department() {
  const [loading, setLoading] = useState(false);
  const [listDepartment, setListDepartment] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState("");
  const [formData, setFormData] = useState({
    id: "",
    tenPhongBan: "",
    diaChi: "",
    soDienThoai: "",
    email: "",
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
    { field: "tenPhongBan", headerName: "Tên Phòng Ban", width: 150 },
    { field: "diaChi", headerName: "Địa Chỉ", width: 150 },
    { field: "soDienThoai", headerName: "Số Điện Thoại", width: 150 },
    { field: "email", headerName: "Email", width: 150 },
    
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

  const updateDepartment = async () => {
    setOpen(false);

    if (isEmptyNullUndefined(formData.tenPhongBan)) {
      error("Bạn chưa nhập tên phòng ban!");
      return;
    }

    if (isEmptyNullUndefined(formData.diaChi)) {
      error("Bạn chưa nhập địa chỉ!");
      return;
    }

    if (isNumber(formData.soDienThoai)) {
      error("Sai định dạng số số điện thoại!");
      return;
    }

    if (isEmptyNullUndefined(formData.email)) {
      error("Bạn chưa nhập email!");
      return;
    }

    setLoading(true);
    await UPDATE_DEPARTMENT_BY_ID(formData).then(res => {
      setLoading(false);
      if (res.status === setting.STATUS_CODE.OK) {
        success(res.data.msg);
        getAllDepartment();
      } else {
        error(res.data.msg);
      }
    });
  };

  const createDepartment = async () => {
    setOpen(false);

    if (isEmptyNullUndefined(formData.tenPhongBan)) {
      error("Bạn chưa nhập tên phòng ban!");
      return;
    }

    if (isEmptyNullUndefined(formData.diaChi)) {
      error("Bạn chưa nhập địa chỉ!");
      return;
    }

    if (isNumber(formData.soDienThoai)) {
      error("Sai định dạng số số điện thoại!");
      return;
    }

    if (isEmptyNullUndefined(formData.email)) {
      error("Bạn chưa nhập email!");
      return;
    }
    setLoading(true);

    await CREATE_DEPARTMENT(formData).then(res => {
      setLoading(false);
      if (res.status === setting.STATUS_CODE.OK) {
        success(res.data.msg);
        getAllDepartment();
        getAllStore();
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
            tenPhongBan: "",
            diaChi: "",
            soDienThoai: "",
            email: "",
          });
        }
        break;
      case setting.ACTION.UPDATE:
        if (status === setting.ACTION.OPEN) {
          setFormData(data.row);
        } else {
          setFormData({
            id: "",
            tenPhongBan: "",
            diaChi: "",
            soDienThoai: "",
            email: "",
          });
        }
        break;
      case setting.ACTION.DELETE:
        confirmDialog("Bạn muốn xóa phòng ban này!").then(
          async result => {
            if (result.value) {
              setLoading(true);
              await DELETE_DEPARTMENT_BY_ID(data.id).then(res => {
                setLoading(false);
                if (res.status === setting.STATUS_CODE.OK) {
                  success(res.data.msg);
                  getAllDepartment();
                } else {
                  error(res.data.msg);
                }
              });
            }
          }
        );
        break;
    }
    setAction(action);
    setOpen(status);
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

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      getAllDepartment();
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
                Quản lý phòng ban
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
                rows={listDepartment}
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
              } phòng ban`}
            </DialogTitle>
            <DialogContent>
            <div className="row">
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="tenPhongBan">Phòng Ban</label>
                  <input
                    type="text"
                    className="form-control"
                    name="tenPhongBan"
                    value={formData.tenPhongBan}
                    placeholder="Nhập Phòng Ban"
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
                  <label htmlFor="soDienThoai">Số Điện Thoại</label>
                  <input
                    type="text"
                    className="form-control"
                    name="soDienThoai"
                    value={formData.soDienThoai}
                    placeholder="Nhập Số Điện Thoại"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Nhập email"                   
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
              {action === setting.ACTION.ADD ? (
                <Button onClick={() => createDepartment()}>Thêm mới</Button>
              ) : (
                <Button onClick={() => updateDepartment()}>Lưu</Button>
              )}
            </DialogActions>
          </Dialog>
          <Footer />
        </>
      )}
    </div>
  );
}
