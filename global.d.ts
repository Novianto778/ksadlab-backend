declare namespace Express {
  interface Request {
    role?: string
  }
}

declare namespace jsonwebtoken {
  interface JwtPayload {
    role: string
  }
}
