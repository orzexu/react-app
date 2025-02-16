import './ChangeTheme.scss'

export const ChangeTheme = ({ isDarkTheme, toggleTheme }) => {
	return (
		<label className="switch">
			<input
				type="checkbox"
				checked={isDarkTheme}
				onChange={toggleTheme}
			/>
			<span className="slider"></span>
		</label>
	)
}
