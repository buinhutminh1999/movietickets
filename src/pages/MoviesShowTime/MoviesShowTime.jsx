import React, { useEffect, useState, memo, useLayoutEffect } from "react";
import axios from "axios";
import { Space, Tabs, Button, Card, Col, Row } from "antd";
import { TOKEN, URL_API } from "../../ulti/setting";
import moment from "moment/moment";
import { style } from "./styleMoviesShowTime.css";
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
  const [data, setData] = useState([]);
  performance.now();
  const [tabPosition, setTabPosition] = useState("left");
  const [heThongRap, setHeThongRap] = useState([]);
  const [lichChieuTheoRap, setLichChieuTheoRap] = useState([]);
  const [rap, setRap] = useState("");
  const [cumRap, setCumRap] = useState("");
  let getListCenima = (url, setValue) => {
    let promise = axios({
      method: "GET",
      url: `${URL_API}/${url}`,
      headers: {
        TokenCybersoft: TOKEN,
      },
    });
    promise
      .then((result) => {
        if (setValue == setHeThongRap) {
          setRap(result.data.content[0].maHeThongRap);
        } else {
          setCumRap(result.data.content[5].lstCumRap[0]);
        }

        setValue(result.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getListCenima("QuanLyRap/LayThongTinHeThongRap", setHeThongRap);
    getListCenima(
      "QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01",
      setLichChieuTheoRap
    );
  }, []);

  useLayoutEffect(() => {
    if (cumRap !== "") {
      const mapList = checkFlimDangChieuVaSapChieu(cumRap);
      setData(mapList);
    }
  }, [cumRap]);

  let checkTheoRap = () => {
    return lichChieuTheoRap.map((lichChieu) => {
      if (lichChieu.maHeThongRap == rap) {
        //kiểm tra chỉ hiển thị cụm rạp theo rạp tương ứng
        return lichChieu.lstCumRap.map((item) => (
          <Button
            type={item === cumRap ? "primary" : "dashed"}
            key={item.maCumRap}
            onClick={() => {
              setCumRap(item);
            }}
          >
            <p>{item.tenCumRap}</p>
          </Button>
        ));
      }
    });
  };

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
  return (
    <div className="container d-flex" style={{ margin: "100px 0" }}>
      <p>jyyiuy</p>
      {/* <HeThongRap
        tabPosition={tabPosition}
        heThongRap={heThongRap}
        checkTheoRap={checkTheoRap}
        setRap={setRap}
        setCumRap={setCumRap}
        lichChieuTheoRap={lichChieuTheoRap}
      />
      <Col
        span={12}
        style={{
          flex: "1",
          backGround: "#aaa",
          overflowY: "scroll",
          height: "100vh",
        }}
      >
        <Row gutter={[16, 16]}>
          {<DanhSachVePhim props={props} data={data}/>}
        </Row>
      </Col> */}
    </div>
  );
}
export default memo(MoviesShowTime);
