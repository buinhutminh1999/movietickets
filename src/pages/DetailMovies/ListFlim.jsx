import React from "react";
import { Space, Tabs, Card, Button, Rate } from "antd";
import { history } from "../../App";
import moment from "moment";
import { memo } from "react";

function ListFlim({ detailMovies, tabPosition }) {
  return (
    <div className="grid sm:grid-cols-1 lg:grid-cols-3 mt-3 gap-5">
      <Tabs
        tabPosition={tabPosition}
        className="col-span-2"
        items={detailMovies.heThongRapChieu?.map((item) => {
          return {
            label: (
              <div className="logo">
                <div className="logo__item">
                  <img width={50} src={item.logo} alt="" />
                </div>
                <div className="logo__content">
                  <p>{item.maHeThongRap}</p>
                </div>
              </div>
            ),
            key: item.maHeThongRap,
            children: item.cumRapChieu.map((cumRap) => {
              return (
                <div key={cumRap.maCumRap}>
                  <p>{cumRap.tenCumRap}</p>
                  <img width={50} src={cumRap.hinhAnh} alt="logo"/>
                  <p>{cumRap.diaChi}</p>
                  <div className="row">
                    {cumRap.lichChieuPhim?.map((rap) => {
                      return (
                        <Space wrap className="mr-2" key={rap.maLichChieu}>
                          <Button
                            type="primary"
                            ghost
                            onClick={() => {
                              localStorage.setItem(
                                "DetailFlim",
                                JSON.stringify(detailMovies)
                              );
                              history.push(`/checkout/${rap.maLichChieu}`);
                            }}
                          >
                            {rap.tenRap} -{" "}
                            {moment(rap.ngayChieuGioChieu).format("hh:mm A")}
                          </Button>
                        </Space>
                      );
                    })}
                  </div>
                </div>
              );
            }),
          };
        })}
      />
      <Card
        hoverable
        className="col-span-1 text-center "
        cover={
          <div>
            <p className="m-0" style={{ fontSize: "35px" }}>
              🥳
            </p>
            <p style={{ fontSize: "25px" }}>Đáng xem</p>
          </div>
        }
      >
        <Rate allowHalf value={detailMovies.danhGia / 2} disabled />
      </Card>
    </div>
  );
}

export default memo(ListFlim);
