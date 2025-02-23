import { useState } from "react";
import { SearchBar } from "../../components/Search/SearchBar";
import { SeriesApi } from "./SeriesApi";

export const Series = () => {
    const [searchQuery, setSearchQuery] = useState('')
    
        const handleSearch = query => {
            setSearchQuery(query)
        }
    return ( 
        <>
			<div className="container">
				<main className="content">
					<SearchBar onSearch={handleSearch} />
                    <SeriesApi searchQuery={searchQuery} />
				</main>
			</div>
		</>
     );
}