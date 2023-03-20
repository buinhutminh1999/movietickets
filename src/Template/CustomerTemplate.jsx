
// import Footer from '../component/Footer/Footer'
import Header from '../component/Header/Header'
import ListMovies from '../pages/ListMovies/ListMovies'
import CarouselD from '../pages/carousel/CarouselD'
import MoviesShowTime from '../pages/MoviesShowTime/MoviesShowTime'
import { Route } from 'react-router-dom'
import Footer from '../component/Footer/Footer'
export const CustomerTemplate = (props) => {
  return <Route exact path={props.path} render={(propsRoute) => {
    return <>
      <Header {...propsRoute}/>
      <CarouselD {...propsRoute}/>
      <ListMovies {...propsRoute}/>
      <MoviesShowTime {...propsRoute}/>
      <Footer />
     
    </>
  }} />
}




