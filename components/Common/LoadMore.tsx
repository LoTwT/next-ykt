import { PureComponent, ReactNode } from 'react'
import { Nullable } from 'types'

interface IProps {
  onReachBottom: () => Promise<void>
  hasMore: boolean
}

interface IState {
  isLoadingMore: boolean
}

let scrollTimer: Nullable<NodeJS.Timeout> = null

class LoadMore extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      isLoadingMore: false,
    }
  }

  handleScroll = () => {
    // 防抖
    if (scrollTimer) clearTimeout(scrollTimer)

    // 1. 可以加载更多
    // 2. 没有正在加载更多
    // 3. scroll 触达底部：已滚动距离 + 屏幕高度 >= 文档的总高度
    const { onReachBottom, hasMore } = this.props
    const { isLoadingMore } = this.state
    const curPos = window.scrollY // 文档在垂直方向已滚动的高度
    const height = window.screen.height // 屏幕高度
    const docLength = window.document.body.scrollHeight // 文档的实际总高度

    if (hasMore && !isLoadingMore && curPos + height >= docLength) {
      scrollTimer = setTimeout(() => {
        this.setState({ isLoadingMore: true })
        onReachBottom().finally(() => {
          this.setState({ isLoadingMore: false })
        })
      }, 300)
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  render(): ReactNode {
    return <div>加载更多</div>
  }
}

export default LoadMore
