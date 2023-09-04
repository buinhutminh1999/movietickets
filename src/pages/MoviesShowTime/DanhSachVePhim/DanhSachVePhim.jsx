import moment from "moment";
import React, { memo, useMemo } from "react";
import DateDanhSachVePhim from "./DateDanhSachVePhim/DateDanhSachVePhim";
import SuatChieuTimKhongThay from "./SuatChieuKhongTimThay/SuatChieuTimKhongThay";
import SuatChieuTimThay from "./SuatChieuTimThay/SuatChieuTimThay";
function DanhSachVePhim({
  data,
  props,
  dateFlim,
  dateListFlimForDay,
  handleSetDate,
}) {
  const day = useMemo(() => {
    return moment(dateListFlimForDay, "DD-MM-YYYY").format("DD");
  }, [dateListFlimForDay]);

  return (
    <div>
      <div className="grid grid-cols-6 text-center py-2 px-2 gap-2">
        {dateFlim.map((d) => {
          return (
            <DateDanhSachVePhim
              d={d}
              day={day}
              handleSetDate={handleSetDate}
              key={d.id}
            />
          );
        })}
      </div>
      {data?.length === 0 ? (
        <SuatChieuTimKhongThay />
      ) : (
        data?.map((item) => {
          return (
            <SuatChieuTimThay
              item={item}
              history={props.history}
              key={item.maPhim}
            />
          );
        })
      )}
    </div>
  );
}
export default memo(DanhSachVePhim);
