import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Space } from "antd";
import { useState } from "react";
import axios from "axios";
import { TOKEN, URL_API } from "../../ulti/setting";
import { capNhatThongTinNguoiDung } from "../../redux/action/movieAction";
const taiKhoan = JSON.parse(localStorage.getItem("userMovies"));

export default function ThongTinCaNhan() {
  const [componentDisabled, setComponentDisabled] = useState(true); 
  const [info, setInfo] = useState({});
  const [value, setValue] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "GP01",
    maLoaiNguoiDung: "",
    hoTen: "",
  });
  const [btnDisabled, setbtnDisabled] = useState(true);
  const dispatch = useDispatch();
  const layThongTinNguoiDung = () => {
    let promise = axios({
      method: "GET",
      url: `${URL_API}/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${taiKhoan.taiKhoan}`,
      headers: {
        TokenCybersoft: TOKEN,
      },
    });
    promise
      .then((result) => {
        const user = {
          taiKhoan: result.data.content[0].taiKhoan,
          matKhau: result.data.content[0].matKhau,
          email: result.data.content[0].email,
          soDt: result.data.content[0].soDT,
          maNhom: "GP01",
          maLoaiNguoiDung: result.data.content[0].maLoaiNguoiDung,
          hoTen: result.data.content[0].hoTen,
        };
        setInfo(user);
        setValue(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    layThongTinNguoiDung();
  }, []);

  const handleChange = (e) => {
    setbtnDisabled(() => {
      return false;
    });
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = () => {
    setInfo(value); //cập nhật dũ liệu mới, lúc này value đã được lưu không cần setState
    setComponentDisabled(true); //set cho form đóng
    setbtnDisabled(true);
    dispatch(capNhatThongTinNguoiDung(value));
    localStorage.setItem(
      "userMovies",
      JSON.stringify({
        ...taiKhoan,
        email: info.email,
        hoTen: info.hoTen,
        soDT: info.soDt,
      })
    );
  };
  return (
    <div>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        disabled={componentDisabled}
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item label="Email">
          <Input value={value?.email} name="email" onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Họ và tên">
          <Input value={value?.hoTen} name="hoTen" onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Số điện thoại">
          <Input value={value?.soDt} name="soDt" onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Tài khoản">
          <Input
            value={value?.taiKhoan}
            disabled={componentDisabled ? true : true}
            name="taiKhoan"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Mật khẩu">
          <Input
            value={value?.matKhau}
            name="matKhau"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Action">
          <Space>
            {!componentDisabled ? (
              btnDisabled ? (
                <button
                  className="button-primary"
                  onClick={() => {
                    setValue(info); // dữ liệu không thay đổi
                    setComponentDisabled(true);
                  }}
                >
                  Hủy bỏ
                </button>
              ) : (
                <>
                  <button className="button-primary" onClick={handleOnSubmit}>
                    Cập nhật thông tin tài khoản
                  </button>
                  <button
                    className="button-primary"
                    onClick={() => {
                      setValue(info); // dữ liệu không thay đổi
                      setComponentDisabled(true);
                    }}
                  >
                    Hủy bỏ
                  </button>
                </>
              )
            ) : (
              <button
                className="button-primary"
                disabled={componentDisabled ? false : undefined}
                onClick={() => {
                  setComponentDisabled(false);
                }}
              >
                Chỉnh sửa thông tin tài khoản
              </button>
            )}
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}
//Khi onclick vào chỉnh sửa tải khoản thì mở chế độ edit
