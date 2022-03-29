import { memo } from 'react'
import styles from './Suggest.module.css'

interface IProps {
  data: string[]
  submitSearch: (keyword: string) => void
}

const Suggest = ({ data, submitSearch }: IProps) => {
  if (!data.length) return null

  // 点击搜索建议条目，提交查询

  return (
    <ul className={styles.container}>
      {data.map((item, idx) => (
        <li
          className={`${styles.suggestItem} border-b-1px`}
          key={`search-suggest-${item}-${idx}`}
          onClick={() => submitSearch(item)}
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

export default memo(Suggest)
