import './../pagesStyle.scss'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ApiService } from '../../services/ApiService'
import { DataService } from '../../services/DataService'
import { CardListRender } from '../../components/CardListRender'

export function SeriesPostPage() {
	const { id } = useParams()
	const [post, setPost] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error] = useState(null)
	const [AdvComics, setAdvComics] = useState([])
	const [AdvCharacters, setAdvCharacters] = useState([])

	useEffect(() => {
		ApiService.getSeriesById(id).then(data => {
			setPost(data)
			setIsLoading(false)
		})
	}, [id])

	useEffect(() => {
		if (post && post.length > 0) {
			DataService.fetchCharacters(post[0].characters.items).then(
				characters => {
					setAdvCharacters(characters)
					setIsLoading(false)
				}
			)
		}
	}, [post])

	useEffect(() => {
		if (post && post.length > 0) {
			DataService.fetchComics(post[0].comics.items).then(comicses => {
				setAdvComics(comicses)
				setIsLoading(false)
			})
		}
	}, [post])

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
						<h1 className="post__name">{post[0].title}</h1>
						<img
							className="post__img"
							src={
								post[0].thumbnail.path +
								'.' +
								post[0].thumbnail.extension
							}
						/>
						<p className="post__disc">{post[0].description}</p>
					</div>
					<CardListRender
						items={AdvCharacters}
						title="Characters"
						path="Characters"
						nameField="name"
					/>
					<CardListRender
						items={AdvComics}
						title="Comics"
						path="Comics"
					/>
				</div>
			</div>
		</>
	)
}
