import { IHomeBanner } from 'pages/api/home'
import Banner from './Banner'
import Nav from './Nav'
import SearchBar from './SearchBar'

interface IProps {
  banner: IHomeBanner[]
}

const HomeHead = ({ banner }: IProps) => {
  return (
    <section>
      <SearchBar />
      <Banner data={banner} />
      <Nav />
    </section>
  )
}

export default HomeHead
