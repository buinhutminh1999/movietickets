import React, { memo } from "react";
import { UserOutlined } from "@ant-design/icons";

function SeatItem({
  item,
  banDaDat,
  gheThuong,
  gheVip,
  daChon,
  daDat,
  chonGhe,
  usLogin,
}) {
  console.log("rednder", item.tenGhe);
  return (
    <>
      <button
        className={`ghe ${banDaDat} ${gheVip} ${gheThuong} ${daChon} ${daDat}`}
        disabled={item.daDat}
        onClick={() => {
          chonGhe(item);
        }}
      >
        {usLogin.taiKhoan === item.taiKhoanNguoiDat ? (
          <UserOutlined />
        ) : (
          item.tenGhe
        )}
      </button>
    </>
  );
}
export default memo(SeatItem);
