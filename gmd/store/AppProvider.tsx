import * as React from 'react'

export interface State {
	tabValue: number
}
export interface Action {
	type: string
	payload: string | number
}
export const reducer = (state: State, action: Action) => {
	return {
		...state,
		[action.type]: action.payload,
	}
}
export interface AppContextType {
	state: State
	dispatch: React.Dispatch<Action>
}
const AppContext = React.createContext({} as AppContextType)
export const useAppContext = () => React.useContext(AppContext)

const initState = {
	tabValue: 0,
}

const AppContextProvider: React.FC = ({ children }) => {
	const [state, dispatch] = React.useReducer(reducer, initState)

	return (
		<AppContext.Provider value={{ state, dispatch }}>
			{children}
		</AppContext.Provider>
	)
}
export default AppContextProvider
