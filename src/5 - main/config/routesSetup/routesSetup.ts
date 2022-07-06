import { Express, Router } from 'express'
import fg from 'fast-glob'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  fg.sync('**/src/5 - main/config/routesSetup/routes/**routes.ts').map(
    async (file) =>
      (await import(`./routes/${file.split('/')[5]}`)).default(router)
  )
}
