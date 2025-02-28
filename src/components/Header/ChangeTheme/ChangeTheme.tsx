import './ChangeTheme.scss'

interface TypeTheme {
    isDarkTheme: boolean
    toggleTheme: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const ChangeTheme: React.FC<TypeTheme> = ({ isDarkTheme, toggleTheme }) => {
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
