import React, { useState } from 'react'
import { Tabs } from 'antd';
import Checkout from './Checkout';
import KetQuaDatVe from './KetQuaDatVe';

const onChange = (key) => {
    
};


export default function MenuCheckOut(props) {
    const [key, setKey] = useState(1)
    
    const handleSetKey = () => { 
        setKey(2)
     }
    const items = [{
        key: '1',
        label: `1. Chọn ghế và thanh toán`,
        children: <Checkout id={props.match.params.id} handleSetKey={handleSetKey}/>,
    },
    {
        key: '2',
        label: `2. Kết quả đặt vé`,
        children: <KetQuaDatVe/>,
    },
 
    ]
console.log('key',key)
    return (
        <div className='p-5'>
            <Tabs  defaultActiveKey={key} items={items} onChange={onChange} />
        </div>
    )
}
