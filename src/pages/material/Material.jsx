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
  GET_ALL_MATERIAL,
  GET_ALL_STORE,
  DELETE_MATERIAL_BY_ID,
  UPDATE_MATERIAL_BY_ID,
  CREATE_MATERIAL,
  GET_STORE_BY_ID,
} from "../service.js";
import setting from "../../setting.js";

export default function Material() {
  const [loading, setLoading] = useState(false);
  const [listMaterial, setListMaterial] = useState([]);
  const [listStore, setListStore] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState("");
  const [formData, setFormData] = useState({
    id: "",
    tenNVL: "",
    donViTinh: "",
    soLuong: 0,
    gia: 0,
    maKho: 0,
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInputStore = async e => {
    const { name, value } = e.target;

    await GET_STORE_BY_ID(value).then(res => {
      setLoading(false);
      let store;
      if (res.status === setting.STATUS_CODE.OK) {
        store = res.data.data[0];
        if (store.trangThai === setting.STORE_STATUS.FULL.code) {
          error("Kho này đã đầy, Vui lòng chọn kho khác!");
          return;
        } else {
          setFormData(prevData => ({
            ...prevData,
            [name]: value,
          }));
        }
      }
    });
  };

  const columns = [
    { field: "id", headerName: "Mã", width: 100 },
    { field: "tenNVL", headerName: "Tên", width: 150 },
    {
      field: "donViTinh",
      headerName: "Đơn vị tính",
      width: 150,
      renderCell: params => (
        <div>
          {params.value === setting.PRODUCT_UNIT.TON.code
            ? setting.PRODUCT_UNIT.TON.name
            : setting.PRODUCT_UNIT.TA.code
            ? setting.PRODUCT_UNIT.TA.name
            : setting.PRODUCT_UNIT.YEN.code
            ? setting.PRODUCT_UNIT.YEN.name
            : setting.PRODUCT_UNIT.KG.code
            ? setting.PRODUCT_UNIT.KG.name
            : setting.PRODUCT_UNIT.GAM.code
            ? setting.PRODUCT_UNIT.GAM.name
            : setting.PRODUCT_UNIT.CAI.code
            ? setting.PRODUCT_UNIT.CAI.name
            : setting.PRODUCT_UNIT.PACKAGING.code
            ? setting.PRODUCT_UNIT.PACKAGING.name
            : setting.PRODUCT_UNIT.BAG.code
            ? setting.PRODUCT_UNIT.BAG.name
            : setting.PRODUCT_UNIT.PACKAGE.name}
        </div>
      ),
    },
    { field: "soLuong", headerName: "Số lượng", width: 150 },
    { field: "gia", headerName: "Giá", width: 150 },
    { field: "maKho", headerName: "Mã kho", width: 150 },
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

  const updateMaterial = async () => {
    if (isEmptyNullUndefined(formData.tenNVL)) {
      error("Bạn chưa nhập tên nguyên vật liệu!");
      return;
    }

    if (isEmptyNullUndefined(formData.donViTinh)) {
      error("Bạn chưa nhập đơn vị tính nguyên vật liệu!");
      return;
    }

    if (isNumber(formData.soLuong) || formData.soLuong > 100000) {
      error("Sai định dạng số lượng sản phẩm!");
      return;
    }

    if (
      isNumber(parseFloat(formData.gia)) ||
      parseFloat(formData.gia) > 10000000000
    ) {
      error("Sai định dạng giá sản phẩm!");
      return;
    }

    if (isNumber(formData.maKho)) {
      error("Bạn chưa nhập mã kho!");
      return;
    }

    setLoading(true);
    setOpen(false);
    await UPDATE_MATERIAL_BY_ID(formData).then(res => {
      setLoading(false);
      if (res.status === setting.STATUS_CODE.OK) {
        success(res.data.msg);
        getAllMaterial();
        getAllStore();
      } else {
        error(res.data.msg);
      }
    });
  };

  const createMaterial = async () => {
    if (isEmptyNullUndefined(formData.tenNVL)) {
      error("Bạn chưa nhập tên nguyên vật liệu!");
      return;
    }

    if (isEmptyNullUndefined(formData.donViTinh)) {
      error("Bạn chưa nhập đơn vị tính nguyên vật liệu!");
      return;
    }

    if (isNumber(formData.soLuong) || formData.soLuong > 100000) {
      error("Sai định dạng số lượng sản phẩm!");
      return;
    }

    if (
      isNumber(parseFloat(formData.gia)) ||
      parseFloat(formData.gia) > 10000000000
    ) {
      error("Sai định dạng giá sản phẩm!");
      return;
    }

    if (isNumber(formData.maKho)) {
      error("Bạn chưa nhập mã kho!");
      return;
    }
    setLoading(true);
    setOpen(false);

    await CREATE_MATERIAL(formData).then(res => {
      setLoading(false);
      if (res.status === setting.STATUS_CODE.OK) {
        success(res.data.msg);
        getAllMaterial();
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
            tenSP: "",
            loaiSP: "",
            donViTinh: "",
            soLuong: 0,
            gia: 0,
            maKho: 0,
          });
        }
        break;
      case setting.ACTION.UPDATE:
        if (status === setting.ACTION.OPEN) {
          setFormData(data.row);
        } else {
          setFormData({
            id: "",
            tenSP: "",
            loaiSP: "",
            donViTinh: "",
            soLuong: 0,
            gia: 0,
            maKho: 0,
          });
        }
        break;
      case setting.ACTION.DELETE:
        confirmDialog("Bạn muốn xóa nguyên vật liệu này!").then(
          async result => {
            if (result.value) {
              setLoading(true);
              await DELETE_MATERIAL_BY_ID(data.id).then(res => {
                setLoading(false);
                if (res.status === setting.STATUS_CODE.OK) {
                  success(res.data.msg);
                  getAllMaterial();
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

  const getAllMaterial = async () => {
    try {
      setLoading(true);
      let listMaterial;
      await GET_ALL_MATERIAL().then(res => {
        setLoading(false);
        if (res.status === setting.STATUS_CODE.OK) {
          listMaterial = res.data.data;
          setListMaterial(listMaterial);
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const getAllStore = async () => {
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
    if (
      setting.ROLE_LOCAL === setting.ROLE_TYPE.USER.code ||
      setting.ROLE_LOCAL === setting.ROLE_TYPE.EMPLOYEE.code
    ) {
      window.location = "/authentication";
      return;
    }
    setLoading(true);
    setTimeout(() => {
      getAllStore();
      getAllMaterial();
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
                Quản lý nguyên vật liệu
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

            <div className="mt-20" style={{ height: 530, width: "100%" }}>
              <DataGrid
                rows={listMaterial}
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
              } nguyên vật liệu`}
            </DialogTitle>
            <DialogContent>
              <div className="row">
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="tenNVL">Tên nguyên vật liệu</label>
                  <input
                    type="text"
                    className="form-control"
                    name="tenNVL"
                    value={formData.tenNVL}
                    placeholder="Nhập tên nguyên vật liệu"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6 mt-10">
                  <label htmlFor="maKho">Loại kho</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={formData.maKho}
                    onChange={handleInputStore}
                    name="maKho"
                  >
                    <option value="">Chọn loại kho</option>
                    {listStore.map(store => (
                      <option key={store.id} name={store.id} value={store.id}>
                        {store.tenKho}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6 mt-10">
                  <label htmlFor="donViTinh">Đơn vị tính</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={formData.donViTinh}
                    onChange={handleInputChange}
                    name="donViTinh"
                  >
                    <option value="">Chọn đơn vị tính</option>
                    {Object.values(setting.PRODUCT_UNIT).map(store => (
                      <option key={store.code} value={store.code}>
                        {store.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="soLuong">Số lượng</label>
                  <input
                    type="text"
                    name="soLuong"
                    value={formData.soLuong}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Nhập số lượng"
                    required
                  />
                </div>
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="gia">Giá</label>
                  <input
                    type="text"
                    name="gia"
                    value={formData.gia}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Nhập giá"
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
                <Button onClick={() => createMaterial()}>Thêm mới</Button>
              ) : (
                <Button onClick={() => updateMaterial()}>Lưu</Button>
              )}
            </DialogActions>
          </Dialog>
          <Footer />
        </>
      )}
    </div>
  );
}
