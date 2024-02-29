
import Slider from './Components/Slider'
import CategoryBanner from './Components/CategoryBanner'
import NewProducts from './Components/NewProducts'
import Services from './Components/Services'

export default function Home() {
  return (
    <main className="">
      <Slider></Slider>
      <CategoryBanner></CategoryBanner>
      <NewProducts></NewProducts>
      <Services></Services>
    </main>
  )
}
