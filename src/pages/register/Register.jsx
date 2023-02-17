import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { dangKyAction, } from '../../redux/action/movieAction';

const Register = () => {
    let dispatch = useDispatch()
    let {error} = useSelector((state) => { return state.movieReducer })
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
            repeatPass: Yup.string().oneOf([Yup.ref('matKhau'), null], 'Passwords must match'),
            email: Yup.string().email('Email không hợp lệ').required('Email không được để trống'),
            soDt: Yup.string().required('Số điện thoại không được để trống'),
            hoTen: Yup.string().required('Họ và tên không được để trống'),
        }),
        onSubmit: values => {
           
            let dangKy = dangKyAction(values)
            dispatch(dangKy)

        },
    });
    return (

        <section className="vh-100" style={{ backgroundColor: '#eee' }}>

            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black" style={{ borderRadius: 25 }}>
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Đăng ký</p>
                                        <form className="mx-1 mx-md-4" onSubmit={formik.handleSubmit}>
                                        {error !== '' ? <div className='alert alert-danger'>{error}</div> : null}
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
                                                <button type="submit" className="btn btn-primary" data-toggle="modal">
                                                    Đăng ký ngay
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="Sample image" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};
export default Register;