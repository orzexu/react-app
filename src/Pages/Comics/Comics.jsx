import { useState } from 'react'
import { SearchBar } from '../../components/Search/SearchBar'
import { ComicsApi } from './ComicsApi'

export const Comics = () => {
	const [searchQuery, setSearchQuery] = useState('')

	const handleSearch = query => {
		setSearchQuery(query)
	}
	return (
		<>
			<div className="container">
				<main className="content">
					<SearchBar onSearch={handleSearch} />
					<ComicsApi searchQuery={searchQuery} />
				</main>
			</div>
		</>
	)
}
