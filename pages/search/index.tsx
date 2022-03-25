import { NextPage } from 'next'
import { useState } from 'react'

const TYPES = {
  HISTORY: 'history',
  SUGGEST: 'suggest',
  RESULT: 'result',
} as const

const Search: NextPage = () => {
  // 内容类型
  const [contType, setContType] =
    useState<typeof TYPES[keyof typeof TYPES]>('history')

  const map = {
    [TYPES.HISTORY]: <div>history</div>,
    [TYPES.SUGGEST]: <div>suggest</div>,
    [TYPES.RESULT]: <div>result</div>,
  }

  const renderContent = () => {
    return map[contType]
  }

  return (
    <div>
      {/* 搜索框 */}

      {/* 内容 */}
      {renderContent()}
    </div>
  )
}

export default Search
