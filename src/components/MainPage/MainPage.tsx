import { useEffect, useState } from 'react'
import NewsList from '../NewsList/NewsList'
import s from './mainPage.module.scss'
import { Story } from '../data/interface'

const MainPage = () => {
  const [stories, setStories] = useState<Story[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getStory = async () => {
      setIsLoading(true)
      const url = 'https://hacker-news.firebaseio.com/v0'
      const responce = await fetch(`${url}/beststories.json`)
      const data: string[] = await responce.json()
      const randomStories: Story[] = await Promise.all(
        data.map(
          async (id) =>
            await fetch(`${url}/item/${id}.json`).then((res) => res.json())
        )
      )
      const sortedStories = randomStories.sort((a, b) => {
        return b.time - a.time
      })
      sortedStories.splice(0, 100)
      setStories(sortedStories)
      setIsLoading(false)
    }
    getStory()
    const resetStories = setInterval(() => {
      getStory()
    }, 60000)
    return () => {
      clearInterval(resetStories)
    }
  }, [])

  if (isLoading) {
    return (
      <div className={s.center_container}>
        <img className={s.loading_icon} src="/loading.svg" alt="loading" />
      </div>
    )
  }

  return (
    <>
      <NewsList stories={stories} />
    </>
  )
}

export default MainPage
