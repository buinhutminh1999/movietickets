import { Col,Button, Card, Space } from 'antd';
import moment from 'moment';
import React from 'react'

export default function DanhSachVePhim({data, props}) {
  return (
    <div>
        {data.map((item) => {
            return (
              <Col key={item.maPhim}>
                <Card hoverable title={item.tenPhim} bordered={true}>
                  <Space wrap>
                    {item.lstLichChieuTheoPhim.map((lst) => {
                      return (
                        <Button
                          type="primary"
                          ghost
                          className="col"
                          key={lst.maLichChieu}
                          onClick={() => {
                            props.history.push(`/checkout/${lst.maLichChieu}`);
                          }}
                        >
                          {moment(lst.ngayChieuGioChieu).format("hh:mm A")}
                        </Button>
                      );
                    })}
                  </Space>
                </Card>
              </Col>
            );
          })}
    </div>
  )
}
