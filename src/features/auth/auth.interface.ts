export interface ILoginPayload {
  email: string
  password: string
}

export declare module LoginResponse {
  export interface Role {
    _id: string
    name: string
  }

  export interface Account {
    deleted_at?: any
    is_reset: boolean
    roles: Role[]
    created_at: string
    fullname: string
    password: string
    email: string
    phone: string
    verification_code: string
    verified_at?: any
    business_id: string
    company_role: string
    id: string
    role: string
  }

  export interface Data {
    token: string
    refresh_token: string
    account: Account
  }

  export interface RootObject {
    code: number
    success: boolean
    data: Data
  }
}

export declare module ProfileResponse {
  export interface Profile {
    code: number
    success: boolean
    data: User
  }

  export interface User {
    role: string
    _id: string
    firstName: string
    lastName: string
    email: string
    fullName: string
    createdAt: string
    updatedAt: string
    __v: number
  }

  interface Roles {
    _id?: string
    name?: string
    __v?: number
  }

  interface Cridential {
    email?: string
    phone_number?: string
    company_role?: string[]
    fullname?: string
    province_id?: number
    city_id?: number
    district_id?: number
  }
}
