import './styles/App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Header } from './components/Header/Header'
import { Discription } from './components/Discription/Discription'
import { Footer } from './components/Footer/Footer'
import { useTheme } from './hooks/useTheme'
import { Characters } from './Pages/Characters/Characters'
import { Comics } from './Pages/Comics/Comics'
import { Series } from './Pages/Series/Series'
import { Favourites } from './Pages/Favourites/Favourites'

export function App() {
	const { isDarkTheme, toggleTheme } = useTheme()
	return (
		<div className={`app ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
			<Router>
				<Header isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
				<Routes>
					<Route path="/" element={<Discription />} />
					<Route path="/Characters" element={<Characters />} />
                    <Route path="/Comics" element={<Comics />} />
					<Route path="/Series" element={<Series />} />
					<Route path="/Favourites" element={<Favourites />} />
				</Routes>
				<Footer isDarkTheme={isDarkTheme} />
			</Router>
		</div>
	)
}
