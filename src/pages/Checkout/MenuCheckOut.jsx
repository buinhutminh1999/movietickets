import React, { useState } from 'react'
import { Tabs, Button } from 'antd';
import Checkout from './Checkout';
import KetQuaDatVe from './KetQuaDatVe';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
const OperationsSlot = {
    left: <Button className="tabs-extra-demo-button">Left Extra Action</Button>,
    right: <Button>Right Extra Action</Button>,
  };
export default function MenuCheckOut(props) {
    const [key, setKey] = useState(1)
    const { usLogin } = useSelector(state => state.movieReducer)
    const operations = <Button>
        <span className='d-flex align-content-center'>Hi! {usLogin.taiKhoan}</span>
    </Button>;
    const handleSetKey = () => {
        setKey(2)
    }
    const items = [
        {
            key: 0,
            label: <Button onClick={() => {
                props.history.push('/home')
            }}><HomeOutlined className='m-0 d-flex' /></Button>,

        },
        {
            key: 1,
            label: `1. Chọn ghế và thanh toán`,
            children: <Checkout id={props.match.params.id} handleSetKey={handleSetKey} />,
        },
        {
            key: 2,
            label: `2. Kết quả đặt vé`,
            children: <KetQuaDatVe />,
        },

    ]
    console.log('key', key)
    return (
        <div className='p-5'>
            <Tabs tabBarExtraContent={operations} defaultActiveKey={1} activeKey={key} items={items} onChange={(key) => {
                setKey(key)
            }} />
        </div>
    )
}
