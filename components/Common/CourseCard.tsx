import Link from 'next/link'
import { IRecommendData } from 'pages/api/recommend'
import { memo } from 'react'
import styles from './CourseCard.module.css'

interface IProps {
  data: IRecommendData
}

const CourseCard = ({ data }: IProps) => {
  const {
    courseTitle,
    id,
    categoryName,
    courseTime = '随到随学',
    lessonNum,
  } = data

  return (
    <Link href="/course/detail/[id]" as={`/course/detail/${id}`} passHref>
      <a className={`${styles.card} border-b-1px`}>
        {/* 标题 */}
        <h5>
          <span className={styles.categoryTag}>{categoryName}</span>
          <span className={styles.title}>{courseTitle}</span>
        </h5>

        {/* 开课时间 */}
        <div className={styles.time}>
          <span>开课时间：&nbsp;&nbsp;{courseTime}</span>
          <span className={styles.lessonNum}>{lessonNum}课时</span>
        </div>
      </a>
    </Link>
  )
}

export default memo(CourseCard)
