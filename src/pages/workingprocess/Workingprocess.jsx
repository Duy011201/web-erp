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
  GET_ALL_WORKINGPROCESS,
  DELETE_WORKINGPROCESS_BY_ID,
  UPDATE_WORKINGPROCESS_BY_ID,
  CREATE_WORKINGPROCESS,
} from "../service.js";
import setting from "../../setting.js";

export default function WorkingProcess() {
  const [loading, setLoading] = useState(false);
  const [listWorkingProcess, setListWorkingProcess] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState("");
  const [formData, setFormData] = useState({
    id: "",
    maNV: "",
    maCV: "",
    ngayBatDau: "",
    ngayKetThuc: "",
    danhGia: "",
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
    { field: "maNV", headerName: "Mã Nhân Viên", width: 150 },
    { field: "maCV", headerName: "Mã chức vụ", width: 150 },
    { field: "ngayBatDau", headerName: "Ngày Bắt Đầu", width: 150 },
    { field: "ngayKetThuc", headerName: "Ngày Kết Thúc", width: 150 },
    { field: "danhGia", headerName: "Đánh Giá", width: 150 },
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

  const updateWorkingprocess = async () => {
    setOpen(false);

    if (isEmptyNullUndefined(formData.maNV)) {
      error("Bạn chưa nhập !");
      return;
    }

    if (isEmptyNullUndefined(formData.maCV)) {
      error("Bạn chưa nhập !");
      return;
    }

    if (isEmptyNullUndefined(formData.ngayBatDau)) {
      error("Bạn chưa nhập !");
      return;
    }

    if (isNumber(formData.ngayKetThuc)) {
      error("Bạn chưa nhập!");
      return;
    }

    if (isEmptyNullUndefined(formData.danhGia)) {
      error("Bạn chưa nhập !");
      return;
    }

    setLoading(true);
    await UPDATE_WORKINGPROCESS_BY_ID(formData).then(res => {
      setLoading(false);
      if (res.status === setting.STATUS_CODE.OK) {
        success(res.data.msg);
        getAllWorkingProcess();
      } else {
        error(res.data.msg);
      }
    });
  };

  const createWorkingProcess= async () => {
    setOpen(false);

    if (isEmptyNullUndefined(formData.maNV)) {
      error("Bạn chưa nhập !");
      return;
    }

    if (isEmptyNullUndefined(formData.maCV)) {
      error("Bạn chưa nhập !");
      return;
    }

    if (isEmptyNullUndefined(formData.ngayBatDau)) {
      error("Bạn chưa nhập !");
      return;
    }

    if (isNumber(formData.ngayKetThuc)) {
      error("Bạn chưa nhập!");
      return;
    }

    if (isEmptyNullUndefined(formData.danhGia)) {
      error("Bạn chưa nhập !");
      return;
    }
    setLoading(true);

    await CREATE_WORKINGPROCESS(formData).then(res => {
      setLoading(false);
      if (res.status === setting.STATUS_CODE.OK) {
        success(res.data.msg);
        getAllWorkingProcess();
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
            maNV: "",
            maCV: "",
            ngayBatDau: "",
            ngayKetThuc: "",
            danhGia: "",
          });
        }
        break;
      case setting.ACTION.UPDATE:
        if (status === setting.ACTION.OPEN) {
          setFormData(data.row);
        } else {
          setFormData({
            id: "",
            maNV: "",
            maCV: "",
            ngayBatDau: "",
            ngayKetThuc: "",
            danhGia: "",
          });
        }
        break;
      case setting.ACTION.DELETE:
        confirmDialog("Bạn muốn xóa quản lý này!").then(
          async result => {
            if (result.value) {
              setLoading(true);
              await DELETE_WORKINGPROCESS_BY_ID(data.id).then(res => {
                setLoading(false);
                if (res.status === setting.STATUS_CODE.OK) {
                  success(res.data.msg);
                  getAllWorkingProcess();
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

  const getAllWorkingProcess = async () => {
    try {
      setLoading(true);
      let listWorkingProcess;
      await GET_ALL_WORKINGPROCESS().then(res => {
        setLoading(false);
        if (res.status === setting.STATUS_CODE.OK) {
          listWorkingProcess = res.data.data;
          setListWorkingProcess(listWorkingProcess);
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
      getAllWorkingProcess();
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
                Quản lý quá trình công tác
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
                rows={listWorkingProcess}
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
              } Quá Trình Công Tác`}
            </DialogTitle>
            <DialogContent>
              <div className="row">
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="maNV">Mã Nhân Viên</label>
                  <input
                    type="text"
                    className="form-control"
                    name="maNV"
                    value={formData.maNV}
                    placeholder="Nhập Mã Nhân Viên"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="maCV">Mã Chức Vụ</label>
                  <input
                    type="text"
                    name="maCV"
                    value={formData.maCV}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Nhập Mã Chức Vụ"
                    required
                  />
                </div>
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="ngayBatDau">Ngày bắt đầu</label>
                  <input
                    type="text"
                    className="form-control"
                    name="ngayBatDau"
                    value={formData.ngayBatDau}
                    placeholder="Nhập Ngày bắt đầu"
                    onChange={handleInputChange}
                    required
                  />
                </div>               
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="ngayKetThuc">Ngày Kết thúc</label>
                  <input
                    type="text"
                    name="ngayKetThuc"
                    value={formData.ngayKetThuc}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Nhập Ngày Kết thúc"                 
                    required
                  />
                </div>
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="danhGia">Đánh giá</label>
                  <input
                    type="text"
                    name="danhGia"
                    value={formData.danhGia}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Nhập đánh giá"
                  
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
                <Button onClick={() => createWorkingProcess()}>Thêm mới</Button>
              ) : (
                <Button onClick={() => updateWorkingprocess()}>Lưu</Button>
              )}
            </DialogActions>
          </Dialog>
          <Footer />
        </>
      )}
    </div>
  );
}
