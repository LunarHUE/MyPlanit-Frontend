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
