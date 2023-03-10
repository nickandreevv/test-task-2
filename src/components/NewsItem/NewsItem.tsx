import { FC } from 'react'
import s from './newsItem.module.scss'
import { Story } from '../data/interface'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Comment } from '../data/interface'

const NewsItem: FC<{ story: Story }> = ({ story }) => {
  const dateofStories = new Date(story.time * 1000)
  const formatedDate = moment(dateofStories).format(' HH:mm:ss -DD.MM.YYYY')

  return (
    <>
      <Link to={`/story/${story.id}`}>
        <div className={s.story_container}>
          <h3>{story.title}</h3>
          <div className={s.story_info}>
            <span>{story.score} points,</span>
            <span>by - {story.by},</span>
            <span>date - {formatedDate}</span>
          </div>
        </div>
      </Link>
    </>
  )
}

export default NewsItem
