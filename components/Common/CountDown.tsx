import { Component, ReactNode } from 'react'
import styles from './CountDown.module.css'

interface IProps {
  end: number
  onEnd: () => void
}

interface IState {
  curTimeStamp: number
}

/**
 * 准确的倒计时
 * props：
 *    end：终点时间
 *    onEnd：结束回调
 */
class CountDown extends Component<IProps, IState> {
  private _timer: number | undefined = undefined

  constructor(props: IProps) {
    super(props)
    this.state = {
      curTimeStamp: this.getTime(),
    }
    this._timer = undefined
  }

  getTime() {
    return new Date().getTime()
  }

  componentDidMount() {
    // 每次 new 一个系统时间，解决 setTimeout 不准确的问题
    // setState 触发组件更新渲染
    this._timer = window.setInterval(() => {
      this.setState({
        curTimeStamp: this.getTime(),
      })
    }, 500)
  }

  removeInterval() {
    window.clearInterval(this._timer)
    this._timer = undefined
  }

  componentWillUnmount() {
    this.removeInterval()
  }

  componentDidUpdate() {
    const { end, onEnd } = this.props
    const { curTimeStamp } = this.state

    // 每次渲染结束后，如果当前时间 > 结束时间，那么清除 timer，执行回调函数
    if (end - curTimeStamp < 0 && this._timer) {
      this.removeInterval()
      onEnd()
    }
  }

  render(): ReactNode {
    const { end } = this.props
    const { curTimeStamp } = this.state

    // 计算剩余时间
    const countDownArr = formatCountDown(end - curTimeStamp)

    return (
      <span>
        {countDownArr.length > 1 ? (
          <span>
            <span className={styles.warningColor}>{countDownArr[1]}</span>{' '}
            天&nbsp;
          </span>
        ) : null}
        <span className={styles.warningColor}>{countDownArr[0]}</span>
      </span>
    )
  }
}

export default CountDown

/**
 * 时间格式化
 * @param { number } ms 剩余倒计时的时间，单位 ms
 * @return { [string, string?] } ["hour:min:sec", "day"]
 */
function formatCountDown(ms: number) {
  if (ms < 0) return ['00:00:00']

  const t = ms / 1000
  let sec: string | number = parseInt((t % 60).toString(), 10)
  let m: string | number = parseInt(((t / 60) % 60).toString(), 10)
  const ho = parseInt((t / 60 / 60).toString(), 10)
  let h: string | number = parseInt((ho % 24).toString(), 10)
  const d = parseInt((ho / 24).toString(), 10)

  sec = sec >= 10 ? sec : `0${sec}`
  m = m >= 10 ? m : `0${m}`
  h = h >= 10 ? h : `0${h}`

  return d === 0 ? [`${h}:${m}:${sec}`] : [`${h}:${m}:${sec}`, `${d}`]
}
