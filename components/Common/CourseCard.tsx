import Link from 'next/link'
import { IRecommendData } from 'pages/api/recommend'
import { memo } from 'react'
import styles from './CourseCard.module.css'

interface IProps {
  data: IRecommendData
}

const CourseCard = ({ data }: IProps) => {
  const { courseTitle, id } = data

  return (
    <Link href="/course/detail/id[]" as={`/course/detail/${id}`} passHref>
      <a className={`${styles.card} border-b-1px`}>{courseTitle}</a>
    </Link>
  )
}

export default memo(CourseCard)
