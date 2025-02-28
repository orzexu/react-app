import './../pagesStyle.scss'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ApiService } from '../../services/ApiService'
import { DataService } from '../../services/DataService'
import { CardListRender } from '../../components/CardListRender'
import { CharactersType, ComicsType } from '../Types/types'

interface TypePosts {
	id: number
	title: string
	description: string
	thumbnail: {
		path: string
		extension: string
	}
	comics: {
		items: { resourceURI: string }[]
	}
	characters: {
		items: { resourceURI: string }[]
	}
}

export function SeriesPostPage() {
	const { id } = useParams<{ id: string }>()
	const seriesId = parseInt(id!)
	const [post, setPost] = useState<TypePosts[] | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [AdvComics, setAdvComics] = useState<ComicsType[]>([])
	const [AdvCharacters, setAdvCharacters] = useState<CharactersType[]>([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [seriesData] = await Promise.all([
					ApiService.getSeriesById(seriesId),
					DataService.fetchCharacters([]),
					DataService.fetchComics([]),
				])

				setPost(seriesData)

				if (seriesData.length > 0) {
                    const dataApi = seriesData[0]
					const [characters, comicses] = await Promise.all([
						DataService.fetchCharacters(dataApi.characters.items),
						DataService.fetchComics(dataApi.comics.items),
					])

					setAdvCharacters(characters)
					setAdvComics(comicses)
				}
			} catch (error) {
				setError(
					error instanceof Error
						? error.message
						: 'An unknown error occurred'
				)
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
	}, [seriesId])

	if (isLoading) {
		return <div className="spinner"></div>
	}

	if (error) {
		return <div> Error: {error} </div>
	}

	if (!post || post.length === 0) {
		return <div>No comics data found.</div>
	}

	const dataApi = post[0]

	return (
		<>
			<div className="container">
				<div className="post">
					<div className="post__api">
						<h1 className="post__name">{dataApi.title}</h1>
						<img
							className="post__img"
							src={
								dataApi.thumbnail.path +
								'.' +
								dataApi.thumbnail.extension
							}
						/>
						<p className="post__disc">{dataApi.description}</p>
					</div>
					{AdvCharacters.length > 0 && (
						<CardListRender
							items={AdvCharacters}
							title="Characters"
							path="Characters"
							nameField="name"
						/>
					)}
					{AdvComics.length > 0 && (
						<CardListRender
							items={AdvComics}
							title="Comics"
							path="Comics"
						/>
					)}
				</div>
			</div>
		</>
	)
}
