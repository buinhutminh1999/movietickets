import { Space } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { datVe, LayDanhSachPhongVe } from "../../redux/action/movieAction";
import { style } from "./checkout.css";
import _ from "lodash";
import { UserOutlined } from "@ant-design/icons";
import SeatItem from "./SeatItem/SeatItem";

export default function Checkout({ id, handleSetKey }) {
  let { usLogin, roomTicket } = useSelector((state) => state.movieReducer);
  let [mangGheDaChon, setMangGheDaChon] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    let action = LayDanhSachPhongVe(id);
    dispatch(action);
  }, []);

  const chonGhe = useCallback((item) => {
    setMangGheDaChon((preState) => {
      let obj = preState.find((item2) => {
        return item.maGhe === item2.maGhe;
      });
      if (obj) {
        // ghe sau khi duoc them, khi da ton tai loai ma ghe da chon ra khoi mang
        return preState.filter((item2) => item2.maGhe !== item.maGhe); // giong xoa ghe ra khoi mang\
      } else {
        // ghe moi duoc them
        return [...preState, { maGhe: item.maGhe, giaVe: item.giaVe }];
      }
    });
  },[])
  const renderDsGhe = () => {
    return roomTicket.danhSachGhe?.map((item) => {
      let banDaDat =
        usLogin.taiKhoan === item.taiKhoanNguoiDat ? "taiKhoanBanDaDat" : "";

      let daDat = item.daDat ? "daDat" : "";
      let gheVip = item.loaiGhe === "Vip" ? "gheVip" : "";
      let gheThuong = item.loaiGhe === "Thuong" ? "gheThuong" : "";
      let daChon = "";
      for (const value of mangGheDaChon) {
        if (value.maGhe === item.maGhe) {
          daChon = "daChon border border-white";
        }
      }
      return (
        <SeatItem
          key={item.tenGhe}
          banDaDat={banDaDat}
          chonGhe={chonGhe}
          daChon={daChon}
          daDat={daDat}
          gheThuong={gheThuong}
          gheVip={gheVip}
          item={item}
          usLogin={usLogin}
        />
      );
      //  {(index + 1) % 16 == 0?  <br/> : ''}
    });
  };

  let total = useMemo(() => {
    return mangGheDaChon
      .reduce((total, item) => {
        return total + item.giaVe;
      }, 0)
      .toLocaleString();
  }, [mangGheDaChon]);

  useEffect(() => {
    // khi api trả về dữ liệu thay đỏi thì set lại state
    if (mangGheDaChon.length > 0) {
      setMangGheDaChon([]);
      handleSetKey();
    }
  }, [roomTicket]);

  return (
    <div className="container p-5 ">
      <div className="grid sm:grid-cols-1 lg:grid-cols-3">
        <div className="col-span-2">
          <div className="grid grid-cols-12 gap-2">{renderDsGhe()}</div>
        </div>

        <div>
          <div className="movies__name col-span-1">
            <h3>{roomTicket.thongTinPhim?.tenPhim}</h3>
          </div>
          <hr />
          <div className="movies_address">
            <p>{roomTicket.thongTinPhim?.tenCumRap}</p>
          </div>

          <div className="movies__seats grid grid-cols-2">
            <p>Chỗ ngồi</p>
            <div>
              {_.sortBy(mangGheDaChon, ["maGhe"]).map((item, i) => {
                return (
                  <span key={item.maGhe}>
                    {mangGheDaChon.length - 1 === i
                      ? item.maGhe
                      : `${item.maGhe}, `}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="movies__date grid grid-cols-2">
            <p>Ngày chiếu:</p>
            <p>
              {roomTicket.thongTinPhim?.ngayChieu} -{" "}
              {roomTicket.thongTinPhim?.gioChieu}
            </p>
          </div>

          <div className="movies__total grid grid-cols-2">
            <p>Tạm tính</p>
            <p>{total}</p>
          </div>
          <div className="movies__info">
            <div className="grid grid-cols-2">
              <p>Email: </p>
              <p>{usLogin?.email}</p>
            </div>
            <div className="grid grid-cols-2">
              <p>Số điện thoại:</p>
              <p>{usLogin?.soDT}</p>
            </div>
          </div>
          <button
            className="button-primary mt-3"
            disabled={mangGheDaChon.length === 0 ? true : false}
            onClick={() => {
              let maLichChieu = id;
              let danhSachVe = mangGheDaChon;
              //khi bấm đặt vé load lại ghế trên api, for qua danhSachGhe.soGhe == api.soGhe && soGhe == taiKhoan : daDatThanhCong : da có ng đặt
              let action = datVe({ maLichChieu, danhSachVe });
              dispatch(action);
            }}
          >
            Mua vé
          </button>
          <Space
            direction="vertical"
            style={{
              width: "100%",
            }}
          >
            {/* {postTickets == '' ? null : <Alert message={postTickets !== ? 'Mua vé thành công' : ''} type="success" /> } */}
          </Space>
        </div>
      </div>
      <div className="grid grid-cols-1">
        <table className="table">
          <thead>
            <tr>
              <th>Ghế thường</th>
              <th>Ghế bạn chọn</th>
              <th>Ghế Vip</th>
              <th>Ghế khách đã đặt</th>
              <th>Ghế bạn đã đặt</th>
              <th>Ghế khách đang đặt</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <button className={`ghe gheThuong`}></button>
              </td>
              <td>
                <button className={`ghe daChon`}></button>
              </td>
              <td>
                <button className={`ghe gheVip`}></button>
              </td>
              <td>
                <button className={`ghe daDat`}></button>
              </td>
              <td>
                <button className={`ghe taiKhoanBanDaDat`}>
                  <UserOutlined />
                </button>
              </td>
              <td>
                <button className={`ghe khachDangDat`}></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
