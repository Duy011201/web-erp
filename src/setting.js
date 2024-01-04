const ROLE_LOCAL = localStorage.getItem("role");
const USER_LOCAL = localStorage.getItem("USER");

const ROLE_TYPE = {
  EMPLOYEE: {
    code: "EMPLOYEE",
    name: "Quản lý nhân viên",
  },
  STORE: {
    code: "STORE",
    name: "Quản lý kho",
  },
  ADMIN: {
    code: "ADMIN",
    name: "Admin hệ thống",
  },
  USER: {
    code: "USER",
    name: "Người dùng hệ thống",
  },
};

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

  GET_ALL_WAREHOUSE_EXPORT: "/warehouse-export/all",
  GET_WAREHOUSE_EXPORT_BY_ID: "/warehouse-export",
  CREATE_WAREHOUSE_EXPORT: "/warehouse-export/create",
  DELETE_WAREHOUSE_EXPORT_BY_ID: "/warehouse-export/delete",
  UPDATE_WAREHOUSE_EXPORT_BY_ID: "/warehouse-export/update",

  GET_ALL_WAREHOUSE_EXPORT_DETAIL: "/warehouse-export-detail/all",
  GET_WAREHOUSE_EXPORT_DETAIL_BY_ID: "/warehouse-export-detail",
  CREATE_WAREHOUSE_EXPORT_DETAIL: "/warehouse-export-detail/create",
  DELETE_WAREHOUSE_EXPORT_DETAIL_BY_ID: "/warehouse-export-detail/delete",
  UPDATE_WAREHOUSE_EXPORT_DETAIL_BY_ID: "/warehouse-export-detail/update",

  CHECK_LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  CREATE_REGISTER: "/auth/create-register",
  UPDATE_PASSWORD: "/auth/update-password",

  UPDATE_EMPLOYEE_BY_ID: "/employee/update",
  GET_EMPLOYEE_BY_ID: "/employee",
  CREATE_EMPLOYEE: "/employee/create",
  DELETE_EMPLOYEE_BY_ID: "/employee/delete",
  GET_ALL_EMPLOYEE: "/employee/all",

  UPDATE_REWARD_DISCIPLINE_BY_ID: "/reward-discipline/update",
  GET_REWARD_DISCIPLINE_BY_ID: "/reward-discipline",
  CREATE_REWARD_DISCIPLINE: "/reward-discipline/create",
  DELETE_REWARD_DISCIPLINE_BY_ID: "/reward-discipline/delete",
  GET_ALL_REWARD_DISCIPLINE: "/reward-discipline/all",

  GET_ALL_POSITION: "/position/all",
  UPDATE_POSITION_BY_ID: "/position/update",
  CREATE_POSITION: "/position/create",
  DELETE_POSITION_BY_ID: "/position/delete",

  UPDATE_DEPARTMENT_BY_ID: "/department/update",
  CREATE_DEPARTMENT: "/department/create",
  DELETE_DEPARTMENT_BY_ID: "/department/delete",
  GET_ALL_DEPARTMENT: "/department/all",

<<<<<<< HEAD
  GET_ALL_WORKINGPROCESS: "/workingprocess/all",
  UPDATE_WORKINGPROCESS_BY_ID: "/workingprocess/update",
  CREATE_WORKINGPROCESS: "/workingprocess/create",
  DELETE_WORKINGPROCESS_BY_ID: "/workingprocess/delete",
  GET_WORKINGPROCESS_BY_ID:"/workingprocess/all",
=======
  UPDATE_WORINGPROCESS_BY_ID: "/workingprocess/update",
  CREATE_WORINGPROCESS: "/workingprocess/create",
  DELETE_WORINGPROCESS_BY_ID: "/workingprocess/delete",
  GET_ALL_WORINGPROCESS: "/workingprocess/all",

  GET_ALL_REPORT_RECEIPT: "/report/receipt",
  GET_ALL_REPORT_EXPORT: "/report/export",
>>>>>>> 6321d86e95b6c11810e093df4dbcf786f7c40e91
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

const GENDER_STATUS = {
  MALE: { code: "MALE", name: "Nam" },
  FA_MALE: { code: "FA_MALE", name: "Nữ" },
};

