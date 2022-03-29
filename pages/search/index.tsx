import { GetServerSideProps, NextPage } from 'next'
import { useMemo, useState } from 'react'
import History from '@/p_search/History'
import Suggest from '@/p_search/Suggest'
import Result from '@/p_search/Result'
import Input from '@/p_search/Input'
import { getHotWord, getSearchResult, getSearchSuggest } from 'core/api'
import { IHotwordData } from 'pages/api/search/hotword'
import { ISearchData } from 'pages/api/search/result'
import { useRouter } from 'next/router'
import { throttle } from 'lodash'
import styles from './search.module.css'
import { useLSState } from 'core/hooks/useLSState'

const TYPES = {
  HISTORY: 'history',
  SUGGEST: 'suggest',
  RESULT: 'result',
} as const

const Search: NextPage<ISearchProps> = ({ kw, hotword }) => {
  const router = useRouter()

  // 内容类型
  const [contType, setContType] = useState<typeof TYPES[keyof typeof TYPES]>(
    kw ? TYPES.RESULT : TYPES.HISTORY
  )
  // 输入框的值
  const [inputVal, setInputVal] = useState(kw || '')
  // 搜索建议
  const [suggestList, setSuggestList] = useState<string[]>([])
  const [history, setHistory] = useLSState<string[]>('searchHistory', [])

  // 切换到搜索结果
  const submitSearch = (keyword: string) => {
    // 保存去重搜索记录，最长保持 6 条，最近优先
    history.unshift(keyword)
    setHistory([...new Set(history.slice(0, 6))])

    // 切换为结果类型
    setContType(TYPES.RESULT)
    // 替换路由参数
    router.replace({
      pathname: '/search',
      query: {
        kw: keyword,
      },
    })
  }

  // 搜索建议
  const fetchSuggest = useMemo(
    () =>
      throttle(async (keyword: string) => {
        console.log(1)
        // 切换内容类型为搜索建议
        if (contType !== TYPES.SUGGEST) setContType(TYPES.SUGGEST)
        // 请求数据
        const res = await getSearchSuggest(keyword)
        // 更新 state
        setSuggestList(res.data)
      }, 500),
    [contType, setContType, setSuggestList]
  )

  const showHistory = () => setContType(TYPES.HISTORY)

  const map = {
    [TYPES.HISTORY]: (
      <History
        submitSearch={submitSearch}
        hotword={hotword}
        history={history}
        deleteHistory={() => setHistory([])}
      />
    ),
    [TYPES.SUGGEST]: <Suggest data={suggestList} />,
    [TYPES.RESULT]: <Result />,
  }

  // 渲染内容
  const renderContent = () => {
    return map[contType]
  }

  return (
    <div>
      {/* 搜索框 */}
      <Input
        inputVal={inputVal}
        setInputVal={setInputVal}
        fetchSuggest={fetchSuggest}
        showHistory={showHistory}
        submitSearch={submitSearch}
      />

      {/* 内容 */}
      <div className={styles.content}>{renderContent()}</div>
    </div>
  )
}

export default Search

interface ISearchProps {
  result: ISearchData[]
  hotword: IHotwordData[]
  kw: string
}

export const getServerSideProps: GetServerSideProps<ISearchProps> = async (
  ctx
) => {
  const { query } = ctx
  const { kw: _kw = '' } = query
  const kw = _kw as string

  let result: ISearchData[] = []
  let hotword: IHotwordData[] = []

  try {
    if (kw && kw.trim()) {
      // 搜索结果
      const resultRes = await getSearchResult(kw)
      result = resultRes.data
    }
    // 热门词汇
    const hotwordRes = await getHotWord()
    hotword = hotwordRes.data
  } catch (error) {}

  return {
    props: {
      result, // 搜索结果
      hotword, // 热门词汇
      kw, // 搜索关键字
    },
  }
}
