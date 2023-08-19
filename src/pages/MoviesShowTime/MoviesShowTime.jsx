import React, { useEffect, useState, memo, useMemo, useCallback } from "react";
import axios from "axios";
import { Button, Col, Row } from "antd";
import { TOKEN, URL_API } from "../../ulti/setting";
import moment from "moment/moment";
import style from "./style.module.css";
import HeThongRap from "./HeThongRap/HeThongRap";
import DanhSachVePhim from "./DanhSachVePhim/DanhSachVePhim";
// - Thứ tự thao tác trong 1 ứng dụng:
// 	+ b1: load ứng dụng lên
// 	+ b2: khởi tạo state, hàm
// 	+ b3: chạy return => render UI
// 	+ b4: useEffect gọi hàm call api (didmount)
// 	+ b5: setState trong hàm call api => render lại ui (lặp lại b2 => nhưng ko khởi tạo các hook, nếu ko có useEffect sẽ lặp vô tận)
// 	+ b6: arr có data mới
// 	+ b7: binding data lên UI
const date = moment();
function MoviesShowTime(props) {
  const [tabPosition, setTabPosition] = useState("top");
  const [heThongRap, setHeThongRap] = useState([]);
  const [lichChieuTheoRap, setLichChieuTheoRap] = useState([]);
  const [rap, setRap] = useState("");
  const [cumRap, setCumRap] = useState("");

  const chuyenRap = (result) => {
    let newArray = [];
    if (rap == "") {
      newArray = result[1].data.content.filter(
        (item) => item.maHeThongRap === result[0].data.content[0].maHeThongRap
      );
    } else {
      newArray = result.data.content.filter(
        (item) => item.maHeThongRap === rap
      );
    }
    setLichChieuTheoRap(newArray);
    setCumRap(newArray[0].lstCumRap[0]);
  };
  let getListCenima = (urlHeThongRap, urlLichChieuHeThongRap) => {
    let promise = axios({
      method: "GET",
      url: `${URL_API}/${urlHeThongRap}`,
      headers: {
        TokenCybersoft: TOKEN,
      },
    });

    let promise2 = axios({
      method: "GET",
      url: `${URL_API}/${urlLichChieuHeThongRap}`,
      headers: {
        TokenCybersoft: TOKEN,
      },
    });

    Promise.all([promise, promise2]).then((result) => {
      setHeThongRap(result[0].data.content);
      chuyenRap(result);
    });
  };

  useEffect(() => {
    getListCenima(
      "QuanLyRap/LayThongTinHeThongRap",
      "QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01"
    );
  }, []);

  useEffect(() => {
    if (rap !== "") {
      const promise = axios({
        method: "GET",
        url: `${URL_API}/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01`,
        headers: {
          TokenCybersoft: TOKEN,
        },
      });
      promise
        .then((result) => {
          chuyenRap(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [rap]);

  const handleButtonClick = useCallback((item) => {
    setCumRap(item);
  }, []);
  const checkFlimDangChieuVaSapChieu = (cumRap) => {
    let a = [];
    cumRap?.danhSachPhim?.forEach((item) => {
      item.lstLichChieuTheoPhim.forEach((item2) => {
        if (
          moment(item2.ngayChieuGioChieu, "YYYY-MM-DD HH:mm:ss").isAfter(
            date
          ) ||
          moment(item2.ngayChieuGioChieu, "YYYY-MM-DD HH:mm:ss").isSame(
            date.startOf("day")
          )
        ) {
          a = [
            ...a,
            {
              hinhAnh: item.hinhAnh,
              maPhim: item.maPhim,
              tenPhim: item.tenPhim,
              lstLichChieuTheoPhim: [
                {
                  maLichChieu: item2.maLichChieu,
                  ngayChieuGioChieu: item2.ngayChieuGioChieu,
                },
              ],
            },
          ];
        }
      });
    });
    return a;
  };
  const data = useMemo(() => {
    if (cumRap !== "") {
      const mapList = checkFlimDangChieuVaSapChieu(cumRap);
      return mapList;
    }
  }, [cumRap]);
  let checkTheoRap = () => {
    return lichChieuTheoRap.map((lichChieu) => {
      return lichChieu.lstCumRap.map((item) => (
        <div
          className={
            item === cumRap
              ? "bg-pink-50 opacity-100 text-left grid grid-cols-12 items-center py-2"
              : "bg-transparent text-left grid grid-cols-12 items-center py-2"
          }
          key={item.maCumRap}
          onClick={() => handleButtonClick(item)}
        >
          <div className="col-span-11">
            <span className="text-md">{item.tenCumRap}</span>
          </div>
          <div className="col-span-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-gray-400 mr-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </div>
        </div>
      ));
    });

    // return buttons.flat().filter(Boolean); // Lọc và loại bỏ giá trị undefined chỉ khi chắn chắc giá trị if kiểm tra đúng
  };

  return (
    <div className="py-8">
      <p className="text-pink-600 font-bold text-center lg:text-3xl mb-5">Đặt vé ngay</p>
      <div
      id="booking-ticket"
      className="flex justify-center mx-auto rounded shadow-lg shadow-indigo-500/40"
      style={{
        border: "0px solid #e5e5e5",
        maxWidth: "1152px",
        maxHeight: "833px",
        background: "white",
      }}
    >
      
      <Col span={11}>
        <HeThongRap
          tabPosition={tabPosition}
          heThongRap={heThongRap}
          checkTheoRap={checkTheoRap}
          setRap={setRap}
          setCumRap={setCumRap}
          lichChieuTheoRap={lichChieuTheoRap}
        />
      </Col>
      <Col
        span={13}
       className="overflow-y-auto"
      >
        {<DanhSachVePhim props={props} data={data} />}
      </Col>
    </div>
    </div>
  );
}
export default memo(MoviesShowTime);
