import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thongTinDatVe } from "../../redux/action/movieAction";
import { Card } from "antd";
import moment from "moment";

function KetQuaDatVe() {
  let { thongTinVe } = useSelector((state) => state.movieReducer);
  let dispatch = useDispatch();
  const renderThongTinDatVe = () => {
    return thongTinVe.thongTinDatVe?.map((item) => {
      return (
        <Card key={item.maVe} title={item.tenPhim} bordered={true}>
          <div className="grid grid-cols-2">
            <div>Ngày đặt</div>
            <div>{moment(item.ngayDat).format("DD/MM/YYYY")}</div>
          </div>
          <div className="grid grid-cols-2">
            <div>RẠP {item.danhSachGhe[0].tenRap}</div>
            <div>{item.danhSachGhe[0].tenHeThongRap}</div>
          </div>
          <div className="grid grid-cols-2">
            <div>GHẾ</div>
            <div className="grid grid-cols-3">
              {item.danhSachGhe.map((item2, i) => {
                return (
                  <span key={i}>
                    {item.danhSachGhe.length - 1 === i
                      ? item2.maGhe
                      : `${item2.maGhe},`}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div>Tạm tính</div>
            <div>
              {(item.giaVe * (item.danhSachGhe.length + 1)).toLocaleString()}
            </div>
          </div>
        </Card>
      );
    });
  };
  useEffect(() => {
    let action = thongTinDatVe();
    dispatch(action);
  }, []);

  return (
    <div>
      <h3>Kết quả đặt vé</h3>
      <div className="grid sm:grid grid-cols-1 lg:grid-cols-3 w-full gap-2">
        {renderThongTinDatVe()}
      </div>
    </div>
  );
}

export default memo(KetQuaDatVe);
