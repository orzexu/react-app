import './Favourites.scss'

export const Favourites = () => {
	return (
		<>
			<div className="container">
				<main className="content">
					<div className="block">
						<h1 className="content__title">characters</h1>
						<span className='line'></span>
					</div>
					<div className="block">
						<h1 className="content__title">series</h1>
						<span className='line'></span>
					</div>
					<div className="block">
						<h1 className="content__title">comics</h1>
						<span className='line'></span>
					</div>
				</main>
			</div>
		</>
	)
}
