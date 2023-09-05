import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Col } from "antd";
import { TOKEN, URL_API } from "../../ulti/setting";
import moment from "moment";
import "moment/locale/vi";
import HeThongRap from "./HeThongRap/HeThongRap";
import DanhSachVePhim from "./DanhSachVePhim/DanhSachVePhim";
import { forwardRef } from 'react';

// - Thứ tự thao tác trong 1 ứng dụng:
// 	+ b1: load ứng dụng lên
// 	+ b2: khởi tạo state, hàm
// 	+ b3: chạy return => render UI
// 	+ b4: useEffect gọi hàm call api (didmount)
// 	+ b5: setState trong hàm call api => render lại ui (lặp lại b2 => nhưng ko khởi tạo các hook, nếu ko có useEffect sẽ lặp vô tận)
// 	+ b6: arr có data mới
// 	+ b7: binding data lên UI
let dateFlim = [];
for (let i = 0; i < 6; i++) {
  dateFlim.push({
    id: i,
    date: moment().add(i, "days").format("DD"),
    day:
      i === 0
        ? "Hôm nay"
        : moment().add(i, "days").format("dddd")[0].toUpperCase() +
          moment().add(i, "days").format("dddd").substring(1),
    month: moment().format("MM"),
    years: moment().format("YYYY"),
    dayMonthYears: moment().add(i, "days").format("DD-MM-YYYY"),
  });
}
function MoviesShowTime(props,ref) {
  const [tabPosition, setTabPosition] = useState("top");
  const [heThongRap, setHeThongRap] = useState([]);
  const [lichChieuTheoRap, setLichChieuTheoRap] = useState([]);
  const [rap, setRap] = useState("");
  const [cumRap, setCumRap] = useState("");
  const [data, setData] = useState([]);
  const [dateListFlimForDay, setDateListFlimForDay] = useState(
    moment().format("DD-MM-YYYY")
  );

  const handleSetDate = useCallback((dateFlim) => {
    setDateListFlimForDay(dateFlim);
  }, []);
  const chuyenRap = (result) => {
    let newArray = [];
    if (rap === "") {
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
  const checkFlimDangChieuVaSapChieu = () => {
    let listFlim = [];
    cumRap?.danhSachPhim?.forEach((item) => {
      item.lstLichChieuTheoPhim.forEach((item2) => {
        if (
          dateListFlimForDay ===
          moment(item2.ngayChieuGioChieu).format("DD-MM-YYYY")
        ) {
          listFlim = [
            ...listFlim,
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
    setData(listFlim);
  };
  useEffect(() => {
    if (cumRap !== "") {
      checkFlimDangChieuVaSapChieu(cumRap);
    }
  }, [cumRap, dateListFlimForDay]);
  let checkTheoRap = useCallback(() => {
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
              className="h-4 w-4 text-gray-400 mr-0"
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
  }, [cumRap]);
  return (
    <div className="py-8" ref={ref} id='targetComponent'>
      <p className="text-pink-600 font-bold text-center lg:text-3xl mb-5">
        Đặt vé ngay
      </p>
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
        <Col span={13} className="overflow-y-auto">
          <DanhSachVePhim
            props={props}
            data={data}
            dateFlim={dateFlim}
            dateListFlimForDay={dateListFlimForDay}
            handleSetDate={handleSetDate}
          />
        </Col>
      </div>
    </div>
  );
}

export default forwardRef(MoviesShowTime)
