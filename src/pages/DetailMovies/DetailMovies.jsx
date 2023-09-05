import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomCard } from "@tsamantanis/react-glassmorphism";
import "@tsamantanis/react-glassmorphism/dist/index.css";
import { Modal } from "antd";
import { useState } from "react";
import { LayThongTinLichChieuPhim } from "../../redux/action/movieAction";
import moment from "moment";
import ListFlim from "./ListFlim";
import { style } from "./detail.css";
export default function DetailMovies(props) {
  let { detailMovies } = useSelector((state) => state.movieReducer);
  let dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    let { id } = props.match.params;
    let action = LayThongTinLichChieuPhim(id);
    dispatch(action);
  }, []);

  const [tabPosition] = useState("left");
  return (
    <div className="container-fluid detailflim p-5">
      <CustomCard
        style={{
          backgroundImage: `url(${detailMovies.hinhAnh}) `,
          minHeight: "480px",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100%",
        }}
        className="custom-card"
        effectColor="#fff" // required
        color="#fff" // default color is white
        blur={10} // default blur value is 10px
        borderRadius={0} // default border radius value is 10px
      >
        <div className="row">
          <div className="col-3">
            {/* <svg height="100" width="100">
  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg> */}
            <img
              className="img-fluid"
              alt=""
              src={detailMovies.hinhAnh}
              onClick={() => setOpen(true)}
            />
            <Modal
              title={detailMovies.tenPhim}
              centered
              open={open}
              onOk={() => setOpen(false)}
              onCancel={() => setOpen(false)}
              width={1000}
              footer={null}
            >
              <iframe
                width="100%"
                height="500px"
                src={`https://www.youtube.com/embed/${detailMovies.trailer?.slice(
                  17
                )}`}
              ></iframe>
            </Modal>
          </div>
          <div className="col-9">
            <h1>{detailMovies.tenPhim}</h1>
            <p>Nội dung</p>
            <span>{detailMovies.moTa}</span>
            <p>Ngày chiếu</p>
            {moment(detailMovies.ngayKhoiChieu).format("DD/MM/YYYY")}
          </div>
        </div>
      </CustomCard>
      <ListFlim detailMovies={detailMovies} tabPosition={tabPosition} />
    </div>
  );
}
