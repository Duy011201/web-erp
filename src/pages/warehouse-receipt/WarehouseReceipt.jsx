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
  GET_ALL_WAREHOUSE_RECEIPT,
  DELETE_WAREHOUSE_RECEIPT_BY_ID,
  UPDATE_WAREHOUSE_RECEIPT_BY_ID,
  CREATE_WAREHOUSE_RECEIPT,
  GET_ALL_WAREHOUSE_RECEIPT_DETAIL,
  DELETE_WAREHOUSE_RECEIPT_DETAIL_BY_ID,
  UPDATE_WAREHOUSE_RECEIPT_DETAIL_BY_ID,
  CREATE_WAREHOUSE_RECEIPT_DETAIL,
  GET_ALL_PRODUCT,
  GET_PRODUCT_BY_ID,
  GET_MATERIAL_BY_ID,
  GET_ALL_MATERIAL,
  UPDATE_MATERIAL_BY_ID,
  UPDATE_PRODUCT_BY_ID,
} from "../service.js";
import setting from "../../setting.js";

export default function WarehouseReceipt() {
  const [loading, setLoading] = useState(false);
  const [isConvert, setIsConvert] = useState(true);
  const [listWarehouseReceipt, setListWarehouseReceipt] = useState([]);
  const [listWarehouseReceiptDetail, setListWarehouseReceiptDetail] = useState(
    []
  );
  const [listProduct, setListProduct] = useState([]);
  const [listMaterial, setListMaterial] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState("");
  const [isSPOrNVL, setIsSPOrNVL] = React.useState(true);
  const [countInitWarehouseReceipt, setCountInitWarehouseExport] =
    React.useState(0);
  const [warehouseReceipt, setWarehouseReceipt] = useState({
    id: "",
    maNV: JSON.parse(setting.USER_LOCAL).id,
    loaiHang: "",
    ghiChu: "",
  });
  const [warehouseReceiptDetail, setWarehouseReceiptDetail] = useState({
    id: "",
    maPN: 0,
    maSP: 0,
    maNVL: 0,
    soLuong: 0,
    ghiChu: "",
  });
  let [indexWarehouseReceipt, setIndexWarehouseReceipt] = useState(0);

  const changeWarehouseReceipt = e => {
    const { name, value } = e.target;
    setWarehouseReceipt(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const changeWarehouseReceiptDetail = e => {
    const { name, value } = e.target;
    setWarehouseReceiptDetail(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleIsSPOrNVL = code => {
    code === setting.WAREHOUSE_RECEIPT_DETAIL_STATUS.PRODUCT.code
      ? setIsSPOrNVL(true)
      : setIsSPOrNVL(false);
  };

  const columns = [
    { field: "maPN", headerName: "Mã phiếu nhập", width: 150 },
    { field: "maSP", headerName: "Mã sản phẩm", width: 150 },
    { field: "maNVL", headerName: "Mã nguyên vật liệu", width: 150 },
    { field: "soLuong", headerName: "Số lượng", width: 80 },
    { field: "ghiChu", headerName: "Ghi chú", width: 150 },
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
              handleDialog(
                setting.ACTION.OPEN,
                setting.ACTION.UPDATE,
                params,
                false
              )
            }
          >
            <FontAwesomeIcon className="icon-add mr-5" icon="fas fa-pencil" />
            Sửa
          </button>
          <button
            type="button"
            className="ml-10 btn btn-danger"
            onClick={() =>
              handleDialog(
                setting.ACTION.CLOSE,
                setting.ACTION.DELETE,
                params,
                false
              )
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
    if (isConvert) {
      setOpen(false);

      if (isEmptyNullUndefined(warehouseReceipt.maNV)) {
        error("Bạn chưa nhập mã nhân viên!");
        return;
      }

      if (isEmptyNullUndefined(warehouseReceipt.loaiHang)) {
        error("Bạn chưa nhập loại hàng!");
        return;
      }

      setLoading(true);
      await UPDATE_WAREHOUSE_RECEIPT_BY_ID(warehouseReceipt).then(res => {
        setLoading(false);
        if (res.status === setting.STATUS_CODE.OK) {
          success(res.data.msg);
          getAllMaterial();
          getAllProduct();
          getAllWarehouseReceipt();
        } else {
          error(res.data.msg);
        }
      });
    } else {
      setOpen(false);
      if (isEmptyNullUndefined(warehouseReceiptDetail.maPN)) {
        error("Bạn chưa nhập mã phiếu nhập!");
        return;
      }

      if (isSPOrNVL === true) {
        if (isEmptyNullUndefined(warehouseReceiptDetail.maSP)) {
          error("Bạn chưa chọn mã sản phẩm!");
          return;
        }
      } else {
        if (isEmptyNullUndefined(warehouseReceiptDetail.maNVL)) {
          error("Bạn chưa chọn mã nguyên vật liệu!");
          return;
        }
      }

      if (isEmptyNullUndefined(warehouseReceiptDetail.soLuong)) {
        error("Bạn chưa nhập số lượng sản phẩm!");
        return;
      }

      setLoading(true);
      await UPDATE_WAREHOUSE_RECEIPT_DETAIL_BY_ID(warehouseReceiptDetail).then(
        async res => {
          setLoading(false);
          if (res.status === setting.STATUS_CODE.OK) {
            if (isSPOrNVL === false) {
              await GET_MATERIAL_BY_ID(warehouseReceiptDetail.maNVL).then(
                async res => {
                  if (res.status === setting.STATUS_CODE.OK) {
                    let data = res.data.data[0];
                    data.soLuong = parseInt(data.soLuong);
                    warehouseReceiptDetail.soLuong = parseInt(
                      warehouseReceiptDetail.soLuong
                    );
                    if (warehouseReceiptDetail.soLuong < data.soLuong) {
                      let countResult = 0;
                      if (
                        countInitWarehouseReceipt >
                        warehouseReceiptDetail.soLuong
                      ) {
                        countResult =
                          countInitWarehouseReceipt -
                          warehouseReceiptDetail.soLuong;
                        data.soLuong -= countResult;
                      } else if (
                        countInitWarehouseReceipt <
                        warehouseReceiptDetail.soLuong
                      ) {
                        countResult =
                          warehouseReceiptDetail.soLuong -
                          countInitWarehouseReceipt;
                        data.soLuong -= countResult;
                      } else {
                        data.soLuong = data.soLuong;
                      }
                    } else {
                      data.soLuong = 0;
                    }
                    data.soLuong = parseInt(data.soLuong);
                    await UPDATE_MATERIAL_BY_ID(data).then(res => {
                      setLoading(false);
                      if (res.status === setting.STATUS_CODE.OK) {
                        success(res.data.msg);
                      } else {
                        error(res.data.msg);
                      }
                    });
                  }
                }
              );
            }

            if (isSPOrNVL === true) {
              await GET_PRODUCT_BY_ID(warehouseReceiptDetail.sp).then(
                async res => {
                  if (res.status === setting.STATUS_CODE.OK) {
                    let data = res.data.data[0];
                    data.soLuong = parseInt(data.soLuong);
                    warehouseReceiptDetail.soLuong = parseInt(
                      warehouseReceiptDetail.soLuong
                    );
                    if (warehouseReceiptDetail.soLuong < data.soLuong) {
                      let countResult = 0;
                      if (
                        countInitWarehouseReceipt >
                        warehouseReceiptDetail.soLuong
                      ) {
                        countResult =
                          countInitWarehouseReceipt -
                          warehouseReceiptDetail.soLuong;
                        data.soLuong -= countResult;
                      } else if (
                        countInitWarehouseReceipt <
                        warehouseReceiptDetail.soLuong
                      ) {
                        countResult =
                          warehouseReceiptDetail.soLuong -
                          countInitWarehouseReceipt;
                        data.soLuong -= countResult;
                      } else {
                        data.soLuong = data.soLuong;
                      }
                    } else {
                      data.soLuong = 0;
                    }
                    data.soLuong = parseInt(data.soLuong);
                    await UPDATE_PRODUCT_BY_ID(data).then(res => {
                      setLoading(false);
                      if (res.status === setting.STATUS_CODE.OK) {
                        success(res.data.msg);
                      } else {
                        error(res.data.msg);
                      }
                    });
                  }
                }
              );
            }

            await getAllMaterial();
            await getAllProduct();
            await getAllWarehouseReceipt();
          } else {
            error(res.data.msg);
          }
        }
      );
    }
  };

  const create = async () => {
    if (isConvert) {
      setOpen(false);

      if (isEmptyNullUndefined(warehouseReceipt.loaiHang)) {
        error("Bạn chưa nhập loại hàng!");
        return;
      }
      setLoading(true);

      let payload = {
        maNV: JSON.parse(setting.USER_LOCAL).id,
        loaiHang: warehouseReceipt.loaiHang,
        ghiChu: warehouseReceipt.ghiChu,
      };

      await CREATE_WAREHOUSE_RECEIPT(payload).then(res => {
        setLoading(false);
        if (res.status === setting.STATUS_CODE.OK) {
          success(res.data.msg);
          getAllWarehouseReceipt();
        } else {
          error(res.data.msg);
        }
      });
    } else {
      if (isSPOrNVL) {
        if (isNumber(warehouseReceiptDetail.maSP)) {
          error("Bạn chưa chọn mã sản phẩm!");
          return;
        }
      } else {
        if (isNumber(warehouseReceiptDetail.maNVL)) {
          error("Bạn chưa chọn mã nguyên vật liệu!");
          return;
        }
      }

      if (isNumber(listWarehouseReceipt[indexWarehouseReceipt].id)) {
        error("Bạn chưa chọn mã phiếu nhập!");
        return;
      }

      if (isNumber(warehouseReceiptDetail.soLuong)) {
        error("Bạn nhập sai định dạng số lượng!");
        return;
      }

      setLoading(true);
      setOpen(false);

      let payload = {
        id: "",
        maPN: listWarehouseReceipt[indexWarehouseReceipt].id,
        maSP: parseInt(warehouseReceiptDetail.maSP),
        maNVL: parseInt(warehouseReceiptDetail.maNVL),
        soLuong: parseInt(warehouseReceiptDetail.soLuong),
        ghiChu: "",
      };

      await CREATE_WAREHOUSE_RECEIPT_DETAIL(payload).then(async res => {
        setLoading(false);
        if (res.status === setting.STATUS_CODE.OK) {
          if (isSPOrNVL === false) {
            await GET_MATERIAL_BY_ID(warehouseReceiptDetail.maNVL).then(
              async res => {
                if (res.status === setting.STATUS_CODE.OK) {
                  let data = res.data.data[0];
                  data.soLuong = parseInt(data.soLuong);
                  warehouseReceiptDetail.soLuong = parseInt(
                    warehouseReceiptDetail.soLuong
                  );
                  data.soLuong = data.soLuong + warehouseReceiptDetail.soLuong;
                  data.soLuong = parseInt(data.soLuong);
                  await UPDATE_MATERIAL_BY_ID(data).then(res => {
                    setLoading(false);
                    if (res.status === setting.STATUS_CODE.OK) {
                      success(res.data.msg);
                    } else {
                      error(res.data.msg);
                    }
                  });
                }
              }
            );
          }

          if (isSPOrNVL === true) {
            await GET_PRODUCT_BY_ID(warehouseReceiptDetail.maSP).then(
              async res => {
                if (res.status === setting.STATUS_CODE.OK) {
                  let data = res.data.data[0];
                  data.soLuong = parseInt(data.soLuong);
                  warehouseReceiptDetail.soLuong = parseInt(
                    warehouseReceiptDetail.soLuong
                  );
                  data.soLuong = data.soLuong + warehouseReceiptDetail.soLuong;
                  data.soLuong = parseInt(data.soLuong);
                  await UPDATE_PRODUCT_BY_ID(data).then(res => {
                    setLoading(false);
                    if (res.status === setting.STATUS_CODE.OK) {
                      success(res.data.msg);
                    } else {
                      error(res.data.msg);
                    }
                  });
                }
              }
            );
          }

          await getAllMaterial();
          await getAllProduct();
          await getAllWarehouseReceiptDetail(
            listWarehouseReceipt[indexWarehouseReceipt].id
          );
        } else {
          error(res.data.msg);
        }
      });
    }
  };

  const handleDialog = async (status, action, data, isConvert) => {
    switch (action) {
      case setting.ACTION.ADD:
        if (status === setting.ACTION.OPEN) {
          if (isConvert) {
            setWarehouseReceipt({
              id: "",
              maNV: "",
              loaiHang: "",
              ghiChu: "",
            });
            setIsConvert(true);
          } else {
            setWarehouseReceiptDetail({
              id: "",
              maPN: listWarehouseReceipt[indexWarehouseReceipt].id,
              maSP: 0,
              maNVL: 0,
              soLuong: 0,
              ghiChu: "",
            });
            setIsConvert(false);
          }
        }
        break;
      case setting.ACTION.UPDATE:
        if (isConvert) {
          if (status === setting.ACTION.OPEN) {
            setWarehouseReceipt(data.row);
            setIsConvert(true);
            setCountInitWarehouseExport(data.row.soLuong);
          } else {
            setWarehouseReceipt({
              id: "",
              maNV: "",
              loaiHang: "",
              ghiChu: "",
            });
          }
        } else {
          if (status === setting.ACTION.OPEN) {
            setWarehouseReceiptDetail(data.row);
            setIsConvert(false);
            setCountInitWarehouseExport(data.row.soLuong);
          } else {
            setWarehouseReceiptDetail({
              id: "",
              maPN: listWarehouseReceipt[indexWarehouseReceipt].id,
              maSP: 0,
              maNVL: 0,
              soLuong: 0,
              ghiChu: "",
            });
            setIsConvert(false);
          }
        }
        break;
      case setting.ACTION.DELETE:
        isConvert
          ? confirmDialog("Bạn muốn xóa phiếu này!").then(async result => {
              if (result.value) {
                setLoading(true);
                await getAllWarehouseReceiptDetail(
                  listWarehouseReceipt[indexWarehouseReceipt].id
                );
                for (let i = 0; i < listWarehouseReceiptDetail.length; i++) {
                  await DELETE_WAREHOUSE_RECEIPT_DETAIL_BY_ID(
                    listWarehouseReceiptDetail[i].id
                  ).then(async res => {
                    if (res.status === setting.STATUS_CODE.OK) {
                      if (listWarehouseReceiptDetail[i].maNVL > 0) {
                        await GET_MATERIAL_BY_ID(
                          listWarehouseReceiptDetail[i].maNVL
                        ).then(async res => {
                          if (res.status === setting.STATUS_CODE.OK) {
                            let data = res.data.data[0];
                            data.soLuong = parseInt(data.soLuong);
                            listWarehouseReceiptDetail[i].soLuong = parseInt(
                              listWarehouseReceiptDetail[i].soLuong
                            );
                            data.soLuong =
                              data.soLuong -
                              listWarehouseReceiptDetail[i].soLuong;
                            data.soLuong = parseInt(data.soLuong);
                            await UPDATE_MATERIAL_BY_ID(data).then(
                              async res => {
                                setLoading(false);
                                if (res.status === setting.STATUS_CODE.OK) {
                                } else {
                                  error(res.data.msg);
                                }
                              }
                            );
                          }
                        });
                      }

                      if (listWarehouseReceiptDetail[i].maSP > 0) {
                        await GET_PRODUCT_BY_ID(
                          listWarehouseReceiptDetail[i].maSP
                        ).then(async res => {
                          setLoading(false);
                          if (res.status === setting.STATUS_CODE.OK) {
                            let data = res.data.data[0];
                            data.soLuong = parseInt(data.soLuong);
                            listWarehouseReceiptDetail[i].soLuong = parseInt(
                              listWarehouseReceiptDetail[i].soLuong
                            );
                            data.soLuong =
                              data.soLuong -
                              listWarehouseReceiptDetail[i].soLuong;
                            data.soLuong = parseInt(data.soLuong);
                            setTimeout(() => {
                              UPDATE_PRODUCT_BY_ID(data).then(async res => {
                                setLoading(false);
                                if (res.status === setting.STATUS_CODE.OK) {
                                } else {
                                  error(res.data.msg);
                                }
                              });
                            }, 200);
                          }
                        });
                      }
                    }
                  });
                }

                setTimeout(() => {
                  DELETE_WAREHOUSE_RECEIPT_BY_ID(data.id).then(async res => {
                    if (res.status === setting.STATUS_CODE.OK) {
                      success(res.data.msg);
                      await getAllMaterial();
                      await getAllProduct();
                      await getAllWarehouseReceipt();
                      await getAllWarehouseReceiptDetail(
                        listWarehouseReceipt[indexWarehouseReceipt].id
                      );
                    } else {
                      error(res.data.msg);
                    }
                  });
                }, 500);
              }
            })
          : confirmDialog("Bạn muốn xóa chi tiết phiếu này!").then(
              async result => {
                if (result.value) {
                  setLoading(true);
                  await DELETE_WAREHOUSE_RECEIPT_DETAIL_BY_ID(data.id).then(
                    async res => {
                      if (res.status === setting.STATUS_CODE.OK) {
                        if (isSPOrNVL === false) {
                          await GET_MATERIAL_BY_ID(
                            warehouseReceiptDetail.maNVL
                          ).then(async res => {
                            if (res.status === setting.STATUS_CODE.OK) {
                              let data = res.data.data[0];
                              data.soLuong = parseInt(data.soLuong);
                              warehouseReceiptDetail.soLuong = parseInt(
                                warehouseReceiptDetail.soLuong
                              );
                              if (
                                warehouseReceiptDetail.soLuong > data.soLuong
                              ) {
                                data.soLuong =
                                  warehouseReceiptDetail.soLuong -
                                  data.soLuong +
                                  data.soLuong;
                              } else if (
                                warehouseReceiptDetail.soLuong < data.soLuong
                              ) {
                                data.soLuong =
                                  data.soLuong -
                                  (data.soLuong -
                                    warehouseReceiptDetail.soLuong);
                              }
                              data.soLuong = parseInt(data.soLuong);
                              await UPDATE_MATERIAL_BY_ID(data).then(res => {
                                setLoading(false);
                                if (res.status === setting.STATUS_CODE.OK) {
                                  success(res.data.msg);
                                } else {
                                  error(res.data.msg);
                                }
                              });
                            }
                          });
                        }

                        if (isSPOrNVL === true) {
                          await GET_PRODUCT_BY_ID(
                            warehouseReceiptDetail.maSP
                          ).then(async res => {
                            setLoading(false);
                            if (res.status === setting.STATUS_CODE.OK) {
                              let data = res.data.data[0];
                              data.soLuong = parseInt(data.soLuong);
                              warehouseReceiptDetail.soLuong = parseInt(
                                warehouseReceiptDetail.soLuong
                              );
                              if (
                                warehouseReceiptDetail.soLuong > data.soLuong
                              ) {
                                data.soLuong =
                                  warehouseReceiptDetail.soLuong -
                                  data.soLuong +
                                  data.soLuong;
                              } else if (
                                warehouseReceiptDetail.soLuong < data.soLuong
                              ) {
                                data.soLuong =
                                  data.soLuong -
                                  (data.soLuong -
                                    warehouseReceiptDetail.soLuong);
                              }
                              data.soLuong = parseInt(data.soLuong);
                              await UPDATE_PRODUCT_BY_ID(data).then(res => {
                                setLoading(false);
                                if (res.status === setting.STATUS_CODE.OK) {
                                  success(res.data.msg);
                                } else {
                                  error(res.data.msg);
                                }
                              });
                            }
                          });
                        }

                        await getAllMaterial();
                        await getAllProduct();
                        await getAllWarehouseReceiptDetail(
                          listWarehouseReceipt[indexWarehouseReceipt].id
                        );
                      } else {
                        error(res.data.msg);
                      }
                    }
                  );
                }
              }
            );
        break;
    }
    setAction(action);
    setOpen(status);
  };

  const getAllWarehouseReceipt = async () => {
    try {
      setLoading(true);
      let listWarehouseReceipt;
      await GET_ALL_WAREHOUSE_RECEIPT().then(async res => {
        setLoading(false);
        if (res.status === setting.STATUS_CODE.OK) {
          listWarehouseReceipt = res.data.data;
          setListWarehouseReceipt(listWarehouseReceipt);
          indexWarehouseReceipt = 0;
          getAllWarehouseReceiptDetail(listWarehouseReceipt[0].id);
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const getAllWarehouseReceiptDetail = async id => {
    try {
      setLoading(true);
      let listWarehouseReceiptDetail;
      await GET_ALL_WAREHOUSE_RECEIPT_DETAIL({ warehouseReceiptID: id }).then(
        res => {
          setLoading(false);
          if (res.status === setting.STATUS_CODE.OK) {
            listWarehouseReceiptDetail = res.data.data;
            setListWarehouseReceiptDetail(listWarehouseReceiptDetail);
          }
        }
      );
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
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

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      getAllProduct();
      getAllMaterial();
      getAllWarehouseReceipt();
    }, 500);
  }, []);

  const updateIndexWarehouseReceipt = async index => {
    setIndexWarehouseReceipt(index);
    if (listWarehouseReceipt.length > 0) {
      setWarehouseReceiptDetail({
        id: "",
        maPN: index,
        maSP: 0,
        maNVL: 0,
        soLuong: 0,
        ghiChu: "",
      });
      await getAllWarehouseReceiptDetail(index);
    }
  };

  return (
    <div className="container-fluid m-0 p-0 wrap-home bg-lazy">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <div className="container-sm">
            <div className="row">
              <div
                className="col-md-3"
                style={{
                  borderRight: "1px solid #E0E0E0",
                  borderLeft: "1px solid #E0E0E0",
                }}
              >
                <div className="d-flex align-items-center pt-10 pb-10">
                  <span className="fw-700 font-20">Phiếu nhập</span>
                  <FontAwesomeIcon
                    className="icon-add ml-5 add-warehouse-receipt font-20"
                    icon="fas fa-plus"
                    onClick={() =>
                      handleDialog(
                        setting.ACTION.OPEN,
                        setting.ACTION.ADD,
                        {},
                        true
                      )
                    }
                  />
                </div>
                <div className="wrap-catalog">
                  {listWarehouseReceipt.map((item, i) => (
                    <div
                      key={i}
                      className={`clb bdbt1px${
                        (i + 1) % 2 === 0 ? " odd" : ""
                      }`}
                      onClick={() => updateIndexWarehouseReceipt(i)}
                    >
                      <div
                        className={`catalog-item pdl10 clb font14 pdr5 ${
                          i === indexWarehouseReceipt ? " active" : ""
                        }`}
                      >
                        <div className="catalog-item-left d-flex align-items-center">
                          <FontAwesomeIcon
                            className="icon-add mr-5"
                            icon="fas fa-pencil"
                            onClick={() =>
                              handleDialog(
                                setting.ACTION.OPEN,
                                setting.ACTION.UPDATE,
                                item,
                                true
                              )
                            }
                          />
                          <FontAwesomeIcon
                            className="icon-add mr-5"
                            icon="fas fa-trash"
                            onClick={() =>
                              handleDialog(
                                setting.ACTION.CLOSE,
                                setting.ACTION.DELETE,
                                item,
                                true
                              )
                            }
                          />
                        </div>
                        <div className="catalog-item-right">
                          <p title={item.id}>Mã phiếu {item.id}</p>
                          <p className="customer-name" title={item.loaiHang}>
                            {item.loaiHang}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-md-9">
                <div className="d-flex  align-items-center pt-10 pb-10">
                  <span className="fw-700 font-20">Chi tiết phiếu nhập</span>
                  <FontAwesomeIcon
                    className="icon-add ml-5 add-warehouse-receipt font-20"
                    icon="fas fa-plus"
                    onClick={() =>
                      handleDialog(
                        setting.ACTION.OPEN,
                        setting.ACTION.ADD,
                        {},
                        false
                      )
                    }
                  />
                </div>
                <div className="mt-10" style={{ height: 550, width: "100%" }}>
                  <DataGrid
                    rows={listWarehouseReceiptDetail}
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
              } ${isConvert ? "phiếu nhập" : "chi tiết phiếu nhập"}`}
            </DialogTitle>
            <DialogContent>
              {isConvert ? (
                <>
                  <div className="row">
                    <div className="form-group mt-10 col-md-6">
                      <label htmlFor="loaiHang">Tên loại hàng</label>
                      <input
                        type="text"
                        className="form-control"
                        name="loaiHang"
                        value={warehouseReceipt.loaiHang}
                        placeholder="Nhập tên loại hàng"
                        onChange={changeWarehouseReceipt}
                        required
                      />
                    </div>
                    <div className="form-group mt-10 col-md-6">
                      <label htmlFor="ghiChu">Ghi chú</label>
                      <input
                        type="text"
                        name="ghiChu"
                        value={warehouseReceipt.ghiChu}
                        onChange={changeWarehouseReceipt}
                        className="form-control"
                        placeholder="Nhập ghi chú"
                        required
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="row">
                    <div className="col-md-6 mt-10">
                      <label htmlFor="isSPOrNVL">Lựa chọn</label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        name="isSPOrNVL"
                        onChange={e => handleIsSPOrNVL(e.target.value)}
                      >
                        {Object.values(
                          setting.WAREHOUSE_RECEIPT_DETAIL_STATUS
                        ).map(e => (
                          <option key={e.code} value={e.code}>
                            {e.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {isSPOrNVL ? (
                      <div className="col-md-6 mt-10">
                        <label htmlFor="maSP">Sản phẩm</label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          value={warehouseReceiptDetail.maSP}
                          onChange={changeWarehouseReceiptDetail}
                          name="maSP"
                        >
                          <option value="">Chọn sản phẩm</option>
                          {listProduct.map(product => (
                            <option
                              key={product.id}
                              name={product.id}
                              value={product.id}
                            >
                              {product.tenSP}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <div className="col-md-6 mt-10">
                        <label htmlFor="maNVL">Nguyên vật liệu</label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          value={warehouseReceiptDetail.maNVL}
                          onChange={changeWarehouseReceiptDetail}
                          name="maNVL"
                        >
                          <option value="">Chọn nguyên vật liệu</option>
                          {listMaterial.map(material => (
                            <option
                              key={material.id}
                              name={material.id}
                              value={material.id}
                            >
                              {material.tenNVL}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                    <div className="form-group mt-10 col-md-6">
                      <label htmlFor="soLuong">Số lượng</label>
                      <input
                        type="number"
                        className="form-control"
                        name="soLuong"
                        value={warehouseReceiptDetail.soLuong}
                        placeholder="Nhập số lượng"
                        onChange={changeWarehouseReceiptDetail}
                        required
                      />
                    </div>
                    <div className="form-group mt-10 col-md-6">
                      <label htmlFor="ghiChu">Ghi chú</label>
                      <input
                        type="text"
                        name="ghiChu"
                        value={warehouseReceiptDetail.ghiChu}
                        onChange={changeWarehouseReceiptDetail}
                        className="form-control"
                        placeholder="Nhập ghi chú"
                        required
                      />
                    </div>
                  </div>
                </>
              )}
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
