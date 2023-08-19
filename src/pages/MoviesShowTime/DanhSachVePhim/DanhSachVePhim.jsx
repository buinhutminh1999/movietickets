import { Col, Button, Card, Space } from "antd";
import moment from "moment";
import React, { memo } from "react";

function DanhSachVePhim({ data, props }) {
  return (
    <div>
      {data?.length === 0 ? (
        <div className="flex justify-center align-items-center h-screen flex-col">
          <p className="mb-0">'Úi, Suất chiếu không tìm thấy.'</p>
          <img
            src="https://homepage.momocdn.net/next-js/_next/static/public/cinema/not-found.svg"
            alt="logo"
            width={100}
          />
        </div>
      ) : (
        data?.map((item) => {
          return (
            <div
              key={item.maPhim}
              className="grid grid-cols-12 gap-2 mx-auto px-4 py-4 border border-zinc-900"
            >
              <div
                className="col-span-3"
                style={{ maxWidth: "120px", minHeight: "180px" }}
              >
                <img src={item.hinhAnh} className="w-100 h-100" />
              </div>
              <div
                hoverable
                title={item.tenPhim}
                bordered={true}
                className="col-span-9"
              >
                {item.lstLichChieuTheoPhim.map((lst) => {
                  return (
                    <div className="grid grid-rows-3 gap-2 px-4">
                      <div className="movies__showtimes__item">
                        <p>{item.tenPhim}</p>
                      </div>
                      <div className="movies__showtimes__item">
                        <div className="grid grid-cols-4">
                          <Button
                            type="primary"
                            ghost
                            key={lst.maLichChieu}
                            onClick={() => {
                              props.history.push(
                                `/checkout/${lst.maLichChieu}`
                              );
                            }}
                          >
                            {moment(lst.ngayChieuGioChieu).format("hh:mm A")}
                          </Button>
                        </div>
                      </div>
                      <div className="movies__showtimes__item">
                      <p className="alert alert-success">{moment(lst.ngayChieuGioChieu).format("DD/MM/YYYY")}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
export default memo(DanhSachVePhim);
