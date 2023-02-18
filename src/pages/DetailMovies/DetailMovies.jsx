import React from 'react'
import { useSelector } from 'react-redux'

export default function DetailMovies(props) {
   let {detailMovies} =  useSelector(state => state.movieReducer)
   console.log('detailMovies',detailMovies)
  return (
    <div className='container'>
        <div className="row">
            <div className="col-6">
                <img src={detailMovies.hinhAnh} className='img-fluid' alt="" />
            </div>
        </div>
    </div>
  )
}
