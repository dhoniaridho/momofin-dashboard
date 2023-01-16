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
    type?: string
  }

  export interface Pagination {
    currentPage: number
    itemCount: number
    itemsPerPage: number
    totalItems: number
    totalPages: number
  }

  export interface Data {
    items: Datum[]
    meta: Pagination
  }

  export interface RootObject {
    statusCode: number
    message: string
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
