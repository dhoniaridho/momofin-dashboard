export interface ILoginPayload {
  email: string
  password: string
}

export declare module LoginResponse {
  export interface Account {
    fullname: string
    email: string
    business_id: string
    is_reset: boolean
  }

  export interface Data2 {
    business_info: boolean
    business_detail: boolean
    personal_info: boolean
    business_documents: boolean
    email_verification: boolean
  }

  export interface Activation {
    status: string
    data: Data2
  }

  export interface Data {
    token: string
    refresh_token: string
    account: Account
    activation: Activation
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
    id?: string
    _id?: string
    roles?: Roles
    fullname?: string
    email?: string
    profile?: Cridential
    email_verification?: boolean
    avatar?: string
    name?: string
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

export declare module DomainVerificationResponse {
  export interface Data {
    logo: string
    domain: string
    nib: string
    address: string
    company_name: string
  }

  export interface RootObject {
    code: number
    success: boolean
    data: Data
  }
}
