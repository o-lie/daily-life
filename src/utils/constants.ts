import { createTheme } from "@mui/material";

export const projectTheme = createTheme({
	typography: {
		fontFamily: "Poppins",
	},
	palette: {
		primary: {
			main: "#6A48F5",
			contrastText: "white"
		},
		secondary: {
			main: "#487DF5",
			contrastText: "white"
		},
		error: {
			main: "#ef233c"
		},
		warning: {
			main: "#ffd166"
		},
		success: {
			main: "#06d6a0"
		},
		info: {
			main: "#118ab2"
		}
	}
});