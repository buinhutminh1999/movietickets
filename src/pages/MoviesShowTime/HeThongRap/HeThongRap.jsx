import { Col, Space, Tabs } from "antd";
import React, { memo } from "react";
import LogoRap from "./LogoRap/LogoRap";

function ListRapFlim({ tabPosition, heThongRap, checkTheoRap, setRap }) {
  return (
    <Tabs
      tabPosition={tabPosition}
      className="px-4 py-4 border border-zinc-900"
      items={heThongRap?.map((item) => {
        return {
          label: (
            //chi render khi chuyen rap
            <LogoRap item={item} className="logo" />
          ),
          key: item.maHeThongRap,
          children: <div className="overflow-y-auto h-screen cursor-pointer">{checkTheoRap()}</div>,
        };
      })}
      onChange={(e) => {
        setRap(e); // khi xét rạp thì khi chuyển rạp hàm checkTheoRap mới kiểm tra được cụm rạp nào mà load theo cụm rạp
      }}
    />
  );
}

export default memo(ListRapFlim);
