import React, { useEffect } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { Button, Table, Input, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  LayDanhSachPhim,
  LayDanhSachPhimAdmin,
  xoaPhim,
} from "../../../redux/action/movieAction";
const { Search } = Input;

const columns = [
  {
    title: "Mã phim",
    dataIndex: "maPhim",
    // specify the condition of filtering result
    // here is that finding the name started with `value`

    sorter: (a, b) => a.maPhim - b.maPhim,
    sortDirections: ["descend", "ascend"], //có 2 loại sort
    defaultSortOrder: "descend",
  },
  {
    title: "Tên phim",
    dataIndex: "tenPhim",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.tenPhim.length - b.tenPhim.length,
  },
  {
    title: "Hình ảnh",
    dataIndex: "hinhAnh",
  },
  {
    title: "Mô tả",
    dataIndex: "moTa",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.moTa.length - b.moTa.length,
  },
  {
    title: "Hành động",
    dataIndex: "hanhDong",
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
export default function Flim(props) {
  const { listMovies } = useSelector((state) => state.movieReducer);
  let dispatch = useDispatch();
  useEffect(() => {
    let action = LayDanhSachPhimAdmin();
    dispatch(action);
  }, []);
  const onSearch = (value) => {
    dispatch(LayDanhSachPhim(value));
  };
  return (
    <div>
      <h3>Quản lý flim</h3>
      <Space direction="vertical">
        <Button
          onClick={() => {
            props.handleActive(1);
            props.history.push("/admin/flim/addnew");
          }}
        >
          Thêm phim
        </Button>
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
      </Space>
      <Table
        columns={columns}
        dataSource={listMovies.map((item, index) => {
          return {
            key: item.maPhim,
            maPhim: item.maPhim,
            tenPhim: item.tenPhim,
            hinhAnh: (
              <img
                width={50}
                height={50}
                src={item.hinhAnh}
                alt=""
                onError={(e) => {
                  e.target.onError = null;
                  e.target.src = `/https://picsum.photos/id/${index}/50/50`;
                  
                }}
              />
            ),
            moTa:
              item.moTa.length > 50
                ? item.moTa.substr(0, 50) + "..."
                : item.moTa, // giới hạn mô tả
            hanhDong: (
              <div className="grid grid-cols-3">
                <EditOutlined
                  onClick={() => {
                    props.history.push(`/admin/flim/edit/${item.maPhim}`);
                  }}
                />
                <DeleteOutlined
                  onClick={() => {
                    dispatch(xoaPhim(item.maPhim));
                  }}
                />
                <ClockCircleOutlined
                  onClick={() => {
                    localStorage.setItem("Flim", JSON.stringify(item));
                    props.history.push(
                      `/admin/flim/showtime/${item.maPhim}/${item.tenPhim}`
                    );
                  }}
                />
              </div>
            ),
          };
        })}
        onChange={onChange}
      />
      ;
    </div>
  );
}
