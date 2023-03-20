import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Tabs } from 'antd';
import ThongTinCaNhan from './ThongTinCaNhan';
const onChange = (key) => {
    console.log(key);
};

export default function Profile() {
    let { usLogin } = useSelector(state => state.movieReducer)
    const items = [
        {
            key: '1',
            label: `Thông tin cá nhân`,
            children: <ThongTinCaNhan/>,
        },
        {
            key: '2',
            label: `Lịch sử đặt vé`,
            children: `Content of Tab Pane 2`,
        },
    ];
 
    console.log(usLogin)
    if (usLogin == null) {
        return <Redirect to={'/login'} />
    }
    return (
        <div><Tabs defaultActiveKey="1" items={items} onChange={onChange} />;</div>

    )


}
