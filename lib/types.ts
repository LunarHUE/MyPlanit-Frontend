type SuccessResponse<T> = {
  status: 'success'
  data: T
  message?: never
}

type ErrorResponse = {
  status: 'error'
  message: string
  data: null
}

export type APIResponse<T> = SuccessResponse<T> | ErrorResponse

export type Profile = {
  id: string
  userId: string
  firstName: string
  lastName: string
  canvasUrl: string
  canvasToken: string
}

export type CalendarEvent = {
  id: string
  title: string
  description: string
  start: Date
  end: Date
}
