import { useEffect, useState } from 'react'
import ls from 'store2'
/**
 * localStorage 同步 state
 */
export const useLSState = <T>(
  key: string,
  defaultVal: T
): [T, (val: T) => void] => {
  const [data, setData] = useState(defaultVal)

  const setter = (val: T) => {
    setData(val)
    ls.set(key, val)
  }

  // 只有客户端才有 localStorage
  useEffect(() => {
    // localStorage 没有数据，则用 defaultVal 初始化
    if (ls(key) === null) {
      ls.set(key, defaultVal)
    } else {
      // 有数据，则更新
      setData(ls(key))
    }
  }, [])

  return [data, setter]
}
