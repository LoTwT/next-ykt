import Link from 'next/link'
import Image from 'next/image'
import { IRecommendData } from 'pages/api/recommend'
import { memo, useState } from 'react'
import styles from './CourseCard.module.css'
import icTeacher from 'public/img/teacher1.png'
import CountDown from './CountDown'

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
    teacherList,
    saleType,
    price,
    saleNum,
    salePrice = 0,
    saleEndTime = 0,
  } = data

  const [countDownFinished, setCountDownFinished] = useState(false)

  /**
   * 0 没有促销，1 有促销
   *
   * 0 显示：原价、数量
   * 1 显示：
   *       1. 促销期间：原价、数量、促销价格、倒计时
   *       2. 促销结束 / 未开始：原价、数量
   */
  const renderPromotion = () => {
    // 促销 ing
    if (saleType === 1 && !countDownFinished) {
      return (
        <div className={styles.promoCont}>
          {/* 价格 */}
          <div>
            {/* 划线原价 */}
            <span className={styles.deleted}>
              <span className={styles.iso}>￥</span>
              {price}
            </span>

            {/* 促销价格 */}
            {renderSimplePrice(salePrice)}
          </div>

          {/* 倒计时 */}
          <div className={styles.desc}>
            剩{' '}
            <CountDown
              end={saleEndTime}
              onEnd={() => setCountDownFinished(true)}
            />{' '}
            恢复原价
          </div>
        </div>
      )
    }

    // 普通卡片
    return (
      <div className={styles.promoCont}>
        {/* 价格 */}
        <div>
          {price === 0 ? (
            <span className={styles.price}>免费</span>
          ) : (
            renderSimplePrice(price)
          )}
        </div>

        {/* 购买数量 */}
        <div className={styles.desc}>已有 {saleNum} 人购买</div>
      </div>
    )
  }

  const renderSimplePrice = (p: number) => (
    <span className={styles.price}>
      <span className={styles.iso}>￥</span>
      {p}
    </span>
  )

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

        {/* 课程信息 */}
        <div className={styles.footer}>
          {/* 教师 */}
          <div className={styles.teacherCont}>
            {/* 最多展示 3 名教师 */}
            {teacherList && teacherList.length > 0
              ? teacherList.slice(0, 3).map((teacher, idx) => (
                  <div
                    key={`teacher-${idx}-${teacher.name}`}
                    className={styles.teacherBox}
                  >
                    <div className={styles.imgWrapper}>
                      {/* 教师头像 */}
                      <Image
                        className={styles.avatar}
                        src={teacher.img || icTeacher}
                        alt={teacher.name}
                        layout="fill"
                      />
                      {/* 半透明覆盖式的圆边框 */}
                      <div className={styles.avatarBorder} />
                    </div>

                    {/* 教师姓名 */}
                    <span>{teacher.name}</span>
                  </div>
                ))
              : null}
          </div>

          {/* 价格 / 数量 / 优惠 */}
          {renderPromotion()}
        </div>
      </a>
    </Link>
  )
}

export default memo(CourseCard)
