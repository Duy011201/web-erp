import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { error, success, confirmDialog } from "../../common/sweetalert2.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isEmptyNullUndefined, isNumber } from "../../common/core.js";
import setting from "../../setting.js";
import Header from "../../components/header/Header.jsx";
import Footer from "../../components/footer/Footer.jsx";
import Loading from "../../components/loading/Loading.jsx";

import "./style.scss";
import {
  GET_ALL_PRODUCT,
  GET_ALL_STORE,
  DELETE_PRODUCT_BY_ID,
  UPDATE_PRODUCT_BY_ID,
  CREATE_PRODUCT,
} from "../service.js";

export default function Product() {
  const [loading, setLoading] = useState(false);
  const [listProduct, setListProduct] = useState([]);
  const [listStore, setListStore] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState("");
  const [formData, setFormData] = useState({
    id: "",
    tenSP: "",
    loaiSP: "",
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

  const columns = [
    { field: "id", headerName: "Mã", width: 100 },
    { field: "tenSP", headerName: "Tên", width: 150 },
    {
      field: "loaiSP",
      headerName: "Loại",
      width: 150,
      renderCell: params => (
        <div>
          {params.value === setting.PRODUCT_TYPE.LONG_TERM.code
            ? setting.PRODUCT_TYPE.LONG_TERM.name
            : setting.PRODUCT_TYPE.SHORT_TERM.name}
        </div>
      ),
    },
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
    { field: "maKho", headerName: "Mã kho", width: 100 },
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

  const updateProduct = async () => {
    if (isEmptyNullUndefined(formData.tenSP)) {
      error("Bạn chưa nhập tên sản phẩm!");
      return;
    }

    if (isEmptyNullUndefined(formData.loaiSP)) {
      error("Bạn chưa nhập loại sản phẩm!");
      return;
    }

    if (isEmptyNullUndefined(formData.donViTinh)) {
      error("Bạn chưa nhập đơn vị tính sản phẩm!");
      return;
    }

    if (isNumber(formData.soLuong) || formData.soLuong > 100000) {
      error("Sai định dạng số lượng sản phẩm!");
      return;
    }

    if (isNumber(parseFloat(formData.gia)) || parseFloat(formData.gia) > 10000000000) {
      error("Sai định dạng giá sản phẩm!");
      return;
    }

    if (isNumber(formData.maKho)) {
      error("Bạn chưa chọn kho!");
      return;
    }

    setOpen(false);
    setLoading(true);
    await UPDATE_PRODUCT_BY_ID(formData).then(res => {
      setLoading(false);
      if (res.status === setting.STATUS_CODE.OK) {
        success(res.data.msg);
        getAllProduct();
        getAllStore();
      } else {
        error(res.data.msg);
      }
    });
  };

  const createProduct = async () => {
    if (isEmptyNullUndefined(formData.tenSP)) {
      error("Bạn chưa nhập tên sản phẩm!");
      return;
    }

    if (isEmptyNullUndefined(formData.loaiSP)) {
      error("Bạn chưa nhập loại sản phẩm!");
      return;
    }

    if (isEmptyNullUndefined(formData.donViTinh)) {
      error("Bạn chưa nhập đơn vị tính sản phẩm!");
      return;
    }

    if (isNumber(formData.soLuong) || formData.soLuong > 100000) {
      error("Sai định dạng số lượng sản phẩm!");
      return;
    }

    if (isNumber(parseFloat(formData.gia)) || parseFloat(formData.gia) > 10000000000) {
      error("Sai định dạng giá sản phẩm!");
      return;
    }

    if (isEmptyNullUndefined(formData.maKho)) {
      error("Bạn chưa nhập mã kho!");
      return;
    }
    setOpen(false);
    setLoading(true);

    await CREATE_PRODUCT(formData).then(res => {
      setLoading(false);
      if (res.status === setting.STATUS_CODE.OK) {
        success(res.data.msg);
        getAllProduct();
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
        confirmDialog("Bạn muốn xóa sản phẩm này!").then(async result => {
          if (result.value) {
            setLoading(true);
            await DELETE_PRODUCT_BY_ID(data.id).then(res => {
              setLoading(false);
              if (res.status === setting.STATUS_CODE.OK) {
                success(res.data.msg);
                getAllProduct();
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

  const getAllProduct = async () => {
    try {
      setLoading(true);
      let listProduct;
      await GET_ALL_PRODUCT().then(res => {
        setLoading(false);
        if (res.status === setting.STATUS_CODE.OK) {
          listProduct = res.data.data;
          setListProduct(listProduct);
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
    localStorage.setItem("role", "ADMIN");
    setLoading(true);
    if (
      setting.ROLE_LOCAL === setting.ROLE_TYPE.USER.code ||
      setting.ROLE_LOCAL === setting.ROLE_TYPE.EMPLOYEE.code
    ) {
      window.location = "/authentication";
      return;
    }

    setTimeout(() => {
      getAllStore();
      getAllProduct();
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
                Quản lý sản phẩm
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
                rows={listProduct}
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
              } sản phẩm`}
            </DialogTitle>
            <DialogContent>
              <div className="row">
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="tenSP">Tên sản phẩm</label>
                  <input
                    type="text"
                    className="form-control"
                    name="tenSP"
                    value={formData.tenSP}
                    placeholder="Nhập tên sản phẩm"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6 mt-10">
                  <label htmlFor="loaiSP">Loại sản phẩm</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={formData.loaiSP}
                    onChange={handleInputChange}
                    name="loaiSP"
                  >
                    <option value="">Chọn loại sản phẩm</option>
                    {Object.values(setting.PRODUCT_TYPE).map(store => (
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
                <div className="col-md-6 mt-10">
                  <label htmlFor="maKho">Mã kho</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={formData.maKho}
                    onChange={handleInputChange}
                    name="maKho"
                  >
                    <option value="">Chọn kho</option>
                    {listStore.map(store => (
                      <option key={store.id} name={store.id} value={store.id}>
                        {store.tenKho}
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
                <Button onClick={() => createProduct()}>Thêm mới</Button>
              ) : (
                <Button onClick={() => updateProduct()}>Lưu</Button>
              )}
            </DialogActions>
          </Dialog>
          <Footer />
        </>
      )}
    </div>
  );
}
