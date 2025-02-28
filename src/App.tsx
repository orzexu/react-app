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
import { CharPostPage } from './Pages/Characters/CharPostPage'
import { ComicsPostPage } from './Pages/Comics/ComicsPostPage'
import { SeriesPostPage } from './Pages/Series/SeriesPostPage'
import { Provider } from 'react-redux'
import {store} from './Pages/Favourites/store'

export function App() {
	const { isDarkTheme, toggleTheme } = useTheme()
	return (
		<div className={`app ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
            <Provider store={store}>
			<Router>
				<Header isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
				<div className="content">
					<Routes>
						<Route path="/" element={<Discription />} />
						<Route path="/Characters" element={<Characters />} />
						<Route path="/Comics" element={<Comics />} />
						<Route path="/Series" element={<Series />} />
						<Route path="/Favourites" element={<Favourites />} />
						<Route path="/Characters/:id" element={<CharPostPage />} />
						<Route path="/Comics/:id" element={<ComicsPostPage />} />
						<Route path="/Series/:id" element={<SeriesPostPage />} />
					</Routes>
				</div>
				<Footer isDarkTheme={isDarkTheme} />
			</Router>
            </Provider>
		</div>
	)
}
