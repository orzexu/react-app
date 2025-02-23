import './../pagesStyle.scss';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePagination } from '../../hooks/usePagination';
import { ApiService } from '../../services/ApiService';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../Favourites/favoritesSlise';

const limit = 20;

export const CharApi = ({ searchQuery }) => {
    const [characters, setCharacters] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const {
        currentPage,
        totalPages,
        setTotalPages,
        handleNextPage,
        handlePrevPage,
        handlePageChange,
        getPageNumbers,
    } = usePagination(1);

    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites.characters)

    const fetchCharacters = useCallback(
        async (page, query = '') => {
            setIsLoading(true);
            setError(null);

            try {
                const offset = (page - 1) * limit;
                const data = query
                    ? await ApiService.searchCharacters(query, offset)
                    : await ApiService.getCharacters(offset);
                setCharacters(data.results || []);
                setTotalPages(Math.ceil(data.total / limit));
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        },
        [setTotalPages]
    );

    useEffect(() => {
        fetchCharacters(currentPage, searchQuery);
    }, [currentPage, fetchCharacters, searchQuery]);

    if (isLoading) {
        return <div className="spinner"></div>;
    }

    if (error) {
        return <div> Error: {error.message} </div>;
    }

    return (
        <>
            {!isLoading && !error && (
                <ul className="itemsCard">
                    {characters.length > 0 ? (
                        characters.map((character) => {
                            const isFavorite = favorites.some((fav) => fav.id === character.id);

                            const handleFavoriteClick = () => {
                                if (isFavorite) {
                                    dispatch(removeFromFavorites({ id: character.id, type: 'characters' }));
                                } else {
                                    dispatch(addToFavorites({ item: character, type: 'characters' }));
                                }
                            }

                            return (
                                <li key={character.id}>
                                    <h2 className="itemsCard__name">{character.name}</h2>
                                    <img
                                        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                                        alt=""
                                    />
                                    <Link to={`/Characters/${character.id}`}>
                                        <button className="postBtn">See More</button>
                                    </Link>
                                    <button 
                                    className={`favoriteBtn ${isFavorite ? 'active' : ''}`} 
                                    onClick={handleFavoriteClick}>
                                    ♥
                                    </button>
                                </li>
                            );
                        })
                    ) : (
                        <p>No characters found.</p>
                    )}
                </ul>
            )}
            {!isLoading && !error && (
                <div className="pagination">
                    <button onClick={handlePrevPage} disabled={currentPage === 1}>
                        Previous
                    </button>
                    {getPageNumbers().map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={currentPage === page ? 'active' : ''}
                        >
                            {page}
                        </button>
                    ))}
                    <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>
            )}
        </>
    );
};