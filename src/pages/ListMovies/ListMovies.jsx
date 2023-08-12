import axios from "axios";
import React, { useEffect, useState } from "react";
import { Rate, Card,Row } from "antd";
import { TOKEN, URL_API } from "../../ulti/setting";
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
import style from "./style.module.css";

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
              >
                <Card bordered={false} className="bg-transparent text-white">
                  <div
                    className="img__movies text-center"
                    style={{ height: "300px" }}
                  >
                    <img
                      alt="example"
                      className="h-100 w-100"
                      src={item.hinhAnh}
                    />
                  </div>
                  <div className={style.flim__title}>
                    <p className="m-0">{item.tenPhim}</p>
                  </div>
                  <div className="">
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
    <p>d</p>
    // <div className={style.film__container}>
    //   <div className=" text-center mt-3">
    //     <h2 className="title__flim text-white">Phim đang chiếu</h2>
    //   </div>
    //   <Swiper
    //     // install Swiper modules
    //     modules={[Navigation, Pagination, Scrollbar, A11y]}
    //     pagination={{
    //         dynamicBullets: true,
    //       }}
    //     slidesPerView={4}

    //     navigation
    //     onSwiper={(swiper) => console.log(swiper)}
    //     onSlideChange={() => console.log("slide change")}
    //     className={style.flim__list}
    //   >
    //     {renderListFlimDangChieu()}
    //   </Swiper>
    // </div>
  );
}
