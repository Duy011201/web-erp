import setting from "../setting.js";
import axios from "axios";

// Auth
export const LOGIN = user => {
  return axios.post(setting.BASE_URL + setting.URL_API.LOGIN, user);
};

// Store
export const GET_ALL_STORE = () => {
  return axios.post(setting.BASE_URL + setting.URL_API.GET_ALL_STORE);
};

export const GET_STORE_BY_ID = id => {
  return axios.post(
    `${setting.BASE_URL}${setting.URL_API.GET_STORE_BY_ID}?id=${id}`
  );
};

export const UPDATE_STORE_BY_ID = updateData => {
  return axios.post(
    setting.BASE_URL + setting.URL_API.UPDATE_STORE_BY_ID,
    updateData
  );
};

export const CREATE_STORE = newData => {
  return axios.post(
    `${setting.BASE_URL}${setting.URL_API.CREATE_STORE}`,
    newData
  );
};

export const DELETE_STORE_BY_ID = id => {
  return axios.post(
    `${setting.BASE_URL}${setting.URL_API.DELETE_STORE_BY_ID}?id=${id}`
  );
};

// Product
export const GET_ALL_PRODUCT = () => {
  return axios.post(setting.BASE_URL + setting.URL_API.GET_ALL_PRODUCT);
};

export const GET_PRODUCT_BY_ID = id => {
  return axios.post(
    `${setting.BASE_URL}${setting.URL_API.GET_PRODUCT_BY_ID}?id=${id}`
  );
};

export const UPDATE_PRODUCT_BY_ID = updateData => {
  return axios.post(
    setting.BASE_URL + setting.URL_API.UPDATE_PRODUCT_BY_ID,
    updateData
  );
};

export const CREATE_PRODUCT = newData => {
  return axios.post(
    `${setting.BASE_URL}${setting.URL_API.CREATE_PRODUCT}`,
    newData
  );
};

export const DELETE_PRODUCT_BY_ID = id => {
  return axios.post(
    `${setting.BASE_URL}${setting.URL_API.DELETE_PRODUCT_BY_ID}?id=${id}`
  );
};

// Material
export const GET_ALL_MATERIAL = () => {
  return axios.post(setting.BASE_URL + setting.URL_API.GET_ALL_MATERIAL);
};

export const GET_MATERIAL_BY_ID = id => {
  return axios.post(
    `${setting.BASE_URL}${setting.URL_API.GET_MATERIAL_BY_ID}?id=${id}`
  );
};

export const UPDATE_MATERIAL_BY_ID = updateData => {
  return axios.post(
    setting.BASE_URL + setting.URL_API.UPDATE_MATERIAL_BY_ID,
    updateData
  );
};

export const CREATE_MATERIAL = newData => {
  return axios.post(
    `${setting.BASE_URL}${setting.URL_API.CREATE_MATERIAL}`,
    newData
  );
};

export const DELETE_MATERIAL_BY_ID = id => {
  return axios.post(
    `${setting.BASE_URL}${setting.URL_API.DELETE_MATERIAL_BY_ID}?id=${id}`
  );
};

// Warehouse Receipt
export const GET_ALL_WAREHOUSE_RECEIPT = () => {
  return axios.post(
    setting.BASE_URL + setting.URL_API.GET_ALL_WAREHOUSE_RECEIPT
  );
};

export const GET_WAREHOUSE_RECEIPT_BY_ID = id => {
  return axios.post(
    `${setting.BASE_URL}${setting.URL_API.GET_WAREHOUSE_RECEIPT_BY_ID}?id=${id}`
  );
};

export const UPDATE_WAREHOUSE_RECEIPT_BY_ID = updateData => {
  return axios.post(
    setting.BASE_URL + setting.URL_API.UPDATE_WAREHOUSE_RECEIPT_BY_ID,
    updateData
  );
};

export const CREATE_WAREHOUSE_RECEIPT = newData => {
  return axios.post(
    `${setting.BASE_URL}${setting.URL_API.CREATE_WAREHOUSE_RECEIPT}`,
    newData
  );
};

export const DELETE_WAREHOUSE_RECEIPT_BY_ID = id => {
  return axios.post(
    `${setting.BASE_URL}${setting.URL_API.DELETE_WAREHOUSE_RECEIPT_BY_ID}?id=${id}`
  );
};

// Warehouse Receipt Details
export const GET_ALL_WAREHOUSE_RECEIPT_DETAIL = body => {
  return axios.post(
    setting.BASE_URL + setting.URL_API.GET_ALL_WAREHOUSE_RECEIPT_DETAIL,
    body
  );
};

export const GET_WAREHOUSE_RECEIPT_DETAIL_BY_ID = id => {
  return axios.post(
    `${setting.BASE_URL}${setting.URL_API.GET_WAREHOUSE_RECEIPT_DETAIL_BY_ID}?id=${id}`
  );
};

export const UPDATE_WAREHOUSE_RECEIPT_DETAIL_BY_ID = updateData => {
  return axios.post(
    setting.BASE_URL + setting.URL_API.UPDATE_WAREHOUSE_RECEIPT_DETAIL_BY_ID,
    updateData
  );
};

export const CREATE_WAREHOUSE_RECEIPT_DETAIL = newData => {
  return axios.post(
    `${setting.BASE_URL}${setting.URL_API.CREATE_WAREHOUSE_RECEIPT_DETAIL}`,
    newData
  );
};

export const DELETE_WAREHOUSE_RECEIPT_DETAIL_BY_ID = id => {
  return axios.post(
    `${setting.BASE_URL}${setting.URL_API.DELETE_WAREHOUSE_RECEIPT_DETAIL_BY_ID}?id=${id}`
  );
};

// Auth
export const CHECK_LOGIN = user => {
  return axios.post(setting.BASE_URL + setting.URL_API.CHECK_LOGIN, user);
};

export const REGISTER = user => {
  return axios.post(setting.BASE_URL + setting.URL_API.REGISTER, user);
};

export const CREATE_REGISTER = user => {
  return axios.post(setting.BASE_URL + setting.URL_API.CREATE_REGISTER, user);
};

export const UPDATE_PASSWORD = user => {
  return axios.post(setting.BASE_URL + setting.URL_API.UPDATE_PASSWORD, user);
};
