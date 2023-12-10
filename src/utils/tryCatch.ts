import { type NextFunction, type Request, type Response } from 'express'

export const tryCatch = (controller: (req: Request, res: Response) => Promise<any>) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await controller(req, res)
  } catch (error) {
    next(error)
  }
}
