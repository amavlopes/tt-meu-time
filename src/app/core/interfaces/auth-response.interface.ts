export interface AuthResponse {
  get: string,
  parameters: [],
  errors: {
    token: string
  },
  results: number,
  response: {
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
}
