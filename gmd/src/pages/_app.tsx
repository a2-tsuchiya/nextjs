import React from 'react'
import '../styles/globals.css'
import { AppProps } from 'next/app'
import Head from 'next/head'

import { Provider } from 'next-auth/client'

import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from 'src/styles/theme'

import AppContextProvider from 'store/AppProvider'
import GlobalNav from 'layout/GlobalNav'

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
	React.useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side')
		if (jssStyles) {
			jssStyles.parentElement!.removeChild(jssStyles)
		}
	}, [])

	return (
		<React.Fragment>
			<Head>
				<title>My page</title>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
			</Head>
			<ThemeProvider theme={theme}>
				{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline />
				<AppContextProvider>
					<GlobalNav title="Products Lineup">
						<Provider session={pageProps.sesson}>
							<Component {...pageProps} />
						</Provider>
					</GlobalNav>
				</AppContextProvider>
			</ThemeProvider>
		</React.Fragment>
	)
}
