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
  GET_ALL_POSITION,
  GET_ALL_DEPARTMENT,
  DELETE_POSITION_BY_ID,
  UPDATE_POSITION_BY_ID,
  CREATE_POSITION,
} from "../service.js";
import setting from "../../setting.js";

export default function Position() {
  const [loading, setLoading] = useState(false);
  const [listPosition, setListPosition] = useState([]);
  const [listDepartment, setListDepartment] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState("");
  const [formData, setFormData] = useState({
    id: "",
    tenChucVu: "",
    trangThai: "",
    maPhongBan: "",
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
    { field: "tenChucVu", headerName: "Tên Chức Vụ", width: 150 },
    { field: "trangThai", headerName: "Trạng Thái", width: 150 },
    { field: "maPhongBan", headerName: "Mã Phòng Ban", width: 150 },

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

  const updatePosition = async () => {
    setOpen(false);

    if (isEmptyNullUndefined(formData.tenChucVu)) {
        error("Bạn chưa nhập tên chức vụ!");
        return;
      }
  
      if (isEmptyNullUndefined(formData.trangThai)) {
        error("Bạn chưa nhập trạng thái!");
        return;
      }
  
      if (isEmptyNullUndefined(formData.maPhongBan)) {
        error("Bạn chưa nhập mã phòng ban!");
        return;
      }
    setLoading(true);
    await UPDATE_POSITION_BY_ID(formData).then(res => {
      setLoading(false);
      if (res.status === setting.STATUS_CODE.OK) {
        success(res.data.msg);
        getAllPosition();
        getAllDepartment();
      } else {
        error(res.data.msg);
      }
    });
  };

  const createPosition = async () => {
    setOpen(false);
    if (isEmptyNullUndefined(formData.tenChucVu)) {
        error("Bạn chưa nhập tên chức vụ!");
        return;
      }
  
      if (isEmptyNullUndefined(formData.trangThai)) {
        error("Bạn chưa nhập trạng thái!");
        return;
      }
  
      if (isEmptyNullUndefined(formData.maPhongBan)) {
        error("Bạn chưa nhập mã phòng ban!");
        return;
      }
    setLoading(true);

    await CREATE_POSITION(formData).then(res => {
      setLoading(false);
      if (res.status === setting.STATUS_CODE.OK) {
        success(res.data.msg);
        getAllPosition();
        getAllDepartment();
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
            tenChucVu: "",
            trangThai: "",
            maPhongBan: "",
          });
        }
        break;
      case setting.ACTION.UPDATE:
        if (status === setting.ACTION.OPEN) {
          setFormData(data.row);
        } else {
          setFormData({
            id: "",
            tenChucVu: "",
            trangThai: "",
            maPhongBan: "",
          });
        }
        break;
      case setting.ACTION.DELETE:
        confirmDialog("Bạn muốn xóa chức vụ này không!").then(
          async result => {
            if (result.value) {
              setLoading(true);
              await DELETE_POSITION_BY_ID(data.id).then(res => {
                setLoading(false);
                if (res.status === setting.STATUS_CODE.OK) {
                  success(res.data.msg);
                  getAllPosition();
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
      getAllPosition();
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
                Quản lý Chức Vụ

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
                rows={listPosition}
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
              } chức vụ`}
            </DialogTitle>
            <DialogContent>
            <div className="row">
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="tenChucVu">Tên Chức Vụ</label>
                  <input
                    type="text"
                    className="form-control"
                    name="tenChucVu"
                    value={formData.tenChucVu}
                    placeholder="Nhập Tên Chức Vụ"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="trangThai">Trạng thái</label>
                  <input
                    type="text"
                    name="trangThai"
                    value={formData.trangThai}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Trạng thái"
                    required
                  />
                </div>
                <div className="col-md-6 mt-10">
                  <label htmlFor="maPhongBan">Phòng Ban</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={formData.maPhongBan}
                    onChange={handleInputChange}
                    name="maPhongBan"
                  >
                    <option value="">Chọn phòng ban</option>
                    {listDepartment.map(Department => (
                      <option key={Department.id} name={Department.id} value={Department.id}>
                        {Department.tenPhongBan}
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
                <Button onClick={() => createPosition()}>Thêm mới</Button>
              ) : (
                <Button onClick={() => updatePosition()}>Lưu</Button>
              )}
            </DialogActions>
          </Dialog>
          <Footer />
        </>
      )}
    </div>
  );
}
