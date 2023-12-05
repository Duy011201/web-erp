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
import {
  GET_ALL_REWARD_DISCIPLINE,
  GET_ALL_EMPLOYEE,
  DELETE_REWARD_DISCIPLINE_BY_ID,
  UPDATE_REWARD_DISCIPLINE_BY_ID,
  CREATE_REWARD_DISCIPLINE,
} from "../service.js";
import setting from "../../setting.js";

export default function RewardDiscipline() {
  const [loading, setLoading] = useState(false);
  const [listEmployee, setListEmployee] = useState([]);
  const [listRewardDiscipline, setListRewardDiscipline] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState("");
  const [formData, setFormData] = useState({
    id: "",
    maNV: "",
    hinhThuc: "",
    lyDo: "",
    ngayKTKL: "",
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
    { field: "maNV", headerName: "Mã nhân viên", width: 150 },
    { field: "hoTen", headerName: "Tên nhân viên", width: 150 },
    { field: "hinhThuc", headerName: "Hình thức", width: 150 },
    { field: "lyDo", headerName: "Lý do", width: 200 },
    { field: "ngayKTKL", headerName: "Ngày", width: 150 },
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

    if (isEmptyNullUndefined(formData.maNV)) {
      error("Bạn chưa chọn nhân viên!");
      return;
    }

    if (isEmptyNullUndefined(formData.hinhThuc)) {
      error("Bạn chưa nhập hình thức!");
      return;
    }

    if (isEmptyNullUndefined(formData.lyDo)) {
      error("Bạn chưa nhập lý do!");
      return;
    }

    if (isEmptyNullUndefined(formData.ngayKTKL)) {
      error("Bạn chưa chọn ngày!");
      return;
    }

    setLoading(true);
    await UPDATE_REWARD_DISCIPLINE_BY_ID(formData).then(res => {
      setLoading(false);
      if (res.status === setting.STATUS_CODE.OK) {
        success(res.data.msg);
        getAllRewardDiscipline();
      } else {
        error(res.data.msg);
      }
    });
  };

  const create = async () => {
    setOpen(false);

    if (isEmptyNullUndefined(formData.maNV)) {
      error("Bạn chưa chọn nhân viên!");
      return;
    }

    if (isEmptyNullUndefined(formData.hinhThuc)) {
      error("Bạn chưa nhập hình thức!");
      return;
    }

    if (isEmptyNullUndefined(formData.lyDo)) {
      error("Bạn chưa nhập lý do!");
      return;
    }

    if (isEmptyNullUndefined(formData.ngayKTKL)) {
      error("Bạn chưa chọn ngày!");
      return;
    }
    setLoading(true);

    await CREATE_REWARD_DISCIPLINE(formData).then(res => {
      setLoading(false);
      if (res.status === setting.STATUS_CODE.OK) {
        success(res.data.msg);
        getAllRewardDiscipline();
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
            hinhThuc: "",
            lyDo: "",
            ngayKTKL: "",
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
            hinhThuc: "",
            lyDo: "",
            ngayKTKL: "",
          });
        }
        break;
      case setting.ACTION.DELETE:
        confirmDialog("Bạn muốn xóa khen thưởng hoặc kỷ luật này!").then(
          async result => {
            if (result.value) {
              setLoading(true);
              await DELETE_REWARD_DISCIPLINE_BY_ID(data.id).then(res => {
                setLoading(false);
                if (res.status === setting.STATUS_CODE.OK) {
                  success(res.data.msg);
                  getAllRewardDiscipline();
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

  const getAllRewardDiscipline = async () => {
    try {
      setLoading(true);
      let listRewardDiscipline;
      await GET_ALL_REWARD_DISCIPLINE().then(res => {
        setLoading(false);
        if (res.status === setting.STATUS_CODE.OK) {
          listRewardDiscipline = res.data.data.map(e => {
            return {
              ...e,
              ngayKTKL: e.ngayKTKL
                ? dayjs(e.ngayKTKL).format("YYYY-MM-DD")
                : "",
            };
          });
          setListRewardDiscipline(listRewardDiscipline);
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const getAllEmployee = async () => {
    try {
      setLoading(true);
      let listEmployee;
      await GET_ALL_EMPLOYEE().then(res => {
        setLoading(false);
        if (res.status === setting.STATUS_CODE.OK) {
          listEmployee = res.data.data;
          setListEmployee(listEmployee);
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
      getAllEmployee();
      getAllRewardDiscipline();
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
                Quản lý khen thưởng kỷ luật
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
                rows={listRewardDiscipline}
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
              } khen thưởng - kỷ luật`}
            </DialogTitle>
            <DialogContent>
              <div className="row">
                <div className="col-md-6 mt-10">
                  <label htmlFor="hinhThuc">Hình thức</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={formData.hinhThuc}
                    onChange={handleInputChange}
                    name="hinhThuc"
                  >
                    <option value="">Chọn hình thức</option>
                    {Object.values(setting.REWARD_DISCIPLINE_TYPE).map(
                      store => (
                        <option key={store.code} value={store.code}>
                          {store.name}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="lyDo">Lý do</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lyDo"
                    value={formData.lyDo}
                    placeholder="Nhập lý do"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6 mt-10">
                  <label htmlFor="maNV">Nhân viên</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={formData.maNV}
                    onChange={handleInputChange}
                    name="maNV"
                  >
                    <option value="">Chọn nhân viên</option>
                    {listEmployee.map(e => (
                      <option key={e.id} name={e.id} value={e.id}>
                        {e.hoTen}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="ngayKTKL">Ngày {}</label>
                  <input
                    type="date"
                    name="ngayKTKL"
                    value={formData.ngayKTKL}
                    onChange={handleInputChange}
                    className="form-control"
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
