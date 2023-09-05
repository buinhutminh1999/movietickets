import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../redux/reducers/movieReducer";
import { UserOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import axios from "axios";
import { TOKEN, URL_API } from "../../ulti/setting";
import ButtonPrimary from "../../component/Button/ButtonPrimary/ButtonPrimary";

export default function Header({history}) {
  let dispatch = useDispatch();

  let { usLogin } = useSelector((state) => state.movieReducer);
  let resetLocal = () => {
    localStorage.removeItem("userMovies");
    localStorage.removeItem("accessToken");
    dispatch(Logout(null));
  };
  const handleMenuClick = (e) => {
    if (e.key === "1") {
      history.push("/profile");
    } else if (e.key === "2") {
      history.push("/admin/flim");
    } else {
      resetLocal();
    }
  };

  useEffect(() => {
    if (usLogin) {
      const kiemTraNguoiDungCoTonTaiHaykhong = () => {
        let promise = axios({
          method: "GET",
          url: `${URL_API}/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${usLogin?.taiKhoan}`,
          headers: {
            TokenCybersoft: TOKEN,
          },
        });
        promise
          .then((result) => {
            if (result.data.content.length === 0) {
              resetLocal();
            }
          })
          .catch((err) => {});
      };
      kiemTraNguoiDungCoTonTaiHaykhong();
    }
  }, []);
  let items =
    usLogin?.maLoaiNguoiDung === "QuanTri"
      ? [
          {
            label: "Thông tin cá nhân",
            key: "1",
            icon: <UserOutlined />,
          },
          {
            label: "Quản trị",
            key: "2",
            icon: <UserOutlined />,
          },
          {
            label: "Đăng xuất",
            key: "3",
            icon: <UserOutlined />,
          },
        ]
      : [
          {
            label: "Thông tin cá nhân",
            key: "1",
            icon: <UserOutlined />,
          },
          {
            label: "Đăng xuất",
            key: "3",
            icon: <UserOutlined />,
          },
        ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <header className="header bg-white/95 boder-b border-gray-200 shadow-sm">
      <div className="cursor-pointer flex justify-content-between items-center mx-auto max-w-6xl lg:px-8 h-16">
        <div className="flex items-center gap-2">
          <div onClick={() => history.push("/")}>
            <img
              className="logo"
              src="https://media.istockphoto.com/id/615096356/photo/beautiful-pink-circle-light-with-lens-flare-on-particles-background.jpg?s=170667a&w=0&k=20&c=WTm7BgnNsrAd5nsCV4Py6Ld9LfPtlDKiILX3lvEpPTs="
              alt=""
            />
          </div>
          <div className="d-flex font-semibold text-movies hover:opacity-80">
            <img
              alt=""
              src="https://homepage.momocdn.net/fileuploads/svg/momo-file-221117104714.svg"
            ></img>
            <a
              className="hover:text-pink-700 text-decoration-none text-sm text-movies"
              href="#booking-ticket"
            >
              Đặt vé
              <br />
              xem phim
            </a>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-3 gap-2 font-bold text-gray-600">
            <span className="hover:text-gray-900">Lịch chiếu</span>
            <span className="hover:text-gray-900">Rạp chiếu</span>
            <span className="hover:text-gray-900">Phim chiếu</span>
          </div>
        </div>
        {usLogin == null ? (
          <div className="grid grid-cols-2 gap-2">
            <ButtonPrimary
              history={history}
              url={"/login"}
              content={"Đăng nhập"}
            />
            <ButtonPrimary
              history={history}
              url={"/register"}
              content={"Đăng ký"}
            />
          </div>
        ) : (
          <div>
            <Dropdown.Button
              menu={menuProps}
              placement="bottom"
              icon={<UserOutlined />}
            >
              {usLogin?.taiKhoan}
            </Dropdown.Button>
          </div>
        )}
      </div>
    </header>
  );
}
