import cookies from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import app from '../routes'
import { appLogger } from '../utils'

const appMiddleware = express()

appMiddleware.use(appLogger)
appMiddleware.use(cookies())
appMiddleware.use(express.json())
appMiddleware.use(express.urlencoded({ extended: true }))

// const allowlist = ['http://localhost:3000', 'http://localhost:4000']
// const corsOptionsDelegate = function (req: any, callback: (arg0: null, arg1: { origin: boolean }) => void) {
//   let corsOptions
//   if (allowlist.includes(req.header('Origin'))) {
//     corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = { origin: false } // disable CORS for this request
//   }
//   callback(null, corsOptions) // callback expects two parameters: error and options
// }

// appMiddleware.use(cors(corsOptionsDelegate))

appMiddleware.use(
  cors({
    origin: true,
    credentials: true,
    preflightContinue: false,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  }),
)
appMiddleware.options('*', cors())
appMiddleware.use(app)

export default appMiddleware
