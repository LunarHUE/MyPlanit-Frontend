import type { UserProfile } from '@auth0/nextjs-auth0/client'
import {
  withMiddlewareAuthRequired,
  getSession,
} from '@auth0/nextjs-auth0/edge'
import { NextResponse } from 'next/server'

export default withMiddlewareAuthRequired({
  returnTo: '/api/auth/login',

  async middleware(req) {
    const res = NextResponse.next()

    if (process.env.NODE_ENV === 'development') {
      return res
    }

    const session = await getSession(req, res)

    if (req.nextUrl.pathname.includes('/api/auth/')) {
      return res
    }

    if (!session) {
      return NextResponse.redirect(
        `${process.env.AUTH0_BASE_URL}/api/auth/login`
      )
    }

    const profileRes = await fetch(`https://api.myplanit.app/profile/`)

    const { data: profile } = await profileRes.json()

    if (!profile && !req.nextUrl.pathname.includes('/onboarding')) {
      return NextResponse.redirect(`${process.env.AUTH0_BASE_URL}/onboarding`)
    }

    if (profile && req.nextUrl.pathname.includes('/onboarding')) {
      return NextResponse.redirect(`${process.env.AUTH0_BASE_URL}`)
    }

    return res
  },
})
