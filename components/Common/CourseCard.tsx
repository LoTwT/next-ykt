import { memo } from 'react'

interface IProps {
  data?: {
    courseTitle: string
  }
}

const CourseCard = ({ data }: IProps) => {
  const { courseTitle = '' } = data || {}

  return (
    <div>
      <p>{courseTitle}</p>
    </div>
  )
}

export default memo(CourseCard)
