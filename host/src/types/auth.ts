export interface LoginCredentials {
  username: string
  password: string
}

export interface User {
  id: number
  username: string
  companyId: number
  roles: []
}
