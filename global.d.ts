declare namespace Express {
  interface Request {
    role?: string
    userId?: string
  }
}

declare namespace jsonwebtoken {
  interface JwtPayload {
    role: string
    userId: string
  }
}
