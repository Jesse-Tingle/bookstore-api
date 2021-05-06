const express = require("express")
const { google } = require("googleapis")

const app = express()

app.get("/", async (req, res) => {
	const auth = new google.auth.GoogleAuth({
		keyFile: "credentials.json",
		scopes: "https://www.googleapis.com/auth/spreadsheets",
	})

	const spreadsheetId = "14NCVbTgNgl5zVlYqThQGC-KRjeM-h2PA3m3ZPzP4su8"

	//create client instance for auth
	const client = await auth.getClient()

	const googleSheets = google.sheets({
		version: "v4",
		auth: client,
	})

	const metaData = await googleSheets.spreadsheets.get({
		auth,
		spreadsheetId,
	})

	res.send(metaData.data)
})

app.listen(1337, (req, res) => {
	console.log("Running on 1337")
})
