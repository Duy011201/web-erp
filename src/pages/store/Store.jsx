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
  GET_ALL_STORE,
  DELETE_STORE_BY_ID,
  UPDATE_STORE_BY_ID,
  CREATE_STORE,
} from "../service.js";
import setting from "../../setting.js";

export default function Store() {
  const [loading, setLoading] = useState(false);
  const [listStore, setListStore] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState("");
  const [formData, setFormData] = useState({
    id: "",
    loaiKho: "",
    tenKho: "",
    diaChi: "",
    trangThai: "",
  });
  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const columns = [
    { field: "id", headerName: "Mã Kho", width: 120 },
    { field: "tenKho", headerName: "Tên kho", width: 200 },
    { field: "diaChi", headerName: "Địa chỉ", width: 250 },
    {
      field: "trangThai",
      headerName: "Trạng thái",
      width: 150,
      renderCell: params => (
        <div
          style={{
            color:
              params.value === setting.STORE_STATUS.EMPTY.code
                ? "orange"
                : params.value === setting.STORE_STATUS.IN_USE.code
                ? "green"
                : "yellow",
          }}
        >
          {params.value && params.value === setting.STORE_STATUS.EMPTY.code
            ? setting.STORE_STATUS.EMPTY.name
            : params.value && params.value === setting.STORE_STATUS.IN_USE.code
            ? setting.STORE_STATUS.IN_USE.name
            : setting.STORE_STATUS.FULL.name}
        </div>
      ),
    },
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

  const updateStore = async () => {
    setOpen(false);

    if (isEmptyNullUndefined(formData.tenKho)) {
      error("Bạn chưa nhập tên kho!");
      return;
    }

    if (isEmptyNullUndefined(formData.diaChi)) {
      error("Bạn chưa nhập địa chỉ kho!");
      return;
    }

    if (isEmptyNullUndefined(formData.trangThai)) {
      error("Bạn chưa chọn trạng thái kho!");
      return;
    }

    if (isEmptyNullUndefined(formData.loaiKho)) {
      error("Bạn chưa chọn kho!");
      return;
    }

    setLoading(true);
    await UPDATE_STORE_BY_ID(formData).then(res => {
      setLoading(false);
      if (res.status === setting.STATUS_CODE.OK) {
        success(res.data.msg);
        getALLStore();
      } else {
        error(res.data.msg);
      }
    });
  };

  const createStore = async () => {
    setOpen(false);

    if (isEmptyNullUndefined(formData.tenKho)) {
      error("Bạn chưa nhập tên kho!");
      return;
    }

    if (isEmptyNullUndefined(formData.diaChi)) {
      error("Bạn chưa nhập địa chỉ kho!");
      return;
    }

    if (isEmptyNullUndefined(formData.trangThai)) {
      error("Bạn chưa chọn trạng thái kho!");
      return;
    }

    if (isEmptyNullUndefined(formData.loaiKho)) {
      error("Bạn chưa chọn kho!");
      return;
    }
    setLoading(true);

    await CREATE_STORE(formData).then(res => {
      setLoading(false);
      if (res.status === setting.STATUS_CODE.OK) {
        success(res.data.msg);
        getALLStore();
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
            loaiKho: "",
            tenKho: "",
            diaChi: "",
            trangThai: "",
          });
        }
        break;
      case setting.ACTION.UPDATE:
        if (status === setting.ACTION.OPEN) {
          setFormData(data.row);
        } else {
          setFormData({
            id: "",
            loaiKho: "",
            tenKho: "",
            diaChi: "",
            trangThai: "",
          });
        }
        break;
      case setting.ACTION.DELETE:
        confirmDialog("Bạn muốn xóa kho này!").then(async result => {
          if (result.value) {
            setLoading(true);
            await DELETE_STORE_BY_ID(data.id).then(res => {
              setLoading(false);
              if (res.status === setting.STATUS_CODE.OK) {
                success(res.data.msg);
                getALLStore();
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

  const getALLStore = async () => {
    try {
      setLoading(true);
      let listStore;
      await GET_ALL_STORE().then(res => {
        setLoading(false);
        if (res.status === setting.STATUS_CODE.OK) {
          listStore = res.data.data;
          setListStore(listStore);
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
      getALLStore();
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
                Quản lý kho
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
                rows={listStore}
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
              } kho`}
            </DialogTitle>
            <DialogContent>
              <div className="row">
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="tenKho">Tên Kho</label>
                  <input
                    type="text"
                    className="form-control"
                    name="tenKho"
                    value={formData.tenKho}
                    placeholder="Nhập tên kho"
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
              </div>
              <div className="row">
                <div className="col-md-6 mt-10">
                  <label htmlFor="trangThai">Trạng Thái</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={formData.trangThai}
                    onChange={handleInputChange}
                    name="trangThai"
                  >
                    <option value="" disabled>
                      Chọn trạng thái
                    </option>
                    {Object.values(setting.STORE_STATUS).map(store => (
                      <option key={store.code} value={store.code}>
                        {store.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6 mt-10">
                  <label htmlFor="loaiKho">Trạng Thái</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={formData.loaiKho}
                    onChange={handleInputChange}
                    name="loaiKho"
                  >
                    <option value="">Chọn loại kho</option>
                    {Object.values(setting.STORE_TYPE).map(store => (
                      <option key={store.code} value={store.code}>
                        {store.name}
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
                <Button onClick={() => createStore()}>Thêm mới</Button>
              ) : (
                <Button onClick={() => updateStore()}>Lưu</Button>
              )}
            </DialogActions>
          </Dialog>
          <Footer />
        </>
      )}
    </div>
  );
}
