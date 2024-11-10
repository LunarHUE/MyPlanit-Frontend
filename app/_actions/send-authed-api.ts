'use server'

import type { APIResponse } from '@/lib/types'
import { getSession } from '@auth0/nextjs-auth0'
export default async function SendAuthedRequest<T>(
  url: string,
  method:
    | 'GET'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'PATCH'
    | 'OPTIONS'
    | 'HEAD'
    | 'CONNECT'
    | 'TRACE' = 'GET',
  data?: any
): Promise<APIResponse<T>> {
  const session = await getSession()
  const idToken = session!.idToken
  const res = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
    body: data ? JSON.stringify(data) : null,
  })
  if (!res.ok) {
    return {
      success: false,
      message: `${res.status} ${res.statusText}`,
      data: null,
    }
  }

  return res.json()
}
