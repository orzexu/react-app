import './Search.scss'
import { useState } from 'react'
import { SearchIcon } from './SearchIcon'

interface SearchProps {
    onSearch: (query: string) => void
}

export const SearchBar: React.FC<SearchProps> = ({ onSearch }) => {
	const [query, setQuery] = useState<string>('')

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(event.target.value)
	}

	const handleSearch = () => {
		onSearch(query)
	}

	return (
		<div className='searchBar'>
            <SearchIcon />
			<input
                className='searchBar__input'
				type="text"
				value={query}
				onChange={handleInputChange}
				placeholder="Search ..."
			/>
			<button className='serachBar__btn' onClick={handleSearch}>Search</button>
		</div>
	)
}
