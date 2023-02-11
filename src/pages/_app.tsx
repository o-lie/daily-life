import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/system";
import { projectTheme } from "@/utils/constants";

export default function App({ Component, pageProps }: AppProps) {
	return (
			<ThemeProvider theme={projectTheme}>
				<Component { ...pageProps } />
			</ThemeProvider>
		);
}
