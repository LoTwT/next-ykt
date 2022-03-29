import CourseCard from '@/Common/CourseCard'
import { ISearchData } from 'pages/api/search/result'
import LoadMore from '@/Common/LoadMore'
import { getSearchResult } from 'core/api'
import { useCallback, useState } from 'react'
import styles from './Result.module.css'
import Link from 'next/link'

interface IProps {
  data: ISearchData[]
  kw: string
}

const OFFSET = 10

const Result = ({ data, kw }: IProps) => {
  const [result, setResult] = useState({
    list: data,
    pageStart: 1,
    hasMore: true,
  })

  const fetchResult = useCallback(async () => {
    try {
      const res = await getSearchResult(kw, result.pageStart)
      setResult({
        list: result.list.concat(res.data),
        pageStart: result.pageStart + 1,
        hasMore: res.data.length === OFFSET,
      })
    } catch (error) {
      console.log('fetchResult Error', error)
    }
  }, [result, kw])

  // 有数据
  if (data && data.length) {
    return (
      <section className={styles.container}>
        <div className={`${styles.resultTitle} border-b-1px`}>相关课程</div>
        {result.list.map((item) => (
          <CourseCard data={item} key={item.id} />
        ))}
        <LoadMore
          hasMore={result.hasMore}
          onReachBottom={fetchResult}
          customNoMoreText="我是有底线的..."
        />
      </section>
    )
  }

  // 没有数据
  return (
    <section>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.img} src="/img/errorImage.png" alt="error" />
      <div className={styles.title}>Sorry! 暂时没有发现您想查找的课程</div>
      <Link href="/">
        <a className={`${styles.back} border-all-1px`}>返回首页</a>
      </Link>
    </section>
  )
}

export default Result
