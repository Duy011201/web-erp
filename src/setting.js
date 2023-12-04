const ROLE_LOCAL = localStorage.getItem("role");
const USER_LOCAL = localStorage.getItem("user");

const LIST_ROLE = [
  {
    role: "employee",
    desc: "Nhân viên hệ thống",
  },
  {
    role: "manager",
    desc: "Quản lý hệ thống",
  },
  {
    role: "admin",
    desc: "Admin hệ thống",
  },
];

const BASE_URL = "http://localhost:8080/api";
const URL_API = {
  LOGIN: "/login",

  GET_STORE_BY_ID: "/store",
  GET_ALL_STORE: "/store/all",
  CREATE_STORE: "/store/create",
  DELETE_STORE_BY_ID: "/store/delete",
  UPDATE_STORE_BY_ID: "/store/update",

  GET_ALL_PRODUCT: "/product/all",
  GET_PRODUCT_BY_ID: "/product",
  CREATE_PRODUCT: "/product/create",
  DELETE_PRODUCT_BY_ID: "/product/delete",
  UPDATE_PRODUCT_BY_ID: "/product/update",

  GET_ALL_MATERIAL: "/material/all",
  GET_MATERIAL_BY_ID: "/material",
  CREATE_MATERIAL: "/material/create",
  DELETE_MATERIAL_BY_ID: "/material/delete",
  UPDATE_MATERIAL_BY_ID: "/material/update",

  GET_ALL_WAREHOUSE_RECEIPT: "/warehouse-receipt/all",
  GET_WAREHOUSE_RECEIPT_BY_ID: "/warehouse-receipt",
  CREATE_WAREHOUSE_RECEIPT: "/warehouse-receipt/create",
  DELETE_WAREHOUSE_RECEIPT_BY_ID: "/warehouse-receipt/delete",
  UPDATE_WAREHOUSE_RECEIPT_BY_ID: "/warehouse-receipt/update",

  GET_ALL_WAREHOUSE_RECEIPT_DETAIL: "/warehouse-receipt-detail/all",
  GET_WAREHOUSE_RECEIPT_DETAIL_BY_ID: "/warehouse-receipt-detail",
  CREATE_WAREHOUSE_RECEIPT_DETAIL: "/warehouse-receipt-detail/create",
  DELETE_WAREHOUSE_RECEIPT_DETAIL_BY_ID: "/warehouse-receipt-detail/delete",
  UPDATE_WAREHOUSE_RECEIPT_DETAIL_BY_ID: "/warehouse-receipt-detail/update",
};

const ACTION = {
  ADD: "add",
  UPDATE: "update",
  DELETE: "delete",
  OPEN: true,
  CLOSE: false,
};

const STORE_STATUS = {
  EMPTY: { code: "EMPTY", name: "Trống" },
  FULL: { code: "FULL", name: "Đã đầy" },
  IN_USE: { code: "IN_USE", name: "Đang sử dụng" },
};

const STORE_TYPE = {
  CONSUMER_GOODS: { code: "CONSUMER_GOODS", name: "Kho Chứa Hàng Tiêu Dùng" },
  PACKAGING_PROCESSING: {
    code: "PACKAGING_PROCESSING",
    name: "Kho Đóng Gói và Xử Lý Đơn Hàng",
  },
  COLD_STORAGE: { code: "COLD_STORAGE", name: "Kho Lạnh và Kho Đông" },
  CHEMICAL_STORAGE: { code: "CHEMICAL_STORAGE", name: "Kho Hóa Chất" },
  DISTRIBUTION_CENTER: {
    code: "DISTRIBUTION_CENTER",
    name: "Kho Phân Phối Giao Hàng",
  },
  TEMPORARY_STORAGE: { code: "TEMPORARY_STORAGE", name: "Kho Tạm Thời" },
  AIRPORT_STORAGE: { code: "AIRPORT_STORAGE", name: "Kho Sân Bay" },
  PHARMACEUTICAL_MEDICAL: {
    code: "PHARMACEUTICAL_MEDICAL",
    name: "Kho Dược Phẩm và Y Tế",
  },
  AGRICULTURAL_FOOD: {
    code: "AGRICULTURAL_FOOD",
    name: "Kho Nông Sản và Thực Phẩm",
  },
  TRANSPORTATION_DISTRIBUTION: {
    code: "TRANSPORTATION_DISTRIBUTION",
    name: "Kho Vận Chuyển và Điều Phối",
  },
  INDUSTRIAL_MANUFACTURING: {
    code: "INDUSTRIAL_MANUFACTURING",
    name: "Kho Công Nghiệp và Kho Sản Xuất",
  },
  HAZARDOUS_STORAGE: {
    code: "HAZARDOUS_STORAGE",
    name: "Kho Hàng Hóa Nguy Hiểm",
  },
  ELECTRONICS_FULFILLMENT: {
    code: "ELECTRONICS_FULFILLMENT",
    name: "Kho Đồ Điện Tử",
  },
};

const WAREHOUSE_RECEIPT_DETAIL_STATUS = {
  PRODUCT: {
    code: "PRODUCT",
    name: "Sản phẩm",
  },
  MATERIAL: {
    code: "MATERIAL",
    name: "Nguyên vật liệu",
  },
};

const STATUS_CODE = {
  OK: 200,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

const setting = Object.freeze({
  ROLE_LOCAL,
  USER_LOCAL,
  LIST_ROLE,
  BASE_URL,
  URL_API,
  ACTION,
  STATUS_CODE,
  STORE_STATUS,
  STORE_TYPE,
  WAREHOUSE_RECEIPT_DETAIL_STATUS,
});

export default setting;
