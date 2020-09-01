import React from "react";
import axios from "axios";
import { SWRConfig } from "swr";
import { environment } from "../utils/config";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import theme from '../styles/Theme'

import '../styles/Grid.scss'
import '../styles/Universal.scss'

axios.defaults.baseURL = environment.API_URL + environment.API_VERSION

export default function App(props: any) {
	const { Component, pageProps } = props;

	React.useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side')
		if (jssStyles) {
			jssStyles?.parentElement?.removeChild(jssStyles)
		}
	}, [])

	return (
		<React.Fragment>
			<ThemeProvider theme={theme}>
				<SWRConfig
					value={{ fetcher: (url: string) => axios(url).then((r) => r.data) }}
				>
					<CssBaseline />
					<Component {...pageProps} />
				</SWRConfig>
			</ThemeProvider>
		</React.Fragment>
	)
}