import { IRecommendData } from 'pages/api/recommend'
import { memo } from 'react'

interface IProps {
  data: IRecommendData
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
