import { useRouter } from 'next/router'

const CourseDetail = () => {
  const router = useRouter()
  const { id } = router.query

  return <div>课程详情页 id: {id}</div>
}

export default CourseDetail
