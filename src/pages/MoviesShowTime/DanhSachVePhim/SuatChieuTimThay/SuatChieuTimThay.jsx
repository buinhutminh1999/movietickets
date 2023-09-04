import React from "react";
import { Button } from "antd";
import moment from "moment";

export default function SuatChieuTimThay({ item, history }) {
  return (
    <div className="grid grid-cols-12 gap-2 mx-auto px-4 py-4 border border-zinc-900">
      <div
        className="col-span-3"
        style={{ maxWidth: "120px", minHeight: "180px" }}
      >
        <img src={item.hinhAnh} className="w-100 h-100" />
      </div>
      <div title={item.tenPhim} className="col-span-9">
        {item.lstLichChieuTheoPhim.map((lst, index) => {
          return (
            <div className="grid grid-rows-3 gap-2 px-4" key={Math.random()}>
              <div className="movies__showtimes__item">
                <p>{item.tenPhim}</p>
              </div>
              <div className="movies__showtimes__item">
                <div className="grid grid-cols-4">
                  <Button
                    type="primary"
                    ghost
                    onClick={() => {
                      history.push(`/checkout/${lst.maLichChieu}`);
                    }}
                  >
                    {moment(lst.ngayChieuGioChieu).format("hh:mm A")}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
