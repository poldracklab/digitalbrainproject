import passport from "passport"
import config from "../../config"
import User from "../../models/user"
import * as Sentry from "@sentry/node"
import { addJWT, jwtFromRequest } from "./jwt"
import type { NextFunction, Request, Response } from "express"

export const requestAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate("stanford")(req, res, next)
}

export const authCallback = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(JSON.stringify(req))
  console.log(JSON.stringify(res))
  return res.redirect(`/?success=stanford_auth_success`)
}
