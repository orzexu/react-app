import './../pagesStyle.scss'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ApiService } from '../../services/ApiService'
import { DataService } from '../../services/DataService'
import { CardListRender } from '../../components/CardListRender'

export function CharPostPage() {
	const { id } = useParams()
	const [post, setPost] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error] = useState(null)
	const [AdvComics, setAdvComics] = useState([])
	const [AdvSeries, setAdvSeries] = useState([])

	useEffect(() => {
		ApiService.getCharacterById(id).then(data => {
			setPost(data)
			setIsLoading(false)
		})
	}, [id])

	useEffect(() => {
		if (post && post.length > 0) {
			DataService.fetchComics(post[0].comics.items).then(comicses => {
				setAdvComics(comicses)
				setIsLoading(false)
			})
		}
	}, [post])

	useEffect(() => {
		if (post && post.length > 0) {
			DataService.fetchSeries(post[0].series.items).then(series => {
				setAdvSeries(series)
				setIsLoading(false)
			})
		}
	}, [post])
	// && post[0].series && post[0].series.items

	if (isLoading) {
		return <div className="spinner"></div>
	}

	if (error) {
		return <div> Error: {error.message} </div>
	}

	if (isLoading) {
		return <div className="spinner"></div>
	}

	if (error) {
		return <div> Error: {error.message} </div>
	}
	return (
		<>
			<div className="container">
				<div className="post">
					<div className="post__api">
						<h1 className="post__name">{post[0].name}</h1>
						<img
							className="post__img"
							src={
								post[0].thumbnail.path +
								'.' +
								post[0].thumbnail.extension
							}
							alt={post[0].name}
						/>
						<p className="post__disc">{post[0].description}</p>
					</div>
					<CardListRender
						items={AdvComics}
						title="Comics"
						path="Comics"
					/>

					<CardListRender
						items={AdvSeries}
						title="Series"
						path="Series"
					/>
				</div>
			</div>
		</>
	)
}
