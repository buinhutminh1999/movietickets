import React, { useEffect } from "react";
import { Rate, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { history } from "../../App";
import { LayDanhSachPhim } from "../../redux/action/movieAction";
import _ from "lodash";

export default function ListMovies(props) {
  let { listMovies } = useSelector((state) => state.movieReducer);
  let dispatch = useDispatch();
  useEffect(() => {
    let action = LayDanhSachPhim();
    dispatch(action);
  }, []);

  const renderListFlimDangChieu = () => {
    return _.isArray(listMovies)
      ? listMovies.map((item) => {
          if (item.dangChieu) {
            return (
              <SwiperSlide
                key={item.maPhim}
                onClick={() => {
                  history.push(`/detail/${item.maPhim}`);
                }}
                className="cursor-pointer"
              >
                <Card bordered={false} className="bg-transparent text-white shadow-lg">
                   <div className="rounded-lg lg:h-56 md: h-35 overflow-hidden">
                   <img
                      alt="example"
                      className="h-full w-full object-cover"
                      src={item.hinhAnh}
                    />
                   </div>
                  <div className="mt-2 text-center">
                    <p className="text-lg font-bold">{item.tenPhim}</p>
                  </div>
                  <div className="mt-2">
                    <Rate value={item.danhGia / 2} disabled />
                  </div>
                </Card>
              </SwiperSlide>
            );
          }
        })
      : "";
  };

  return (
    <div className="py-10 bg-gradient-to-r from-gray-700 via-gray-900 to-black">
      <div className="text-center mb-5">
        <h2 className="text-3xl font-semibold text-white">Phim đang chiếu</h2>
      </div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        pagination={{
          dynamicBullets: true,
        }}
        slidesPerView={4}
        navigation
        className="px-5 max-w-6xl md:px-10 w-full m-auto"
      >
        {renderListFlimDangChieu()}
      </Swiper>
    </div>
  );
}