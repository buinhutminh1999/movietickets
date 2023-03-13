import React from 'react'
import { useSelector } from 'react-redux'
import { Alert, Space, Spin } from 'antd';

export default function Loading() {
    const { isLoading } = useSelector(state => state.movieReducer)
    console.log('isLoading', isLoading)
    return (
        <>
            {isLoading ? <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2 }}>
                <Space>
                    <Spin tip="Loading" size="large">

                    </Spin>
                </Space>
            </div> : ''}
        </>


    )

}
