import './Search.scss'
import { useState } from 'react'
import { SearchIcon } from './SearchIcon'

export const SearchBar = ({ onSearch }) => {
	const [query, setQuery] = useState('')

	const handleInputChange = (event) => {
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
