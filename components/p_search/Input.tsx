import { ChangeEvent, Dispatch, SetStateAction, useRef } from 'react'

interface IProps {
  inputVal: string
  setInputVal: Dispatch<SetStateAction<string>>
  fetchSuggest: (keyword: string) => Promise<void>
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
  // @ts-ignore
  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || !inputEl.current) return

    const filteredVal = inputEl.current.value.trim()
    if (!filteredVal) {
      setInputVal('')
      return
    }

    // 回车提交
    submitSearch(filteredVal)
    // 收起键盘
    inputEl.current.blur()
  }

  // 值改变
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchVal = e.target.value
    const trimVal = searchVal.trim()
    setInputVal(searchVal)

    // 字符为空，搜索历史
    if (!trimVal) {
      showHistory()
      return
    }

    // 字符非空，搜索建议
    if (trimVal !== inputVal) {
      fetchSuggest(trimVal)
    }
  }

  return (
    <input
      ref={inputEl}
      value={inputVal}
      onChange={handleChange}
      onKeyUp={handleKeyUp}
    />
  )
}

export default Input
