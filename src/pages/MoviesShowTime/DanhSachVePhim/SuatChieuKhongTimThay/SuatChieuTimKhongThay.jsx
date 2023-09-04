import React, { memo } from "react";

function SuatChieuTimKhongThay() {
  return (
    <div className="flex justify-center align-items-center h-screen flex-col">
      <p className="mb-0">'Úi, Suất chiếu không tìm thấy.'</p>
      <img
        src="https://homepage.momocdn.net/next-js/_next/static/public/cinema/not-found.svg"
        alt="logo"
        width={100}
      />
    </div>
  );
}
export default memo(SuatChieuTimKhongThay);
