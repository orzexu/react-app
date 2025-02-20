import { SearchBar } from "../../utils/Search";
import { SeriesApi } from "./SeriesApi";

export const Series = () => {
    const handleSearch = (query) => {
        console.log('Поисковый запрос:', query);
        // Здесь можно добавить логику для выполнения поиска
      };
    return ( 
        <>
			<div className="container">
				<main className="content">
					<SearchBar onSearch={handleSearch} />
                    <SeriesApi />
				</main>
			</div>
		</>
     );
}