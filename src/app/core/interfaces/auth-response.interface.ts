import { Country } from "@app/shared/types/types"

export interface AuthResponse {
  get: string,
  parameters: [],
  errors: {
    token: string,
    bug?: string
  },
  results: number,
  paging: {
    current: number,
    total: number
  },
  response: ResponseStatus | Array<Country>
}

export interface ResponseStatus {
    account: {
      firstname: string,
      lastname: string,
      email: string
    },
    subscription: {
      plan: string,
      end: string,
      active: boolean
    },
    requests: {
      current: number;
      limit_day: number;
    }
}
