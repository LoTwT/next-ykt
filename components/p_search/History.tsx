import Link from 'next/link'
import { IHotwordData } from 'pages/api/search/hotword'
import styles from './History.module.css'
import Image from 'next/image'

interface IProps {
  hotword: IHotwordData[]
  history: string[]
  deleteHistory: () => void
  submitSearch: (keyword: string) => void
}

const History = ({ hotword, history, deleteHistory, submitSearch }: IProps) => {
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
      <section className={styles.container}>
        <div className={`${styles.historyHead} border-b-1px`}>
          搜索历史
          <button className={styles.del} onClick={() => deleteHistory()}>
            <Image
              className={styles.clean}
              src="/img/clean.png"
              alt="clean"
              layout="fill"
            />
          </button>
        </div>
        <div className={styles.content}>
          {history && history.length
            ? history.map((item, idx) => (
                <div
                  className={`${styles.list} border-b-1px`}
                  key={`history-item-${idx}`}
                  onClick={() => submitSearch(item)}
                >
                  {item}
                </div>
              ))
            : null}
        </div>
      </section>
    </>
  )
}

export default History
