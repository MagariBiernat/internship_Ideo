import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
	body {
		padding: 0;
		margin: 0;
 		font-family:  -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		overflow-x: hidden;
		width:100vw;
	 	box-sizing: border-box;
		 background: rgb(14,17,22);
		 color: #fff;
	}

	code {
		font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
	}

	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}

`

export default GlobalStyle
