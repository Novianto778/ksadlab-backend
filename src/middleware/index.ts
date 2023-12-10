import cookies from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import app from '../routes'
import { appLogger } from '../utils'

const appMiddleware = express()

appMiddleware.use(appLogger)
appMiddleware.use(cookies())
appMiddleware.use(express.urlencoded({ extended: true }))
appMiddleware.use(
  cors({
    origin: true,
    credentials: true,
    preflightContinue: false,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  }),
)
appMiddleware.options('*', cors())
appMiddleware.use(express.json())
appMiddleware.use(app)

export default appMiddleware
