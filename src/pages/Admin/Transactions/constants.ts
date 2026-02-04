export const TRANSACTION_TYPES = ["sent", "received", "swap"] as const
export const TRANSACTION_STATUS = ["successful", "failed", "pending"] as const

export const STATUS_COLORS = {
  successful: "bg-green-500",
  failed: "bg-red-500",
  pending: "bg-yellow-500",
} as const

export const TYPE_COLORS = {
  sent: "bg-red-400",
  received: "bg-green-400",
  swap: "bg-blue-400",
} as const

export const EMPTY_FORM = {
  user: "",
  receiver: "",
  transactionType: "sent",
  coin: "bitcoin",
  amount: "",
  fromCoin: "",
  toCoin: "",
  fromAmount: "",
  toAmount: "",
  network: "",
  walletAddress: "",
  transactionHash: "",
  status: "pending",
}
