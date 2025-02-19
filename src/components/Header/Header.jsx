import './Header.scss'
import { ChangeTheme } from './ChangeTheme/ChangeTheme'
import { NavLink } from 'react-router-dom'

export const Header = ({ isDarkTheme, toggleTheme }) => {
	return (
		<header className={isDarkTheme ? 'dark-header' : 'light-header'}>
			<div className="container">
				<NavLink to="/" className="logo">
					<img src="/marvel_logo.svg" alt="Marvel Logo" />
				</NavLink>
				<nav className="nav">
					<NavLink to="/Characters">
						<button className="btnHeader">Characters</button>
					</NavLink>
					<NavLink to="/Comics">
						<button className="btnHeader">Comics</button>
					</NavLink>
					<NavLink to="/Series">
						<button className="btnHeader">Series</button>
					</NavLink>
					<NavLink to="/Favourites">
						<button className="btnHeader">Favourites</button>
					</NavLink>
				</nav>
				<ChangeTheme
					isDarkTheme={isDarkTheme}
					toggleTheme={toggleTheme}
				/>
			</div>
		</header>
	)
}
