import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { DangKyAction, } from '../../redux/action/movieAction';
import {style} from './style.css'
export default function Register() {
    let dispatch = useDispatch()
    let [btn, setBtn] = useState('')
    let { regisErr } = useSelector((state) => { return state.movieReducer })
    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            matKhau: '',
            repeatPass: '',
            email: '',
            soDt: '',
            maNhom: 'GP01',
            hoTen: ''

        },
        validationSchema: Yup.object().shape({
            taiKhoan: Yup.string().required('Tài khoản không được để trống'),
            matKhau: Yup.string().required('Mật khẩu không được để trống'),
            repeatPass: Yup.string().oneOf([Yup.ref('matKhau'), null], 'Mật khẩu không khớp'),
            email: Yup.string().email('Email không hợp lệ').required('Email không được để trống'),
            soDt: Yup.string().required('Số điện thoại không được để trống'),
            hoTen: Yup.string().required('Họ và tên không được để trống'),
        }),
        onSubmit: values => {
            console.log('values',values)
            let dangKy = DangKyAction(values)
            dispatch(dangKy)

        },
    });
    const btnSucessorDisabled = () => {
        let flag = true
        for (const key in formik.values) {
            if (formik.values[key] == '' ) {
                flag = false
            }
        }
        if (flag) {
            setBtn(<button type="submit" className="btn btn-success">
                Đăng ký ngay
            </button>)
        } else {
            setBtn(<button type="submit" className="btn btn-danger disabled">
                Đăng ký ngay
            </button>)
        }

    }

    useEffect(() => {
        btnSucessorDisabled()
    }, [formik.values])


    return (
        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1 content-register">
            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 title-register">Đăng ký</p>
            <form className="mx-1 mx-md-4" onSubmit={formik.handleSubmit}>
                {regisErr !== '' ? <div className='alert alert-danger'>{regisErr}</div> : null}
                <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
                        <label className="form-label" htmlFor="taiKhoan">Tài khoản</label>
                        <input type="text" name="taiKhoan" className="form-control" onChange={formik.handleChange}
                            value={formik.values.taiKhoan} />
                        {formik.errors.taiKhoan ? (
                            <div className='alert alert-danger'>{formik.errors.taiKhoan}</div>
                        ) : null}
                    </div>
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
                        <label className="form-label" htmlFor="matKhau">Mật khẩu</label>
                        <input type="password" name="matKhau" className="form-control" onChange={formik.handleChange}
                            value={formik.values.matKhau} />
                        {formik.errors.matKhau ? (
                            <div className='alert alert-danger'>{formik.errors.matKhau}</div>
                        ) : null}
                    </div>
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
                        <label className="form-label" htmlFor="form3Example4c">Nhập lại mật khẩu</label>
                        <input type="password" name="repeatPass" className="form-control" onChange={formik.handleChange}
                            value={formik.values.repeatPass} />
                        {formik.errors.repeatPass ? (
                            <div className='alert alert-danger'>{formik.errors.repeatPass}</div>
                        ) : null}
                    </div>
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-key fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input type="text" name="email" className="form-control" onChange={formik.handleChange}
                            value={formik.values.email} />
                        {formik.errors.email ? (
                            <div className='alert alert-danger'>{formik.errors.email}</div>
                        ) : null}

                    </div>
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-key fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
                        <label className="form-label" htmlFor="soDt">Số điện thoại</label>
                        <input type="text" name="soDt" className="form-control" onChange={formik.handleChange}
                            value={formik.values.soDt} />
                        {formik.errors.soDt ? (
                            <div className='alert alert-danger'>{formik.errors.soDt}</div>
                        ) : null}
                    </div>
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-key fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
                        <label className="form-label" htmlFor="hoTen">Họ và tên</label>
                        <input type="text" name="hoTen" className="form-control" onChange={formik.handleChange}
                            value={formik.values.hoTen} />
                        {formik.errors.hoTen ? (
                            <div className='alert alert-danger'>{formik.errors.hoTen}</div>
                        ) : null}
                    </div>
                </div>

                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    {btn}
                </div>
            </form>
        </div>
    )
};



