// app/api/generate/event/route.js

import { getSession } from '@auth0/nextjs-auth0'
import { NextResponse } from 'next/server'

export async function POST(request: Request, res: Response) {
  const session = await getSession()

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Make the external request to the streaming API
    const externalResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/generate/event`,
      {
        method: 'POST',
        headers: {
          Authorization: session.idToken!,
          'Content-Type': 'application/json',
        },
        body: request.body,
      }
    )

    if (!externalResponse.ok) {
      return NextResponse.json(
        { error: 'Error fetching from external API' },
        { status: 500 }
      )
    }

    // Create an async iterator to read chunks from the external response
    if (!externalResponse.body) {
      return NextResponse.json(
        { error: 'No body in external response' },
        { status: 500 }
      )
    }
    const reader = externalResponse.body.getReader()

    const stream = new ReadableStream({
      async pull(controller) {
        try {
          const { done, value } = await reader.read()
          if (done) {
            controller.close()
            return
          }
          controller.enqueue(value)
          console.log('Stream chunk:', value)
        } catch (error) {
          console.error('Error reading from external response:', error)
          controller.error(error)
        }
      },
      cancel(reason) {
        console.log('Stream cancelled:', reason)
        reader.cancel()
      },
    })

    res.headers.set('Content-Type', 'text/plain')
    return new Response(stream)
  } catch (error) {
    console.error('Error fetching from external API:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
