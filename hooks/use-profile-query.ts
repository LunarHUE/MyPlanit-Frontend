'use client'

import type { APIResponse } from '@/lib/types'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

type Profile = {
  id: string
  userId: string
  firstName: string
  lastName: string
  canvasUrl: string
  canvasToken: string
}

async function getProfile(userId: string): Promise<APIResponse<Profile>> {
  const res = await fetch(`https://api.myplanit.app/profile/${userId}`)
  if (!res.ok) {
    throw new Error('Network response was not ok')
  }
  const data: Profile = await res.json()
  return {
    data,
    status: 'success',
  }
}

export default function useProfileQuery(userId: string) {
  const { isLoading, error, data } = useQuery({
    queryKey: ['repoData', userId],
    queryFn: () => getProfile(userId),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    // refetchInterval: 1000 * 60 * 5,
  })

  return { isLoading, error, data }
}
