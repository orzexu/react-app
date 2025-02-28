import './../pagesStyle.scss'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ApiService } from '../../services/ApiService'
import { DataService } from '../../services/DataService'
import { CardListRender } from '../../components/CardListRender'
import { ComicsType, SeriesType } from '../Types/types'

interface TypePosts {
	id: number
	name: string
	description: string
	thumbnail: {
		path: string
		extension: string
	}
	comics: {
		items: { resourceURI: string }[]
	}
	series: {
		items: { resourceURI: string }[]
	}
}

export function CharPostPage() {
	const { id } = useParams<{ id: string }>()
	const characterId = parseInt(id!)
	const [post, setPost] = useState<TypePosts[] | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [AdvComics, setAdvComics] = useState<ComicsType[]>([])
	const [AdvSeries, setAdvSeries] = useState<SeriesType[]>([])

	useEffect(() => {
        const fetchData = async () => {
          try {
            const [characterData] = await Promise.all([
              ApiService.getCharacterById(characterId),
              DataService.fetchComics([]),
              DataService.fetchSeries([])
            ]);
    
            setPost(characterData);
    
            if (characterData.length > 0) {
              const dataApi = characterData[0];
    
              const [comicses, series] = await Promise.all([
                DataService.fetchComics(dataApi.comics.items),
                DataService.fetchSeries(dataApi.series.items),
              ]);
    
              setAdvComics(comicses);
              setAdvSeries(series);
            }
          } catch (error) {
            setError(
              error instanceof Error
                ? error.message
                : 'An unknown error occurred'
            );
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchData();
      }, [characterId]);
    
      if (isLoading) {
        return <div className="spinner"></div>;
      }
    
      if (error) {
        return <div> Error: {error} </div>;
      }  

	if (!post || post.length === 0) {
		return <div>No character data found.</div>
	}

    const dataApi = post[0]

	return (
		<>
			<div className="container">
				<div className="post">
					<div className="post__api">
						<h1 className="post__name">{dataApi.name}</h1>
						<img
							className="post__img"
							src={
								dataApi.thumbnail.path +
								'.' +
								dataApi.thumbnail.extension
							}
							alt={dataApi.name}
						/>
						<p className="post__disc">{dataApi.description}</p>
					</div>
					{AdvComics.length > 0 && (
						<CardListRender
							items={AdvComics}
							title="Comics"
							path="Comics"
						/>
					)}

					{AdvSeries.length > 0 && (
						<CardListRender
							items={AdvSeries}
							title="Series"
							path="Series"
						/>
					)}
				</div>
			</div>
		</>
	)
}
