import express from 'express'
import middlewareSetup from './middlewareSetup/middlewareSetup'
import setUpRouter from './routesSetup/routesSetup'

const app = express()
middlewareSetup(app)
setUpRouter(app)

export default app
