import { useState } from 'react'
import { SearchBar } from '../../components/Search/SearchBar'
import { CharApi } from './CharApi'


export const Characters = () => {
	const [searchQuery, setSearchQuery] = useState('')

	const handleSearch = (query: string) => {
		setSearchQuery(query)
	}

	return (
		<>
			<div className="container">
				<main className="content">
					<SearchBar onSearch={handleSearch} />
					<CharApi searchQuery={searchQuery} />
				</main>
			</div>
		</>
	)
}
