import { SearchBar } from '../../utils/Search'
import { CharApi } from './CharApi'

export const Characters = () => {
	const handleSearch = query => {
		console.log('Поисковый запрос:', query)
		// Здесь можно добавить логику для выполнения поиска
	}
	return (
		<>
			<div className="container">
				<main className="content">
					<SearchBar onSearch={handleSearch} />
					<CharApi />
				</main>
			</div>
		</>
	)
}
