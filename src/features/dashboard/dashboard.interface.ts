export declare module DashboardResponse {
  export interface Topup {
    paid_topup_value: number
    paid_topup_count: number
    paid_unique_user: number
    topup_count: number
  }

  export interface Sale {
    name: string
    percentage?: any
    sales: number
  }

  export interface Products {
    total_sales: number
    sales: Sale[]
  }

  export interface DocumentUploaded {
    date: string
    total: number
  }

  export interface Registration {
    date: string
    total: number
  }

  export interface Verification {
    date: string
    total: number
  }

  export interface Transactions {
    date: string
    total: number
  }

  export interface EmetUsage {
    date: string
    total: number
  }

  export interface ChartLine {
    documentUploaded: DocumentUploaded[]
    registration: Registration[]
    transactions: Transactions[]
    verification: Verification[]
    emetUsages: EmetUsage[]
  }

  export interface Reviews {
    count: number
  }

  export interface Documents {
    completed: number
    uploaded: number
  }

  export interface Token {
    emet_used: number
    esgn_used: number
  }

  export interface Users {
    new_register: number
    verified_user: number
    ekyc_user: number
    first_full_cycle: number
  }

  export interface Data {
    topup: Topup
    products: Products
    chartLine: ChartLine
    reviews: Reviews
    documents: Documents
    token: Token
    users: Users
  }

  export interface RootObject {
    data: Data
    statusCode: number
    message: string
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

  export interface Data {
    emet: number[]
    documentUploaded: number[]
    documentCompleted: number[]
    transactions: number[]
    days: string[]
    registration: Registration[]
    verification: Verification[]
  }

  export interface RootObject {
    data: Data
    statusCode: number
    message: string
  }
}
