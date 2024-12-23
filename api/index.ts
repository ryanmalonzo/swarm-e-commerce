import express, { Response } from "express"
import "dotenv/config"

const app = express()
const PORT = process.env.PORT

app.get('/', (_, res: Response) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

