import './Discription.scss'
import { AllChar } from './Icons/AllCharIcon'
import { CharFrCom } from './Icons/CharFrCom'
import { Comics } from './Icons/ComicsIcon'
import { FavoritesIcon } from './Icons/FavoritesIcon'
import { Series } from './Icons/SeriesIcon'
import { ThemeIcon } from './Icons/ThemeIcon'

export const Discription = () => {
	return (
		<>
			<div className="container">
				<div className="disc">
					<div className="title">
						<h1 className="title-title">All Marvel characters</h1>
						<p className="disc-text">
							You can find any series, character or comic from the
							marvel universe
						</p>
					</div>
					<div className="functions">
						<div className="card">
							<div className="icon-bg">
								<div className="icon">
									<AllChar />
								</div>
							</div>
							<h2 className="card__title">Any characters</h2>
							<p className="disc-text">
								Fingerstache flexitarian street art 8-bit waist
								co, subway tile poke farm.
							</p>
						</div>
						<div className="card">
							<div className="icon-bg">
								<div className="icon">
									<Comics />
								</div>
							</div>
							<h2 className="card__title">Any comics</h2>
							<p className="disc-text">
								Fingerstache flexitarian street art 8-bit waist
								co, subway tile poke farm.
							</p>
						</div>
						<div className="card">
							<div className="icon-bg">
								<div className="icon">
									<Series />
								</div>
							</div>
							<h2 className="card__title">Any series</h2>
							<p className="disc-text">
								Fingerstache flexitarian street art 8-bit waist
								co, subway tile poke farm.
							</p>
						</div>
						<div className="card">
							<div className="icon-bg">
								<div className="icon">
									<CharFrCom />
								</div>
							</div>
							<h2 className="card__title">
								Shows characters from comics/series
							</h2>
							<p className="disc-text">
								Fingerstache flexitarian street art 8-bit waist
								co, subway tile poke farm.
							</p>
						</div>
						<div className="card">
							<div className="icon-bg">
								<div className="icon">
									<ThemeIcon />
								</div>
							</div>
							<h2 className="card__title">Dark theme</h2>
							<p className="disc-text">
								Fingerstache flexitarian street art 8-bit waist
								co, subway tile poke farm.
							</p>
						</div>
						<div className="card">
							<div className="icon-bg">
								<div className="icon">
									<FavoritesIcon />
								</div>
							</div>
							<h2 className="card__title">
								Ability to add to favorites
							</h2>
							<p className="disc-text">
								Fingerstache flexitarian street art 8-bit waist
								co, subway tile poke farm.
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
