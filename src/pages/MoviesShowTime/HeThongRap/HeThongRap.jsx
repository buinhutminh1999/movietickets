import { Col,Space, Tabs} from 'antd';
import React, { memo } from 'react'
import LogoRap from './LogoRap/LogoRap';

 function ListRapFlim({tabPosition, heThongRap, checkTheoRap, setRap, setCumRap, lichChieuTheoRap}) {
  return (
    <Col span={12}>
    <>
      <Space
        style={{
          marginBottom: 24,
        }}
      ></Space>
      <Tabs
        tabPosition={tabPosition}
        items={heThongRap?.map((item) => {
          return {
            label: (
              //chi render khi chuyen rap
              <LogoRap item={item}/>
            ),
            key: item.maHeThongRap,
            children: <Space wrap>{checkTheoRap()}</Space>,
          };
        })}
        onChange={(e) => {
          setRap(e); // khi xét rạp thì khi chuyển rạp hàm checkTheoRap mới kiểm tra được cụm rạp nào mà load theo cụm rạp
          setCumRap(() => {
            //set ten rap dau tien sau khi chuyen rap
            let object = lichChieuTheoRap.find(
              (item) => item.maHeThongRap == e
            );
            console.log("object", object);
            return object?.lstCumRap[0];
          });
        }}
      />
    </>
  </Col>
  )
}

export default memo(ListRapFlim)
