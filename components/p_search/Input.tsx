import { DebouncedFunc } from 'lodash'
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useRef,
  KeyboardEvent,
} from 'react'
import styles from './Input.module.css'

interface IProps {
  inputVal: string
  setInputVal: Dispatch<SetStateAction<string>>
  fetchSuggest: DebouncedFunc<(keyword: string) => Promise<void>>
  showHistory: () => void
  submitSearch: (keyword: string) => void
}

const Input = ({
  inputVal,
  setInputVal,
  fetchSuggest,
  showHistory,
  submitSearch,
}: IProps) => {
  const inputEl = useRef<HTMLInputElement>(null)

  // 键盘事件
  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || !inputEl.current) return

    // 阻止默认行为
    const event = e || window.event
    event.preventDefault()

    // 取消等待的搜索建议请求
    fetchSuggest.cancel()

    const filteredVal = inputEl.current.value.trim()
    if (!filteredVal) {
      setInputVal('')
      return
    }

    // 回车提交
    submitSearch(filteredVal)
    // 收起键盘
    inputEl.current.blur()
    // 禁止按回车表单自动提交
    return false
  }

  // 值改变
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchVal = e.target.value
    const trimVal = searchVal.trim()
    setInputVal(searchVal)

    // 字符为空，搜索历史
    if (!trimVal) {
      fetchSuggest.cancel()
      showHistory()
      return
    }

    // 字符非空，搜索建议
    if (trimVal !== inputVal) {
      fetchSuggest(trimVal)
    }
  }

  const clearInput = () => {
    fetchSuggest.cancel()
    showHistory()
    setInputVal('')
    inputEl.current?.focus()
  }

  return (
    <div className={styles.container}>
      <div
        className={`${styles.formCont} border-b-1px ${
          inputVal ? '' : styles.empty
        }`}
      >
        <form action="">
          {/* 让软键盘显示搜索按钮 */}
          <input
            ref={inputEl}
            type="search"
            className={styles.search}
            placeholder="请输入搜索内容"
            value={inputVal}
            onChange={handleChange}
            onKeyUp={handleKeyUp}
          />
          {/* 禁止按回车表单自动提交：如果表单中含有多个单行输入框，按 Enter 键时不会自动提交 */}
          <input type="text" name="notautosubmit" style={{ display: 'none' }} />
        </form>
        {/* 当输入框不为空时展示自定义清空按钮 */}
        {inputVal ? (
          <button onClick={clearInput} className={styles.clean} />
        ) : null}
      </div>
    </div>
  )
}

export default Input
