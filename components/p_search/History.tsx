import Link from 'next/link'
import { IHotwordData } from 'pages/api/search/hotword'
import styles from './History.module.css'

interface IProps {
  hotword: IHotwordData[]
  submitSearch: (keyword: string) => void
}

const History = ({ hotword, submitSearch }: IProps) => {
  const renderHotItem = (item: IHotwordData, idx: number) => {
    // type = 1 词汇
    // type = 2 课程详情页面
    const text = item.title.slice(0, 6)
    if (item.type === 2) {
      return (
        <Link
          key={`hot-item-${idx}`}
          href="/course/detail/[id]"
          as={`/course/detail/${item.id}`}
        >
          <a className={styles.item}>{text}</a>
        </Link>
      )
    }

    return (
      <span
        className={styles.item}
        key={`hot-item-${idx}`}
        onClick={() => submitSearch(text)}
      >
        {text}
      </span>
    )
  }

  return (
    <>
      {/* 热门搜索 */}
      {hotword && hotword.length ? (
        <section className={styles.container}>
          <div className={styles.hotHead}>热门搜索</div>
          <div className={styles.content}>
            {hotword.slice(0, 6).map(renderHotItem)}
          </div>
        </section>
      ) : null}

      {/* 搜索历史 */}
    </>
  )
}

export default History
