import React, { memo } from "react";

function DateDanhSachVePhim({ d, handleSetDate, day }) {
  return (
    <div
      onClick={() => {
        handleSetDate(d.dayMonthYears);
      }}
    >
      <div className={"grid grid-row-2 border rounded cursor-pointer"}>
        <span
          className={`${
            day === d.date ? "bg-pink-600 text-white" : "bg-gray-100 text-black"
          }  text-lg font-semibold mb-0 py-1`}
        >
          {d.date}
        </span>
        <span
          className={`${
            day === d.date ? "text-pink-600" : "text-gray-400"
          } bg-transparent mb-0 py-1`}
        >
          {d.day}
        </span>
      </div>
    </div>
  );
}
export default memo(DateDanhSachVePhim);
