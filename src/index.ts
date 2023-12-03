import 'dotenv/config'
import express from 'express'

const app = express()
const port = process.env.PORT ?? 3000

app.get('/', (req, res, next) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`)
})
