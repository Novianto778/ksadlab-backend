import { type NextFunction, type Request, type Response } from 'express'

const verifyRoles = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.role) return res.status(403).json({ message: 'Forbidden' })
    const rolesArray = [...allowedRoles]
    const result = rolesArray.find((role) => role === req.role)
    if (!result) {
      return res.status(403).json({
        message: 'You dont have access to perform this action',
      })
    }
    next()
  }
}

export default verifyRoles
