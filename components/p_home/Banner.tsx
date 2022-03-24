import Link from 'next/link'
import { IHomeBanner } from 'pages/api/home'
import ReactSlick from 'react-slick'
import styles from './Banner.module.css'

interface IProps {
  data: IHomeBanner[]
}

const Banner = ({ data = [] }: IProps) => {
  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    infinite: true,
    dots: true,
    speed: 500,
    dotsClass: 'banner-dots',
    className: 'home-banners',
  }

  return (
    <section className={styles.wrap}>
      <ReactSlick {...settings}>
        {data.map((item: IHomeBanner) => (
          <Link
            key={item.courseId}
            href="/course/detail/[id]"
            as={`/course/detail/${item.courseId}`}
            passHref
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.img} alt={item.title} className={styles.slide} />
          </Link>
        ))}
      </ReactSlick>
      {/* 半透明渐变蒙层 */}
      <div className={styles.mask}></div>
    </section>
  )
}

export default Banner
