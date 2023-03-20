import React, { useEffect } from 'react'
import {
    DatePicker,
    Form,
    Input,
    Radio,
    Switch,
} from 'antd';
import { useState } from 'react';
import { useFormik } from 'formik';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { capNhatPhimUpload, layThongTinFlim } from '../../../redux/action/movieAction';
import _ from 'lodash';
import dayjs from 'dayjs';

export default function Edit(props) {
    const { thongTinFlim, listMovies } = useSelector(state => state.movieReducer)
    const [imgSrc, setImgSrc] = useState('')
    const [componentSize, setComponentSize] = useState('default');
    const dispatch = useDispatch()
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    const handleChangeDatePicker = (value) => {
        let ngayKhoiChieu = dayjs(value)
        formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu)
    }
    const handleChangeSwitch = (name) => {
        return (value) => {
            formik.setFieldValue(name, value)
        }
    }

    useEffect(() => {
        dispatch(layThongTinFlim(props.match.params.id))
    }, [])

    useEffect(() => {
        props.handleActive(0)
    }, [listMovies])

    const handleChangeFile = async (e) => {
        let file = e.target.files[0]
        //tạo đối tượng để đọc file
        await formik.setFieldValue('hinhAnh', file)
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = e => { setImgSrc(e.target.result) }

    }
    const formik = useFormik({
        enableReinitialize: true,// bật khi edit dữ liệu
        initialValues: {
            maPhim: thongTinFlim.maPhim,
            tenPhim: thongTinFlim.tenPhim,
            trailer: thongTinFlim.trailer,
            moTa: thongTinFlim.moTa,
            ngayKhoiChieu: thongTinFlim.ngayKhoiChieu,
            dangChieu: thongTinFlim.dangChieu,
            sapChieu: thongTinFlim.sapChieu,
            hot: thongTinFlim.hot,
            danhGia: thongTinFlim.danhGia,
            hinhAnh: null,
        },
        onSubmit: (values) => {
            let formData = new FormData()
            for (const key in values) {
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key])
                } else {
                    if (values[key] !== null) {
                        formData.append('File', values.hinhAnh, values.hinhAnh.name)
                    }
                }
            }
            dispatch(capNhatPhimUpload(formData))
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
                <Input value={formik.values.tenPhim} name='tenPhim' onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label="trailer">
                <Input value={formik.values.trailer} name='trailer' onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label="Mô tả">
                <Input value={formik.values.moTa} name='moTa' onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label="Ngày khởi chiếu:">

                <DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDatePicker} value={dayjs(dayjs(formik.values.ngayKhoiChieu).format('DD/MM/YYYY'), 'DD/MM/YYYY')} />
            </Form.Item>
            <Form.Item label="Đang chiếu" valuePropName="checked" >
                <Switch checked={formik.values.dangChieu} onChange={handleChangeSwitch('dangChieu')} />
            </Form.Item>
            <Form.Item label="Sắp chiếu" valuePropName="checked">
                <Switch checked={formik.values.sapChieu} onChange={handleChangeSwitch('sapChieu')} />
            </Form.Item>
            <Form.Item label="Hot" valuePropName="checked">
                <Switch checked={formik.values.hot} onChange={handleChangeSwitch('hot')} />
            </Form.Item>
            <Form.Item label="Số sao">
                <Input value={formik.values.danhGia} name='danhGia' onChange={formik.handleChange} min={1} max={10} />
            </Form.Item>
            <Form.Item label="Hình ảnh">
                <input name='hinhAnh' type={'file'} onChange={handleChangeFile} accept="image/png,img/jpeg, img/gift" />
                <img src={imgSrc == '' ? thongTinFlim.hinhAnh : imgSrc} width={150} height={150} />
            </Form.Item>

            <button type='submit' className='btn btn-success'>Cập nhật Flim</button>

        </Form>
    )
}
