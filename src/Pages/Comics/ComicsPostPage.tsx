import './../pagesStyle.scss'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ApiService } from '../../services/ApiService'
import { DataService } from '../../services/DataService'
import { CardListRender } from '../../components/CardListRender'
import { CharactersType } from '../Types/types'

interface TypePosts {
	id: number
	title: string
	description: string
	thumbnail: {
		path: string
		extension: string
	}
	characters: {
		items: { resourceURI: string }[]
	}
}

export function ComicsPostPage() {
	const { id } = useParams()
    const comicsId = parseInt(id!)
	const [post, setPost] = useState<TypePosts[] | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [AdvCharacters, setAdvCharacters] = useState<CharactersType[]>([])

	useEffect(() => {
        const fetchData = async () => {
          try {
            const [comicsData] = await Promise.all([
              ApiService.getComicsById(comicsId),
              DataService.fetchCharacters([]),
            ]);
      
            setPost(comicsData);
      
            if (comicsData.length > 0) {
              const dataApi = comicsData[0];
              const characters = await DataService.fetchCharacters(dataApi.characters.items);
              setAdvCharacters(characters);
            }
          } catch (error) {
            setError(error instanceof Error ? error.message : 'An unknown error occurred');
          } finally {
            setIsLoading(false);
          }
        };
      
        fetchData();
      }, [comicsId])

	if (isLoading) {
		return <div className="spinner"></div>
	}

	if (error) {
		return <div> Error: { error } </div>
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
				</div>
			</div>
		</>
	)
}
