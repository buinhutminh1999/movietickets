import React from "react";
import { Checkbox, Form, Input } from "antd";
import { dangNhapAction } from "../../redux/action/movieAction";
import { useDispatch, useSelector } from "react-redux";
import ButtonPrimary from "../../component/Button/ButtonPrimary/ButtonPrimary";

export default function Login(props, value) {
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
                onFinish({ taiKhoan: "alphameta", matKhau: "alphametaaa" });
              }}
            >
              Khách hàng
            </button>
            <button
              className="button-primary"
              onClick={() => {
                onFinish({ taiKhoan: "admin0002", matKhau: "Ha@20238" });
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
