import styles from './SectionHeader.module.css'

interface IProps {
  title: string
  subTitle: string
  url: string
}

const SectionHeader = ({ title = '', subTitle = '', url = '' }: IProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <h4>{title}</h4>
        <h5>{subTitle}</h5>
      </div>
      <a href={url}>查看更多</a>
    </header>
  )
}

export default SectionHeader
