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
  GET_ALL_WAREHOUSE_EXPORT,
  DELETE_WAREHOUSE_EXPORT_BY_ID,
  UPDATE_WAREHOUSE_EXPORT_BY_ID,
  CREATE_WAREHOUSE_EXPORT,
  GET_ALL_WAREHOUSE_EXPORT_DETAIL,
  DELETE_WAREHOUSE_EXPORT_DETAIL_BY_ID,
  UPDATE_WAREHOUSE_EXPORT_DETAIL_BY_ID,
  CREATE_WAREHOUSE_EXPORT_DETAIL,
  GET_ALL_PRODUCT,
  GET_PRODUCT_BY_ID,
  GET_MATERIAL_BY_ID,
  GET_ALL_MATERIAL,
  UPDATE_MATERIAL_BY_ID,
  UPDATE_PRODUCT_BY_ID,
} from "../service.js";
import setting from "../../setting.js";

export default function WarehouseExport() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [isConvert, setIsConvert] = useState(true);
  const [listWarehouseExport, setListWarehouseExport] = useState([]);
  const [listWarehouseExportDetail, setListWarehouseExportDetail] = useState(
    []
  );
  const [listProduct, setListProduct] = useState([]);
  const [listMaterial, setListMaterial] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState("");
  const [isSPOrNVL, setIsSPOrNVL] = React.useState(true);
  const [oldQuantity, setOldQuantity] = useState(0);
  const [warehouseExport, setWarehouseExport] = useState({
    id: "",
    maNV: JSON.parse(setting.USER_LOCAL).id,
    loaiHang: "",
    ghiChu: "",
  });
  const [warehouseExportDetail, setWarehouseExportDetail] = useState({
    id: "",
    maPX: 0,
    maSP: 0,
    maNVL: 0,
    soLuong: 0,
    ghiChu: "",
  });

  let [indexWarehouseExport, setIndexWarehouseExport] = useState(0);
  const changeWarehouseExport = e => {
    const { name, value } = e.target;
    setWarehouseExport(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const changeWarehouseExportDetail = e => {
    const { name, value } = e.target;
    setWarehouseExportDetail(prevData => ({
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
    { field: "maPX", headerName: "Mã phiếu xuất", width: 150 },
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

      if (isEmptyNullUndefined(warehouseExport.maNV)) {
        error("Bạn chưa nhập mã nhân viên!");
        return;
      }

      if (isEmptyNullUndefined(warehouseExport.loaiHang)) {
        error("Bạn chưa nhập loại hàng!");
        return;
      }

      setLoading(true);
      await UPDATE_WAREHOUSE_EXPORT_BY_ID(warehouseExport).then(res => {
        setLoading(false);
        if (res.status === setting.STATUS_CODE.OK) {
          success(res.data.msg);
          getAllMaterial();
          getAllProduct();
          getAllWarehouseExport();
        } else {
          error(res.data.msg);
        }
      });
    } else {
      setOpen(false);
      if (isNumber(listWarehouseExport[indexWarehouseExport].id)) {
        error("Bạn chưa chọn mã phiếu xuất!");
        return;
      }

      if (isSPOrNVL === true) {
        if (isEmptyNullUndefined(warehouseExportDetail.maSP)) {
          error("Bạn chưa chọn mã sản phẩm!");
          return;
        }
      } else {
        if (isEmptyNullUndefined(warehouseExportDetail.maNVL)) {
          error("Bạn chưa chọn mã nguyên vật liệu!");
          return;
        }
      }

      if (isEmptyNullUndefined(warehouseExportDetail.soLuong)) {
        error("Bạn chưa nhập số lượng sản phẩm!");
        return;
      }

      setLoading(true);
      await UPDATE_WAREHOUSE_EXPORT_DETAIL_BY_ID(warehouseExportDetail).then(
        async res => {
          setLoading(false);
          if (res.status === setting.STATUS_CODE.OK) {
            if (isSPOrNVL === false) {
              await GET_MATERIAL_BY_ID(warehouseExportDetail.maNVL).then(
                async res => {
                  if (res.status === setting.STATUS_CODE.OK) {
                    let data = res.data.data[0];
                    data.soLuong = parseInt(data.soLuong);
                    warehouseExportDetail.soLuong = parseInt(
                      warehouseExportDetail.soLuong
                    );

                    if (
                      parseInt(warehouseExportDetail.soLuong) <=
                      parseInt(data.soLuong)
                    ) {
                      let countResult = 0;
                      countResult =
                        data.soLuong +
                        oldQuantity -
                        warehouseExportDetail.soLuong;
                      data.soLuong = parseInt(countResult);
                      await UPDATE_MATERIAL_BY_ID(data).then(res => {
                        setLoading(false);
                        if (res.status === setting.STATUS_CODE.OK) {
                          success(res.data.msg);
                        } else {
                          error(res.data.msg);
                        }
                      });
                    } else {
                      error(
                        "Số lượng xuất lớn hơn số lượng nguyên vật liệu trong kho"
                      );
                      return;
                    }
                  }
                }
              );
            }

            if (isSPOrNVL === true) {
              await GET_PRODUCT_BY_ID(warehouseExportDetail.sp).then(
                async res => {
                  if (res.status === setting.STATUS_CODE.OK) {
                    let data = res.data.data[0];
                    data.soLuong = parseInt(data.soLuong);
                    warehouseExportDetail.soLuong = parseInt(
                      warehouseExportDetail.soLuong
                    );

                    if (
                      parseInt(warehouseExportDetail.soLuong) <=
                      parseInt(data.soLuong)
                    ) {
                      if (warehouseExportDetail.soLuong < data.soLuong) {
                        let countResult = 0;
                        countResult =
                          data.soLuong +
                          oldQuantity -
                          warehouseExportDetail.soLuong;
                        data.soLuong = parseInt(countResult);
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
                    } else {
                      error(
                        "Số lượng xuất lớn hơn số lượng sản phẩm trong kho"
                      );
                      return;
                    }
                  }
                }
              );
            }

            await getAllMaterial();
            await getAllProduct();
            await getAllWarehouseExport();
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

      if (isEmptyNullUndefined(warehouseExport.loaiHang)) {
        error("Bạn chưa nhập loại hàng!");
        return;
      }
      setLoading(true);

      let payload = {
        maNV: JSON.parse(setting.USER_LOCAL).id,
        loaiHang: warehouseExport.loaiHang,
        ghiChu: warehouseExport.ghiChu,
      };

      await CREATE_WAREHOUSE_EXPORT(payload).then(res => {
        setLoading(false);
        if (res.status === setting.STATUS_CODE.OK) {
          success(res.data.msg);
          getAllWarehouseExport();
        } else {
          error(res.data.msg);
        }
      });
    } else {
      if (isSPOrNVL) {
        if (isNumber(warehouseExportDetail.maSP)) {
          error("Bạn chưa chọn mã sản phẩm!");
          return;
        }
      } else {
        if (isNumber(warehouseExportDetail.maNVL)) {
          error("Bạn chưa chọn mã nguyên vật liệu!");
          return;
        }
      }

      if (isNumber(listWarehouseExport[indexWarehouseExport].id)) {
        error("Bạn chưa chọn mã phiếu xuất!");
        return;
      }

      if (isNumber(warehouseExportDetail.soLuong)) {
        error("Bạn nhập sai định dạng số lượng!");
        return;
      }

      setLoading(true);
      setOpen(false);

      let payload = {
        id: "",
        maPX: listWarehouseExport[indexWarehouseExport].id,
        maSP: parseInt(warehouseExportDetail.maSP),
        maNVL: parseInt(warehouseExportDetail.maNVL),
        soLuong: parseInt(warehouseExportDetail.soLuong),
        ghiChu: "",
      };

      await CREATE_WAREHOUSE_EXPORT_DETAIL(payload).then(async res => {
        setLoading(false);
        if (res.status === setting.STATUS_CODE.OK) {
          if (isSPOrNVL === false) {
            await GET_MATERIAL_BY_ID(warehouseExportDetail.maNVL).then(
              async res => {
                if (res.status === setting.STATUS_CODE.OK) {
                  let data = res.data.data[0];
                  if (
                    parseInt(data.soLuong) >=
                    parseInt(warehouseExportDetail.soLuong)
                  ) {
                    data.soLuong = parseInt(data.soLuong);
                    warehouseExportDetail.soLuong = parseInt(
                      warehouseExportDetail.soLuong
                    );
                    data.soLuong = parseInt(
                      data.soLuong - warehouseExportDetail.soLuong
                    );
                    await UPDATE_MATERIAL_BY_ID(data).then(res => {
                      setLoading(false);
                      if (res.status === setting.STATUS_CODE.OK) {
                        success(res.data.msg);
                      } else {
                        error(res.data.msg);
                      }
                    });
                  } else {
                    error(
                      "Số lượng xuất lớn hơn số lượng nguyên vật liệu trong kho"
                    );
                    return;
                  }
                }
              }
            );
          }

          if (isSPOrNVL === true) {
            await GET_PRODUCT_BY_ID(warehouseExportDetail.maSP).then(
              async res => {
                if (res.status === setting.STATUS_CODE.OK) {
                  let data = res.data.data[0];
                  data.soLuong = parseInt(data.soLuong);
                  warehouseExportDetail.soLuong = parseInt(
                    warehouseExportDetail.soLuong
                  );
                  if (data.soLuong >= warehouseExportDetail.soLuong) {
                    data.soLuong = parseInt(
                      data.soLuong - warehouseExportDetail.soLuong
                    );
                    await UPDATE_PRODUCT_BY_ID(data).then(res => {
                      setLoading(false);
                      if (res.status === setting.STATUS_CODE.OK) {
                        success(res.data.msg);
                      } else {
                        error(res.data.msg);
                      }
                    });
                  } else {
                    error(
                      "Số lượng xuất lớn hơn số lượng nguyên vật liệu trong kho"
                    );
                    return;
                  }
                }
              }
            );
          }

          await getAllMaterial();
          await getAllProduct();
          await getAllWarehouseExportDetail(
            listWarehouseExport[indexWarehouseExport].id
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
            setWarehouseExport({
              id: "",
              maNV: "",
              loaiHang: "",
              ghiChu: "",
            });
            setIsConvert(true);
          } else {
            setWarehouseExportDetail({
              id: "",
              maPN: listWarehouseExport[indexWarehouseExport].id,
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
            setWarehouseExport(data.row);
            setIsConvert(true);
            setOldQuantity(data.row.soLuong);
          } else {
            setWarehouseExport({
              id: "",
              maNV: "",
              loaiHang: "",
              ghiChu: "",
            });
            setIsConvert(true);
          }
        } else {
          if (status === setting.ACTION.OPEN) {
            setWarehouseExportDetail(data.row);
            setIsConvert(false);
            setOldQuantity(data.row.soLuong);
          } else {
            setWarehouseExportDetail({
              id: "",
              maPN: listWarehouseExport[indexWarehouseExport].id,
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
                await getAllWarehouseExportDetail(
                  listWarehouseExport[indexWarehouseExport].id
                );
                for (let i = 0; i < listWarehouseExportDetail.length; i++) {
                  await DELETE_WAREHOUSE_EXPORT_DETAIL_BY_ID(
                    listWarehouseExportDetail[i].id
                  ).then(async res => {
                    if (res.status === setting.STATUS_CODE.OK) {
                      if (listWarehouseExportDetail[i].maNVL > 0) {
                        await GET_MATERIAL_BY_ID(
                          listWarehouseExportDetail[i].maNVL
                        ).then(async res => {
                          if (res.status === setting.STATUS_CODE.OK) {
                            let data = res.data.data[0];
                            data.soLuong = parseInt(data.soLuong);
                            listWarehouseExportDetail[i].soLuong = parseInt(
                              listWarehouseExportDetail[i].soLuong
                            );
                            data.soLuong =
                              data.soLuong +
                              listWarehouseExportDetail[i].soLuong;
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

                      if (listWarehouseExportDetail[i].maSP > 0) {
                        await GET_PRODUCT_BY_ID(
                          listWarehouseExportDetail[i].maSP
                        ).then(async res => {
                          setLoading(false);
                          if (res.status === setting.STATUS_CODE.OK) {
                            let data = res.data.data[0];
                            data.soLuong = parseInt(data.soLuong);
                            listWarehouseExportDetail[i].soLuong = parseInt(
                              listWarehouseExportDetail[i].soLuong
                            );
                            data.soLuong =
                              data.soLuong +
                              listWarehouseExportDetail[i].soLuong;
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
                  DELETE_WAREHOUSE_EXPORT_BY_ID(data.id).then(async res => {
                    if (res.status === setting.STATUS_CODE.OK) {
                      success(res.data.msg);
                      await getAllMaterial();
                      await getAllProduct();
                      await getAllWarehouseExport();
                      await getAllWarehouseExportDetail(
                        listWarehouseExport[indexWarehouseExport].id
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
                  await DELETE_WAREHOUSE_EXPORT_DETAIL_BY_ID(data.id).then(
                    async res => {
                      if (res.status === setting.STATUS_CODE.OK) {
                        if (isSPOrNVL === false) {
                          await GET_MATERIAL_BY_ID(
                            warehouseExportDetail.maNVL
                          ).then(async res => {
                            if (res.status === setting.STATUS_CODE.OK) {
                              let data = res.data.data[0];
                              data.soLuong = parseInt(data.soLuong);
                              warehouseExportDetail.soLuong = parseInt(
                                warehouseExportDetail.soLuong
                              );
                              data.soLuong = parseInt(
                                data.soLuong + warehouseExportDetail.soLuong
                              );
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
                            warehouseExportDetail.maSP
                          ).then(async res => {
                            setLoading(false);
                            if (res.status === setting.STATUS_CODE.OK) {
                              let data = res.data.data[0];
                              data.soLuong = parseInt(data.soLuong);
                              warehouseExportDetail.soLuong = parseInt(
                                warehouseExportDetail.soLuong
                              );
                              data.soLuong = parseInt(
                                data.soLuong + warehouseExportDetail.soLuong
                              );
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
                        await getAllWarehouseExportDetail(
                          listWarehouseExport[indexWarehouseExport].id
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

  const getAllWarehouseExport = async () => {
    try {
      setLoading(true);
      let listWarehouseExport;
      await GET_ALL_WAREHOUSE_EXPORT().then(async res => {
        setLoading(false);
        if (res.status === setting.STATUS_CODE.OK) {
          listWarehouseExport = res.data.data;
          setListWarehouseExport(listWarehouseExport);
          indexWarehouseExport = 0;
          getAllWarehouseExportDetail(listWarehouseExport[0].id);
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const getAllWarehouseExportDetail = async id => {
    try {
      setLoading(true);
      let listWarehouseExportDetail;
      await GET_ALL_WAREHOUSE_EXPORT_DETAIL({ warehouseExportID: id }).then(
        res => {
          setLoading(false);
          if (res.status === setting.STATUS_CODE.OK) {
            listWarehouseExportDetail = res.data.data;
            setListWarehouseExportDetail(listWarehouseExportDetail);
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
    if (
      setting.ROLE_LOCAL === setting.ROLE_TYPE.USER.code ||
      setting.ROLE_LOCAL === setting.ROLE_TYPE.EMPLOYEE.code
    ) {
      window.location = "/authentication";
      return;
    }

    setLoading(true);
    setTimeout(() => {
      getAllProduct();
      getAllMaterial();
      getAllWarehouseExport();
    }, 500);
  }, []);

  const updateIndexWarehouseExport = async index => {
    setIndexWarehouseExport(index);
    if (listWarehouseExport.length > 0) {
      setWarehouseExportDetail({
        id: "",
        maPN: index,
        maSP: 0,
        maNVL: 0,
        soLuong: 0,
        ghiChu: "",
      });
      await getAllWarehouseExportDetail(index);
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
                  <span className="fw-700 font-20">Phiếu xuất</span>
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
                  {listWarehouseExport.map((item, i) => (
                    <div
                      key={i}
                      className={`clb bdbt1px${
                        (i + 1) % 2 === 0 ? " odd" : ""
                      }`}
                      onClick={() => updateIndexWarehouseExport(i)}
                    >
                      <div
                        className={`catalog-item pdl10 clb font14 pdr5 ${
                          i === indexWarehouseExport ? " active" : ""
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
                          <p title={item.id}>{item.id}</p>
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
                  <span className="fw-700 font-20">Chi tiết phiếu xuất</span>
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
                    rows={listWarehouseExportDetail}
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
              } ${isConvert ? "phiếu xuất" : "chi tiết phiếu xuất"}`}
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
                        value={warehouseExport.loaiHang}
                        placeholder="Nhập tên loại hàng"
                        onChange={changeWarehouseExport}
                        required
                      />
                    </div>
                    <div className="form-group mt-10 col-md-6">
                      <label htmlFor="ghiChu">Ghi chú</label>
                      <input
                        type="text"
                        name="ghiChu"
                        value={warehouseExport.ghiChu}
                        onChange={changeWarehouseExport}
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
                          value={warehouseExportDetail.maSP}
                          onChange={changeWarehouseExportDetail}
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
                          value={warehouseExportDetail.maNVL}
                          onChange={changeWarehouseExportDetail}
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
                        value={warehouseExportDetail.soLuong}
                        placeholder="Nhập số lượng"
                        onChange={changeWarehouseExportDetail}
                        required
                      />
                    </div>
                    <div className="form-group mt-10 col-md-6">
                      <label htmlFor="ghiChu">Ghi chú</label>
                      <input
                        type="text"
                        name="ghiChu"
                        value={warehouseExportDetail.ghiChu}
                        onChange={changeWarehouseExportDetail}
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
