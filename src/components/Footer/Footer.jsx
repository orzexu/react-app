import './Footer.scss'

export const Footer = ({ isDarkTheme }) => {
	return (
		<>
			<footer className={`footer ${isDarkTheme ? 'dark-footer' : 'light-footer'}`}>
				<div className="container">
					<div className="logo">
						<img src="/marvel_logo.svg" alt="Marvel Logo" />
					</div>
                    <p className='policy'>Data provided by Marvel. ©2025 MARVEL</p>
                    <a className='devLink' href="https://developer.marvel.com/" target="_blank" rel="noopener noreferrer">developer.marvel.com</a>
				</div>
			</footer>
		</>
	)
}
