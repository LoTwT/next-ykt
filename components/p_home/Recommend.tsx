import CourseCard from '@/Common/CourseCard'
import { getRecommend } from 'core/api'
import { IRecommendData } from 'pages/api/recommend'
import { useEffect, useState } from 'react'
import SectionHeader from './SectionHeader'
import styles from './Recommend.module.css'
import LoadMore from '@/Common/LoadMore'

const OFFSET = 10

// 推荐课程 list
const Recommend = () => {
  const [recommend, setRecommend] = useState<{
    list: IRecommendData[]
    pageStart: number
    hasMore: boolean
  }>({
    list: [], // 推荐课列表数据
    pageStart: 0, // 页码
    hasMore: true,
  })

  const fetchRecommend = async () => {
    try {
      const response = await getRecommend({
        start: recommend.pageStart,
        offset: OFFSET,
      })

      const list = response.data

      setRecommend({
        list: recommend.list.concat(list),
        pageStart: recommend.pageStart + 1,
        hasMore: list.length === OFFSET,
      })
    } catch (error) {
      console.log('fetchRecommend Error', error)
    }
  }

  useEffect(() => {
    fetchRecommend()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section>
      <SectionHeader title="课程精选" subTitle="Course selection" url="" />
      <div className={styles.list}>
        {recommend.list.map((item) => (
          <CourseCard key={item.id} data={item} />
        ))}
      </div>
      <LoadMore onReachBottom={fetchRecommend} hasMore={recommend.hasMore} />
    </section>
  )
}

export default Recommend
