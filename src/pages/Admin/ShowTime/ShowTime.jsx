import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { layThongTinCumRapTheoHeThong, layThongTinHeThongRap, taoLichChieu } from '../../../redux/action/movieAction'
import { Button, Form, Input, Select, Space, Tooltip, Typography, DatePicker, InputNumber, Col, Row } from 'antd';
import _ from 'lodash';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
const range = (start, end) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

// eslint-disable-next-line arrow-body-style
const disabledDate = (current) => {
  // Can not select days before today and today
  return current && current < dayjs().endOf('day');
};
const disabledDateTime = () => ({
  disabledHours: () => range(0, 24).splice(4, 20),
  disabledMinutes: () => range(30, 60),
  disabledSeconds: () => [55, 56],
});

export default function ShowTime(props) {
 
  const [flim, setFilm] = useState(JSON.parse(localStorage.getItem('Flim')))
  const dispatch = useDispatch()
  const { heThongRap, cumRapTheoHeThongRap } = useSelector(state => state.movieReducer)
  const formik = useFormik({
    initialValues: {
      maPhim: props.match.params.id,
      maRap: '',
      ngayChieuGioChieu: '',
      giaVe: 0,
    },
    onSubmit: (e) => {
      console.log('e',e)
      dispatch(taoLichChieu(e))
    }
  })
  useEffect(() => {
    // setFilm(JSON.parse(localStorage.getItem('Flim'))
    dispatch(layThongTinHeThongRap())
  }, [])

  const handleHeThongRap = (e) => {
    if (e !== '') {
      dispatch(layThongTinCumRapTheoHeThong(e))
    }
  }
  const onChangeInputNumber = (e) => {
    formik.setFieldValue('giaVe', e)
  }

  const onChangeDate = (e) => {
    console.log(e)
    formik.setFieldValue('ngayChieuGioChieu', dayjs(e).format('DD/MM/YYYY HH:mm:ss'))
  }

  const onChangeCumRap = (e) => {
    formik.setFieldValue('maRap', e)
  }
  return (
    <div>
      <h3>Tạo lịch chiếu - {flim.tenPhim}</h3>
      <Row>
        <Col span={4}>
          <img src={flim.hinhAnh} className='img-fluid' alt="" />
        </Col>
        <Col span={20}>

          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            onSubmitCapture={formik.handleSubmit}
          >

            <Form.Item label="Hệ thống rạp" >
              <Select onChange={handleHeThongRap}>
                {heThongRap.map((item) => {
                  return <Select.Option key={item.maHeThongRap} value={item.maHeThongRap}>{item.tenHeThongRap}</Select.Option>
                })}

              </Select>
            </Form.Item>
            <Form.Item
              label="Cụm rạp"
            >
              <Select name='cumRap' onChange={onChangeCumRap}>
                {_.isEmpty(cumRapTheoHeThongRap)
                  ? <Select.Option value={''}>Vui lòng chọn hệ thống rạp</Select.Option>
                  : cumRapTheoHeThongRap.map((item) => {
                    return <Select.Option key={item.maHeThongRap} value={item.maCumRap}>{item.tenCumRap}</Select.Option>
                  })}
              </Select>
            </Form.Item>
            <Form.Item
              label="Ngày giờ chiếu"
            >
              <DatePicker
                format="DD-MM-YYYY HH:mm:ss"
                disabledDate={disabledDate}
                disabledTime={disabledDateTime}
                showTime={{
                  defaultValue: dayjs('00:00:00', 'HH:mm:ss'),
                }}
                name="ngayGioChieu"
                onChange={onChangeDate}
              />
            </Form.Item>
            <Form.Item
              label="Gía vé"
            >
              <InputNumber name='giaVe' onChange={onChangeInputNumber} />
            </Form.Item>
            <Form.Item label="Tạo lịch chiếu">
              <Button type='submit' htmlType='submit'>Tạo lịch chiếu</Button>
            </Form.Item>
          </Form>

        </Col>
      </Row>

    </div>
  )
}
