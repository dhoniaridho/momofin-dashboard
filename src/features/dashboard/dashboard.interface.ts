export declare module DashboardResponse {
  export interface Reviews {
    count: number
  }

  export interface Token {
    emet_used: number
    esgn_used: number
  }

  export interface Documents {
    uploaded: number
    completed: number
  }

  export interface Topup {
    topup_count: number
    paid_topup_count: number
    paid_topup_value: number
    paid_unique_user: number
  }

  export interface Users {
    new_register: number
    verified_user: number
    ekyc_user: number
    first_full_cycle: number
  }

  export interface Sale {
    name: string
    sales: number
    percentage: number
  }

  export interface Products {
    total_sales: number
    sales: Sale[]
  }

  export interface Data {
    reviews: Reviews
    token: Token
    documents: Documents
    topup: Topup
    users: Users
    products: Products
  }

  export interface RootObject {
    code: number
    success: boolean
    data: Data
  }
}

export declare module ChartLineResponse {
  export interface Registration {
    date: string
    total: number
  }

  export interface Verification {
    date: string
    total: number
  }

  export interface Transaction {
    date: string
    total: number
  }

  export interface DocumentUploaded {
    date: string
    total: number
  }

  export interface EmetUsage {
    date: string
    total: number
  }

  export interface Data {
    registration: Registration[]
    verification: Verification[]
    transactions: Transaction[]
    documentUploaded: DocumentUploaded[]
    emetUsages: EmetUsage[]
  }

  export interface RootObject {
    data: Data
    statusCode: number
    message: string
  }
}
