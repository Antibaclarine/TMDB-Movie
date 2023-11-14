
import Footer from "./components/Footer/footer"
import Navbar from "./components/Navigation/navigation"
import MoviesComponent from "./components/page/allMovies"
import SearchMovies from "./components/search/search"
import Carouseles from "./components/Sliders/caurosel"
import Categorypage from "./components/categories/categories"

export default function Page() {
  return (
    <div>
      <Navbar/>
      <SearchMovies/>
    <Carouseles />
    <Categorypage/>
  
    <MoviesComponent />
    <Footer/>
    </div>
    
  )
}