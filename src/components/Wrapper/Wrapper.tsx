import { FC } from 'react'
import s from './wrapper.module.scss'
import Header from '../header/Header'

const Wrapper: FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <>
      <Header />
      <main className={s.wrapper}>{children}</main>
    </>
  )
}

export default Wrapper
