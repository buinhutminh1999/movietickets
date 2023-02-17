
import React from 'react'
import Footer from '../component/Footer/Footer'
import Header from '../component/Header/Header'
import ListMovies from '../pages/ListMovies/ListMovies'
import CarouselD from '../pages/carousel/Carousel'
import MoviesShowTime from '../pages/MoviesShowTime/MoviesShowTime'
export default function CustomerTemplate(props) {
  return (
    <>
      <Header />
      <CarouselD/>
      <ListMovies />
      <MoviesShowTime/>
      <Footer />
      </>)
}
