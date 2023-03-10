import moment from 'moment'
import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Story } from '../data/interface'
import CommentItems from '../CommentItem/CommentItem'
import s from './newsItems.module.scss'

const NewsItems = () => {
  const { storyId } = useParams<{ storyId: string }>()
  const [isLoading, setIsLoading] = useState(false)
  const [story, setStory] = useState<Story>()
  const [isError, setIsError] = useState(false)
  const [isComments, setIsComments] = useState(false)

  const getComment = useCallback(async (story: Story) => {
    const url = 'https://hacker-news.firebaseio.com/v0'
    const randomComments = await Promise.all(
      story.kids.map(
        async (id) =>
          await fetch(`${url}/item/${id}.json`).then((res) => res.json())
      )
    )
    const sortedComments = randomComments.sort((a, b) => {
      return b.time - a.time
    })
    story.comment = sortedComments
    if (!story.comment?.length) {
      story.comment = [{ text: 'Нет комментариев' }]
    }
  }, [])

  const nav = useNavigate()

  useEffect(() => {
    const getStory = async (id: string | undefined) => {
      const url = 'https://hacker-news.firebaseio.com/v0'
      setIsLoading(true)
      const data: Story = await fetch(`${url}/item/${id}.json`).then((res) =>
        res.json()
      )
      if (data.kids) {
        await getComment(data)
        setStory(data)
        setIsLoading(false)
      } else {
        setIsError(true)
        setIsLoading(false)
      }
    }
    getStory(storyId)
  }, [getComment, storyId])

  if (isLoading) {
    return (
      <div className={s.center_container}>
        <img className={s.loading_icon} src="/loading.svg" />
      </div>
    )
  }

  let JSXcode

  if (isError) {
    JSXcode = <div className={s.error}>НЕКОРРЕКТНЫЙ ID</div>
  } else if (story) {
    const { title, by, url, id } = story
    const newComments = story.kids.length
    const setNewDate = new Date(story.time * 1000)
    const newDateToString = moment(setNewDate).format(' HH:mm:ss - DD.MM.YYYY ')

    JSXcode = (
      <div className={s.news_container}>
        <h3>{title}</h3>

        <div className={s.news_info}>
          date: <span>{newDateToString}</span>
          by <span className={s.author}>{by}</span>
        </div>
        <div className={s.buttons}>
          <Link to={url}>
            <button className={s.info_button}>Открыть новость</button>
          </Link>
          <button
            className={s.info_button}
            onClick={() => {
              nav('/')
            }}
          >
            На главную
          </button>
          <form>
            <button className={s.info_button}>Обновить комментарии</button>
          </form>
        </div>
        <div
          className={s.comments}
          onClick={() => setIsComments((prevState) => !prevState)}
        >
          Комментарии... ({newComments})
        </div>
        {isComments && (
          <div>
            {story.comment?.map((comment) => (
              <CommentItems key={comment.id} comment={comment} />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      <div className={s.main_container}>
        <div className={s.story_detalis_container}>{JSXcode}</div>
      </div>
    </>
  )
}

export default NewsItems
