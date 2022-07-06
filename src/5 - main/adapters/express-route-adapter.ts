import { Request, Response } from 'express'
import { Controller } from '../../4 - presentation/protocols/controller'
import { HttpRequest } from '../../4 - presentation/protocols/http'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest<any> = {
      body: req.body
    }
    const httpResponse = await controller.handle(httpRequest)

    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
