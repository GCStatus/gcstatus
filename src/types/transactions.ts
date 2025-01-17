export interface TransactionType {
  id: number
  type: string
}

export interface Transaction {
  id: number
  amount: number
  created_at: string
  description: string
  type: TransactionType
}
