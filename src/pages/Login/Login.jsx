import React from "react";
import { Checkbox, Form, Input } from "antd";
import {
  dangNhapAction,
  layDanhSachNguoiDung,
} from "../../redux/action/movieAction";
import { useDispatch, useSelector } from "react-redux";
import ButtonPrimary from "../../component/Button/ButtonPrimary/ButtonPrimary";
import { LoadingReducer } from "../../redux/reducers/movieReducer";
import { getAPI } from "../../API/GetApi/GetApi";
import { URL_API } from "../../ulti/setting";

export default function Login(props) {
  let dispatch = useDispatch();
  let { loginErr } = useSelector((state) => state.movieReducer);

  const onFinish = (values) => {
    let action = dangNhapAction({
      taiKhoan: values.taiKhoan,
      matKhau: values.matKhau,
    });
    dispatch(action);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const dangNhapTaiKhoanNhanh = (maND) => {
    dispatch(LoadingReducer(true));
    let promise = getAPI(
      `${URL_API}/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01`
    );
    promise
      .then((result) => {
        let obj = result.data.content.find(
          (item) => item.maLoaiNguoiDung === maND
        );
        onFinish({ taiKhoan: obj.taiKhoan, matKhau: obj.matKhau });
        dispatch(LoadingReducer(false));
      })
      .catch((err) => {
        dispatch(LoadingReducer(false));
        console.log(err);
      });
  };
  return (
    <div>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {loginErr !== null ? (
          <p className="alert alert-danger">{loginErr}</p>
        ) : null}
        <Form.Item
          label="Tài khoản"
          name="taiKhoan"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tài khoản!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="matKhau"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <div className="grid grid-cols-2 gap-2 justify-center">
          <button className="button-primary">Đăng nhập</button>
          <ButtonPrimary
            history={props.history}
            url={"/register"}
            content={"Đăng ký"}
          />
        </div>
        <div className="grid grid-rows-1 items-center text-center mt-2">
          <p>Thử với tài khoản có sẵn</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              className="button-primary"
              onClick={() => {
                dangNhapTaiKhoanNhanh("KhachHang");
              }}
            >
              Khách hàng
            </button>
            <button
              className="button-primary"
              onClick={() => {
                dangNhapTaiKhoanNhanh("QuanTri");
              }}
            >
              Admin
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
}
