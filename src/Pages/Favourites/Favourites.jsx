import { Link } from 'react-router-dom'
import './Favourites.scss'
import { useSelector } from 'react-redux'

export const Favourites = () => {
	const { characters, comics, series } = useSelector(state => state.favorites)

	return (
		<div>
			<div className="container">
				<div className="favorites-container">
					<h2>Characters</h2>
					{characters.length > 0 ? (
						<ul>
							{characters.map(character => (
								<li key={`character-${character.id}`}>
									<h3>{character.name}</h3>
									<img
										src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
										alt={character.name}
									/>
                                    <Link to={`/Characters/${character.id}`}>
                                        <button className="postBtn">See More</button>
                                    </Link>
								</li>
							))}
						</ul>
					) : (
						<p>No favorite characters yet.</p>
					)}
					<h2>Comics</h2>
					{comics.length > 0 ? (
						<ul>
							{comics.map(comics => (
								<li key={`comic-${comics.id}`}>
									<h3>{comics.title}</h3>
									<img
										src={`${comics.thumbnail.path}.${comics.thumbnail.extension}`}
										alt={comics.title}
									/>
                                    <Link to={`/Comics/${comics.id}`}>
                                        <button className="postBtn">See More</button>
                                    </Link>
								</li>
							))}
						</ul>
					) : (
						<p>No favorite comics yet.</p>
					)}
					<h2>Series</h2>
					{series.length > 0 ? (
						<ul>
							{series.map(serial => (
								<li key={`series-${serial.id}`}>
									<h3>{serial.title}</h3>
									<img
										src={`${serial.thumbnail.path}.${serial.thumbnail.extension}`}
										alt={serial.title}
									/>
                                    <Link to={`/Series/${serial.id}`}>
                                        <button className="postBtn">See More</button>
                                    </Link>
								</li>
							))}
						</ul>
					) : (
						<p>No favorite series yet.</p>
					)}
				</div>
			</div>
		</div>
	)
}
