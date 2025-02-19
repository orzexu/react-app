import { Link } from 'react-router-dom'
import { ApiService } from '../../services/ApiService'
import './../pagesStyle.scss'

import { useEffect, useState } from 'react'

export const SeriesApi = () => {
	const [posts, setPosts] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [error] = useState(null)

	useEffect(() => {
		ApiService.getSeries()
        .then((data) => {
            setPosts(data)
            setIsLoading(false)
        })
	}, [])

	if (isLoading) {
		return <div className="spinner"></div>
	}

	if (error) {
		return <div> Error: {error.message} </div>
	}
	return (
		<>
			<ul className="itemsCard">
				{posts.map(post => (
					<li key={post.id}>
						<h2 className="itemsCard__name">{post.title}</h2>
						<img src={post.thumbnail.path + '.' + post.thumbnail.extension} alt="" />
                        <Link to={`/Series/${post.id}`}>
                            <button className='postBtn'>See More</button>
                        </Link>
					</li>
				))}
			</ul>
		</>
	)
}
