import 'dotenv/config'
import express from 'express'
import 'module-alias/register'
import appMiddleware from './middleware'

const app = express()
const port = process.env.PORT ?? 3000

app.use(appMiddleware)

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`)
})
