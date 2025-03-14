import './../pagesStyle.scss'
import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ApiService } from '../../services/ApiService'
import { usePagination } from '../../hooks/usePagination'
import { useDispatch, useSelector } from 'react-redux'
import {
	removeFromFavorites,
	addToFavorites,
} from '../Favourites/favoritesSlise'
import { ComicsType } from '../Types/types'

interface ComicsApiProps {
    searchQuery: string
}

interface FavoritesProps {
    favorites: {
        comics: ComicsType[]
    }
}

const limit = 20

export const ComicsApi = React.memo(({ searchQuery }: ComicsApiProps) => {
	const [comicses, setComicses] = useState<ComicsType[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const {
		currentPage,
		totalPages,
		setTotalPages,
		handleNextPage,
		handlePrevPage,
		handlePageChange,
		getPageNumbers,
	} = usePagination(1)
	const dispatch = useDispatch()
	const favorites = useSelector((state: FavoritesProps) => state.favorites.comics)

	const fetchComicses = useCallback(
		async (page: number, query = '') => {
			setIsLoading(true)
			setError(null)

			try {
				const offset = (page - 1) * limit
				const data = query
					? await ApiService.searchComicses(query, offset)
					: await ApiService.getComicses(offset)
				setComicses(data.results || [])
				setTotalPages(Math.ceil(data.total / limit))
			} catch (error: any) {
				setError(error.message)
			} finally {
				setIsLoading(false)
			}
		},
		[setTotalPages]
	)

	useEffect(() => {
		fetchComicses(currentPage, searchQuery)
	}, [currentPage, fetchComicses, searchQuery])

	if (isLoading) {
		return <div className="spinner"></div>
	}

	if (error) {
		return <div> Error: { error } </div>
	}

	return (
		<>
			{!isLoading && !error && (
				<ul className="itemsCard">
					{comicses.length > 0 ? (
						comicses.map(comics => {
							const isFavorite = favorites.some(
								fav => fav.id === comics.id
							)

							const handleFavoriteClick = () => {
								if (isFavorite) {
									dispatch(
										removeFromFavorites({
											id: comics.id,
											type: 'comics',
										})
									)
								} else {
									dispatch(
										addToFavorites({
											item: comics,
											type: 'comics',
										})
									)
								}
							}

							return (
								<li key={comics.id}>
									<h2 className="itemsCard__name">
										{comics.title}
									</h2>
									<img
										src={
											comics.thumbnail.path +
											'.' +
											comics.thumbnail.extension
										}
										alt=""
									/>
									<Link to={`/Comics/${comics.id}`}>
										<button className="postBtn">
											See More
										</button>
									</Link>
									<button
										className={`favoriteBtn ${
											isFavorite ? 'active' : ''
										}`}
										onClick={handleFavoriteClick}
									>
										♥
									</button>
								</li>
							)
						})
					) : (
						<p>No comics found.</p>
					)}
				</ul>
			)}
			{!isLoading && !error && (
				<div className="pagination">
					<button
						onClick={handlePrevPage}
						disabled={currentPage === 1}
					>
						Previous
					</button>
					{getPageNumbers().map(page => (
						<button
							key={page}
							onClick={() => handlePageChange(page)}
							className={currentPage === page ? 'active' : ''}
						>
							{page}
						</button>
					))}
					<button
						onClick={handleNextPage}
						disabled={currentPage === totalPages}
					>
						Next
					</button>
				</div>
			)}
		</>
	)
})
