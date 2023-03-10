import { FC } from 'react'
import s from './newsList.module.scss'
import { Story } from '../data/interface'
import NewsItem from '../NewsItem/NewsItem'

const NewsList: FC<{ stories: Story[] }> = ({ stories }) => {
  return (
    <>
      <div className={s.story_list}>
        {stories.map((story) => (
          <NewsItem key={story.id} story={story} />
        ))}
      </div>
    </>
  )
}

export default NewsList
