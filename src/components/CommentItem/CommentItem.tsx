import { FC, useRef, useState } from 'react'
import { Comment } from '../data/interface'
import s from './commentItem.module.scss'

const CommentItems: FC<{ comment: Comment }> = ({ comment }) => {
  let innerHtml = ''
  const arrow = useRef<HTMLDivElement>(null)
  const [isComments, setIsComments] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [comments, setComments] = useState<Comment[]>([])
  if (comment.text) {
    innerHtml = comment.text
  }

  const getComment = async (commentItem: Comment) => {
    if (!comments.length) {
      const url = 'https://hacker-news.firebaseio.com/v0'
      if (commentItem.kids) {
        setIsLoading(true)
        const unsortedComments = await Promise.all(
          commentItem.kids.map(
            async (id) =>
              await fetch(`${url}/item/${id}.json`).then((res) => res.json())
          )
        )

        const sortedComments = unsortedComments.sort((a, b) => {
          return b.time - a.time
        })
        setComments(sortedComments)
        setIsLoading(false)
      }
    }
  }

  const handleClick = () => {
    if (arrow.current?.classList.contains(s.active)) {
      arrow.current?.classList.remove(s.active)
      setIsComments(false)
    } else {
      arrow.current?.classList.add(s.active)
      setIsComments(true)
      getComment(comment)
    }
  }

  return (
    <div className={s.wpap}>
      <div className={s.content}>
        <div className={s.content__author}>
          {comment.by}
          {comment.kids && (
            <div
              ref={arrow}
              className={s.content__author_arrow}
              onClick={handleClick}
            >
              &#8679;
            </div>
          )}

          {isLoading && <h3>Загрузка...</h3>}
        </div>
        <div
          className={s.comment_text}
          dangerouslySetInnerHTML={{ __html: innerHtml }}
        ></div>
        <div className={s.content__comment}>
          {isComments &&
            comments.map((c) => <CommentItems key={c.id} comment={c} />)}
        </div>
      </div>
    </div>
  )
}

export default CommentItems
