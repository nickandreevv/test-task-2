import s from './header.module.scss'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.header__text}>
        <Link to="/">
          <h2>Hacker News</h2>
        </Link>
        <p>new</p>
        <p>past</p>
        <p>comments</p>
        <p>ask</p>
        <p>show</p>
        <p>jobs</p>
        <p>sumbit</p>
      </div>
    </header>
  )
}

export default Header
