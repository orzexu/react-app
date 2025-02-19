import { SearchBar } from '../../utils/Search'
import { ComicsApi } from './ComicsApi'

export const Comics = () => {
	const handleSearch = query => {
		console.log('Поисковый запрос:', query)
		// Здесь можно добавить логику для выполнения поиска
	}
	return (
		<>
			<div className='container'>
				<main className='content'>
					<SearchBar onSearch={handleSearch} />
                    <ComicsApi />
				</main>
			</div>
		</>
	)
}
