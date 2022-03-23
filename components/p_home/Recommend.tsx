import CourseCard from '@/Common/CourseCard'
import SectionHeader from './SectionHeader'

// 推荐课程 list
const Recommend = () => {
  const data: {
    id: string
  }[] = []

  return (
    <section>
      <SectionHeader /> Recommend
      {data.map((item) => (
        <CourseCard key={item.id} />
      ))}
    </section>
  )
}

export default Recommend
