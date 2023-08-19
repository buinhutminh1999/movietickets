import { Button } from "antd";
import moment from "moment";
import React, { memo } from "react";
function DanhSachVePhim({
  data,
  props,
  dateFlim,
  dateListFlimForDay,
  handleSetDate,
}) {
  let day = moment(dateListFlimForDay, "DD-MM-YYYY").format("DD");
  let monthAndYear = moment(dateListFlimForDay, "DD-MM-YYYY").format("MM-YYYY");

  console.log("day", monthAndYear);
  return (
    <div>
      <div className="grid grid-cols-6 text-center py-2 px-2 gap-2">
        {dateFlim.map((d) => {
          return (
            <div
              key={Math.random()}
              onClick={() => {
                handleSetDate(`${d.date}-${monthAndYear}`);
              }}
            >
              <div
                className={
                  day === d.date
                    ? "grid grid-row-2 border rounded cursor-pointer"
                    : "grid grid-row-2 border rounded cursor-pointer"
                }
              >
                <span
                  className={
                    day === d.date
                      ? "bg-pink-600 text-white text-lg font-semibold mb-0 py-1"
                      : "bg-gray-100 text-black text-lg font-semibold mb-0 py-1"
                  }
                >
                  {d.date}
                </span>
                <span
                  className={
                    day === d.date
                      ? "text-pink-600 bg-transparent mb-0 py-1"
                      : "text-gray-400 bg-transparent mb-0 py-1"
                  }
                >
                  {d.day}
                </span>
              </div>
            </div>
          );
        })}
      </div>
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
              <div title={item.tenPhim} className="col-span-9">
                {item.lstLichChieuTheoPhim.map((lst, index) => {
                  return (
                    <div
                      className="grid grid-rows-3 gap-2 px-4"
                      key={Math.random()}
                    >
                      <div className="movies__showtimes__item">
                        <p>{item.tenPhim}</p>
                      </div>
                      <div className="movies__showtimes__item">
                        <div className="grid grid-cols-4">
                          <Button
                            type="primary"
                            ghost
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
