import React from 'react'
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from 'antd';
import { useState } from 'react';
import { useFormik } from 'formik';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { themPhimUploadHinh } from '../../../redux/action/movieAction';
export default function AddFlim() {
  const [imgSrc, setImgSrc] = useState('')
  const [componentSize, setComponentSize] = useState('default');
  const dispatch = useDispatch()
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const handleChangeDatePicker = (value) => {
    formik.setFieldValue('ngayKhoiChieu', moment(value.$d).format('DD/MM/YYYY'))
  }
  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value)
    }
  }

  const handleChangeFile = (e) => {
    let file = e.target.files[0]
    //tạo đối tượng để đọc file
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = e => { setImgSrc(e.target.result) }
    formik.setFieldValue('hinhAnh', file)
  }
  const formik = useFormik({
    initialValues: {
      tenPhim: '',
      trailer: '',
      moTa: '',
      ngayKhoiChieu: '',
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: {}
    },
    onSubmit: (values) => {
      let formData = new FormData()
      for (const key in values) {
        console.log(key)
        if (key !== 'hinhAnh') {
          formData.append(key, values[key])

        } else {
          console.log('values.hinhAnh', values.hinhAnh)
          formData.append('File', values.hinhAnh, values.hinhAnh.name)
        }
      }
      dispatch(themPhimUploadHinh(formData))
    }
  })
  return (
    <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      style={{
        maxWidth: 600,
      }}
      onSubmitCapture={formik.handleSubmit}

    >
      <h3>Thêm mới Flim</h3>
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Tên phim">
        <Input name='tenPhim' onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="trailer">
        <Input name='trailer' onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Mô tả">
        <Input name='moTa' onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Ngày khởi chiếu:">
        <DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDatePicker} />
      </Form.Item>
      <Form.Item label="Đang chiếu" valuePropName="checked" >
        <Switch onChange={handleChangeSwitch('dangChieu')} />
      </Form.Item>
      <Form.Item label="Sắp chiếu" valuePropName="checked">
        <Switch onChange={handleChangeSwitch('sapChieu')} />
      </Form.Item>
      <Form.Item label="Hot" valuePropName="checked">
        <Switch onChange={handleChangeSwitch('hot')} />
      </Form.Item>
      <Form.Item label="Số sao">
        <Input name='danhGia' onChange={formik.handleChange} min={1} max={10} />
      </Form.Item>
      <Form.Item label="Hình ảnh">
        <input name='hinhAnh' type={'file'} onChange={handleChangeFile} accept="image/png,img/jpeg, img/gift" />
        <img src={imgSrc} width={150} height={150} />
      </Form.Item>

      <button type='submit' className='btn btn-success'>Thêm phim</button>

    </Form>
  )
}
