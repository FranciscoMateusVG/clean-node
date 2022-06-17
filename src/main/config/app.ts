import express from 'express'
import activateMiddlewares from './middlewares'

const app = express()
activateMiddlewares(app)

export default app
