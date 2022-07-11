// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js"
const { useState } = React
// @deno-types="https://deno.land/x/servest@v1.3.1/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom@18.2.0/server.js"
import { createApp } from "https://deno.land/x/servest@v1.3.1/mod.ts"

const app = createApp()

app.handle("/", async (req) => {
	const [color, setColor] = useState('')
	const [colors, setColors] = useState([])

	const handleSubmit = (e) => {
		e.preventDefault()
		setColors([...colors, color])
		setColor('')
	}

  	await req.respond({
		status: 200,
		headers: new Headers({
			"content-type": "text/html charset=UTF-8",
		}),
		body: ReactDOMServer.renderToString(
		<html>
			<head>
				<meta charSet="utf-8" />
				<title>Servidor en Deno</title>
			</head>
			<body>
				<form action="/colors" method="POST" onSubmit={handleSubmit}>
					<label htmlFor="color">Introduce un color</label>
					<input type="text" name="color" id="color"/>
					<button type="submit">Agregar color</button>
				</form>
				<ul className="">
					{
						colors.map((color: string) => {
							<li style={{color: color}}>{color}</li>
						})
					}
				</ul>
			</body>
		</html>,
		),
	})
})
app.listen({port: 3000})