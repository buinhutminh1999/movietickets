import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';
import { TOKEN, URL_API } from '../../ulti/setting';



export default function MoviesShowTime() {
    const onChange = (key) => {
        console.log(key);
    };
    let [listCinema, setListCinema] = useState([])
    let getListCenima = () => {
        let promise = axios({
            method: 'GET',
            url: `${URL_API}/QuanLyRap/LayThongTinHeThongRap`,
            headers: {
                TokenCybersoft: TOKEN
            }
        })
        promise.then((result) => {
            setListCinema(result.data.content)
        })
            .catch((err) => { console.log(err) })
    }


    useEffect(() => {
        getListCenima()
    }, [])

    
    const items = listCinema.map((item) => {
        return {
            key: `${item.maHeThongRap}`,
            label: <div className='row p-3'>
                <div style={{width:'50px'}}>
                    <img className='img-fluid' src={item.logo} />
                </div>
            </div>,
            children: 'ds',
        }
    })


    return (
        <div className='container'>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
    )
}
