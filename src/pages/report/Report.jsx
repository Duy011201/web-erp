import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { error, success } from "../../common/sweetalert2.js";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import Header from "../../components/header/Header.jsx";
import Footer from "../../components/footer/Footer.jsx";
import Loading from "../../components/loading/Loading.jsx";

import "./style.scss";
import { GET_ALL_REPORT_EXPORT, GET_ALL_REPORT_RECEIPT } from "../service.js";
import setting from "../../setting.js";

export default function Report() {
  const [loading, setLoading] = useState(false);
  const [action, setAction] = React.useState({ option: true, time: "MONTH" });
  const [listData, setListData] = useState([]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setAction(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleAction = async (isOption, data) => {
  //   setAction(prevData => ({
  //     ...prevData,
  //     option: isOption,
  //   }));
  //   isOption ? getAllReportReceipt() : getAllReportExport();
  // };

  const getAllReportReceipt = async () => {
    try {
      setLoading(true);
      let listReceipt;
      await GET_ALL_REPORT_RECEIPT().then(res => {
        setLoading(false);
        if (res.status === setting.STATUS_CODE.OK) {
          listReceipt = res.data.data;
          setListData(listReceipt);
        }
      });
    } catch (err) {
      error("Error fetching data:", err);
      setLoading(false);
    }
  };

  const getAllReportExport = async () => {
    try {
      setLoading(true);
      let listExport;
      await GET_ALL_REPORT_EXPORT().then(res => {
        setLoading(false);
        if (res.status === setting.STATUS_CODE.OK) {
          listExport = res.data.data;
          setListData(listExport);
        }
      });
    } catch (err) {
      error("Error fetching data:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    if (setting.ROLE_LOCAL !== setting.ROLE_TYPE.ADMIN.code) {
      window.location = "/authentication";
      return;
    }
    setTimeout(() => {
      getAllReportReceipt();
      getAllReportExport;
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
                Báo cáo thống kê
              </span>
            </div>
            <div className="row mt-20">
              <div className="col-md-2 mt-10">
                {/* <div
                  className="form-check"
                  onClick={() => handleAction(true, setting.ACTION.ADD)}
                >
                  <input
                    type="radio"
                    className="form-check-input"
                    id="radio1"
                    name="optradio"
                    value="option1"
                    checked={action.option}
                    readOnly
                  />
                  Phiếu nhập
                </div>
                <div
                  className="form-check mt-20"
                  onClick={() => handleAction(false, setting.ACTION.ADD)}
                >
                  <input
                    type="radio"
                    className="form-check-input"
                    id="radio2"
                    name="optradio"
                    value="option2"
                    checked={!action.option}
                    readOnly
                  />
                  Phiếu xuất
                </div> */}
                <div className="mt-30">
                  <label htmlFor="">Thời gian</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={action.time}
                    onChange={handleInputChange}
                    name="time"
                  >
                    <option value="" disabled>
                      Chọn thời gian
                    </option>
                    {Object.values(setting.REPORT_TYPE).map(e => (
                      <option key={e.code} value={e.code}>
                        {e.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-10 mt-10">
                <AreaChart
                  width={730}
                  height={250}
                  data={listData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="uv"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#colorUv)"
                  />
                  <Area
                    type="monotone"
                    dataKey="pv"
                    stroke="#82ca9d"
                    fillOpacity={1}
                    fill="url(#colorPv)"
                  />
                </AreaChart>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}