const POSITION_TYPE = {
  CHAIRMAN_OF_THE_BOARD: { code: "", name: "Chủ tịch hội đồng quản trị" },
  MEMBER_OF_MANAGEMENT_COUNCIL: {
    code: "",
    name: "Thành viên hội đồng quản trị",
  },
  CHIEF_EXECUTIVE_OFFICER: {
    code: "CHIEF_EXECUTIVE_OFFICER",
    name: "Giám đốc điều hành",
  },
  CHIEF_FINANCIAL_OFFICER: {
    code: "CHIEF_FINANCIAL_OFFICER",
    name: "Giám đốc tài chính",
  },
  CHIEF_MARKETING_OFFICER: {
    code: "CHIEF_MARKETING_OFFICER",
    name: "Giám đốc Marketing",
  },
  CHIEF_LEGAL_OFFICER: {
    code: "CHIEF_LEGAL_OFFICER",
    name: "Giám đốc pháp lý",
  },
  CHIEF_COMMERCIAL_OFFICER: {
    code: "CHIEF_COMMERCIAL_OFFICER",
    name: "Giám đốc thương mại",
  },
  MANAGER: { code: "MANAGER", name: "Quản lý" },
  EMPLOYEE: { code: "EMPLOYEE", name: "Nhân viên" },
  ADMIN: { code: "ADMIN", name: "Admin" },
};

const DEPARTMENT_TYPE = {
  HUMAN_RESOURCES: { code: "HUMAN_RESOURCES", name: "Phòng nhân sự" },
  SALES_AND_MARKETING: {
    code: "SALES_AND_MARKETING",
    name: "Phòng kinh doanh",
  },
  RESEARCH_AND_DEVELOPMENT: {
    code: "RESEARCH_AND_DEVELOPMENT",
    name: "Phòng nghiên cứu và phát triển",
  },
  LOGISTICS: { code: "LOGISTICS", name: "Phòng vận chuyển" },
  DIGITAL_MARKETING: {
    code: "DIGITAL_MARKETING",
    name: "Phòng tiếp thị trực tuyến",
  },
};

const REWARD_DISCIPLINE_TYPE = {
  REWARD: { code: "REWARD", name: "Khen thưởng" },
  DISCIPLINE: {
    code: "DISCIPLINE",
    name: "Kỷ luật",
  },
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

const PRODUCT_TYPE = {
  SHORT_TERM: {
    code: "SHORT_TERM",
    name: "Ngắn hạn",
  },
  LONG_TERM: {
    code: "LONG_TERM",
    name: "Dài hạn",
  },
};

const PRODUCT_UNIT = {
  TON: {
    code: "TON",
    name: "Tấn",
  },
  TA: {
    code: "TA",
    name: "Tạ",
  },
  YEN: {
    code: "YEN",
    name: "Yến",
  },
  KG: {
    code: "KG",
    name: "Kilogram",
  },
  GAM: {
    code: "GAM",
    name: "Gram",
  },
  CAI: {
    code: "CAI",
    name: "Cái",
  },
  PACKAGING: {
    code: "PACKAGING",
    name: "Thùng",
  },
  BAG: {
    code: "BAG",
    name: "Túi",
  },
  PACKAGE: {
    code: "PACKAGE",
    name: "Gói",
  },
};

const STATUS_CODE = {
  OK: 200,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

const POSITION_STATUS = {
  ACTIVE: { code: "ACTIVE", name: "Họat động" },
  UN_ACTIVE: { code: "UN_ACTIVE", name: "Không hoạt động" },
};

const REPORT_TYPE = {
  MONTH: { code: "MONTH", name: "Tháng" },
  QUY: { code: "QUY", name: "Quý" },
  YEAR: { code: "YEAR", name: "Năm" },
};

const setting = Object.freeze({
  ROLE_LOCAL,
  USER_LOCAL,
  ROLE_TYPE,
  BASE_URL,
  URL_API,
  ACTION,
  STATUS_CODE,
  STORE_STATUS,
  STORE_TYPE,
  WAREHOUSE_RECEIPT_DETAIL_STATUS,
  GENDER_STATUS,
  DEPARTMENT_TYPE,
  POSITION_TYPE,
  POSITION_STATUS,
  REWARD_DISCIPLINE_TYPE,
  PRODUCT_UNIT,
  PRODUCT_TYPE,
<<<<<<< HEAD
=======
  REPORT_TYPE,
>>>>>>> 6321d86e95b6c11810e093df4dbcf786f7c40e91
});

export default setting;
