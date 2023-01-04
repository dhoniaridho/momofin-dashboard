export declare module TransactionResponse {
  export interface Datum {
    id: string
    invoice_code: string
    buyer_email: string
    buyer_user_id: string
    product_name: string
    total_price: string
    status: string
    order_datetime: string
  }

  export interface Pagination {
    total_data: number
    total_page: number
    total_display: number
    first_page: boolean
    last_page: boolean
    prev: number
    current: number
    next: number
    detail: number[]
  }

  export interface Data {
    data: Datum[]
    pagination: Pagination
  }

  export interface RootObject {
    code: number
    success: boolean
    data: Data
  }
}

export declare module TransactonExport {
  export interface Transaction {
    id: string
    invoice_code: string
    buyer_user_id: string
    buyer_email: string
    product_name: string
    total_price: string
    status: string
    order_datetime: string
    payment_channel: string
    payment_channel_detail: string
  }
}
