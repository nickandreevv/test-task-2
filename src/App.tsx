import React, { ReactElement } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import './App.css'
import MainPage from './components/MainPage/MainPage'
import NewsItems from './components/Newsitems/NewsItems'
import Wrapper from './components/Wrapper/Wrapper'

function App(): ReactElement {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Wrapper>
          <MainPage />
        </Wrapper>
      ),
    },
    {
      path: '/story/:storyId',
      element: (
        <Wrapper>
          <NewsItems />
        </Wrapper>
      ),
    },
    {
      path: '*',
      element: <Navigate to="/"></Navigate>,
    },
  ])

  return <RouterProvider router={router} />
}

export default App
