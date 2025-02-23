import { Link } from 'react-router-dom'
import { ApiService } from '../../services/ApiService'
import './../pagesStyle.scss'

import { useCallback, useEffect, useState } from 'react'
import { usePagination } from '../../hooks/usePagination'
import { useDispatch, useSelector } from 'react-redux'
import {
	removeFromFavorites,
	addToFavorites,
} from '../Favourites/favoritesSlise'

const limit = 20

export const SeriesApi = ({ searchQuery }) => {
	const [series, setSeries] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)
	const {
		currentPage,
		totalPages,
		setTotalPages,
		handleNextPage,
		handlePrevPage,
		handlePageChange,
		getPageNumbers,
	} = usePagination(1, limit)
	const dispatch = useDispatch()
	const favorites = useSelector(state => state.favorites.series)

	const fetchSeries = useCallback(
		async (page, query = '') => {
			setIsLoading(true)
			setError(null)

			try {
				const offset = (page - 1) * limit
				const data = query
					? await ApiService.searchSeries(query, offset)
					: await ApiService.getSeries(offset)
				setSeries(data.results || [])
				setTotalPages(Math.ceil(data.total / limit))
			} catch (error) {
				setError(error.message)
			} finally {
				setIsLoading(false)
			}
		},
		[setTotalPages]
	)

	useEffect(() => {
		fetchSeries(currentPage, searchQuery)
	}, [currentPage, fetchSeries, searchQuery])

	if (isLoading) {
		return <div className="spinner"></div>
	}

	if (error) {
		return <div> Error: {error.message} </div>
	}

	return (
		<>
			{!isLoading && !error && (
				<ul className="itemsCard">
					{series.length > 0 ? (
						series.map(serial => {
							const isFavorite = favorites.some(
								fav => fav.id === serial.id
							)

							const handleFavoriteClick = () => {
								if (isFavorite) {
									dispatch(
										removeFromFavorites({
											id: serial.id,
											type: 'series',
										})
									)
								} else {
									dispatch(
										addToFavorites({
											item: serial,
											type: 'series',
										})
									)
								}
							}

							return (
								<li key={serial.id}>
									<h2 className="itemsCard__name">
										{serial.title}
									</h2>
									<img
										src={
											serial.thumbnail.path +
											'.' +
											serial.thumbnail.extension
										}
										alt=""
									/>
									<Link to={`/Series/${serial.id}`}>
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
						<p>No series found.</p>
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
}
