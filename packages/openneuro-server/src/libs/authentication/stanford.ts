import passport from "passport"
import config from "../../config"
import User from "../../models/user"
import * as Sentry from "@sentry/node"
import { parsedJwtFromRequest } from "./jwt"
import type { NextFunction, Request, Response } from "express"

export const requestAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  req.session = {}
  passport.authenticate("stanford")(req, res, next)
}

/**
 * Complete a successful login
 */
export function completeRequestLogin(req, res, next, user) {
  return req.logIn(user, { session: false }, (err) => {
    if (err) {
      Sentry.captureException(err)
      return next(err)
    }
    // If no email is provided for a logged in user, warn the user
    if (!req.user.email && req.user && req.user.token) {
      // Set the access token manually and redirect
      res.cookie("accessToken", req.user.token, { sameSite: "Lax" as const })
      res.redirect("/error/email-warning")
    } else {
      // Login normally
      return next()
    }
  })
}

export const authCallback = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  return passport.authenticate(
    "stanford",
    async (err, user, _info) => {
       if (err) {
        Sentry.captureException(err)
        if (err.type) {
          return res.redirect(`/error/orcid/${err.type}`)
        } else {
          return res.redirect("/error/orcid/unknown")
        }
      }
      if (!user) {
        return res.redirect("/")
      }

      try {
        // adds new date for login/lastSeen
        await User.findByIdAndUpdate(user._id, { lastSeen: new Date() })
      } catch (error: unknown) {
        if (error instanceof Error) {
          Sentry.captureException(error)
        } else {
          Sentry.captureException(new Error(String(error)))
        }
        // Don't block the login flow
      }
      const existingAuth = parsedJwtFromRequest(req)
      return completeRequestLogin(req, res, next, user)
    }
  )(req, res, next)
}
