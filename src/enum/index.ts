// ID Types
export const ID_TYPES = [
  { value: "passport", label: "Passport" },
  { value: "drivers_license", label: "Driver's License" },
  { value: "national_id", label: "National ID Card" },
  { value: "residence_permit", label: "Residence Permit" },
]

// Gender options
export const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "prefer not to say", label: "Prefer not to say" },
]

// Maximum file size (20MB in bytes)
export const MAX_FILE_SIZE = 10 * 1024 * 1024

// Coins
export const COINS = [
  "bitcoin",
  "ethereum",
  "usdt trc20",
  "usdt erc20",
  "solana",
  "bitcoin cash",
  "dogecoin",
  "polkadot",
  "polygon",
  "litecoin",
  "stellar",
  "tron",
  "dash",
  "binance coin",
]

// Coin Type
export type Coin = (typeof COINS)[number];

// Map complex coin names to API (Price) keys
export const coinMap: Record<string, string> = {
  bitcoin: 'bitcoin',
  ethereum: 'ethereum',
  polygon: 'polygon-ecosystem-token',
  'usdt trc20': 'tether',
  'usdt erc20': 'tether',
  solana: 'solana',
  dogecoin: 'dogecoin',
  polkadot: 'polkadot',
  stellar: "stellar",
  dash: "dash",
  litecoin: "litecoin",
  tron: "tron",
  "bitcoin cash": "bitcoin-cash",
  "binance coin": "binancecoin"
};


//Coin Logos, Symbol and Name
export const coinMeta: Record<string, { name: string; symbol: string; logo: string; colorFrom: string; colorTo: string; wallets: WalletEntry[]; }> = {
  bitcoin: {
    name: "Bitcoin",
    symbol: "BTC",
    logo: "/coins/bitcoin.svg",
    colorFrom: "from-orange-400",
    colorTo: "to-orange-600",
    wallets: [
      { id: "bitcoin-1", address: "bc1q6ntgz05h65v3a8dd9lzts63xn8nvqxztqfwajr", qr: "/wallets/bitcoin-1.jpeg" },
      { id: "bitcoin-2", address: "bc1qx98mjafc9xa63q779pds2e7hhzlx7fam68gmry", qr: "/wallets/bitcoin-2.jpeg" },
      { id: "bitcoin-3", address: "bc1qn2nlyz8w5s4jf4hr2d7wtjl68ducskwvsu3m3g", qr: "/wallets/bitcoin-3.jpeg" },
    ]
  },
  ethereum: {
    name: "Ethereum",
    symbol: "ETH",
    logo: "/coins/ethereum.svg",
    colorFrom: "from-indigo-400",
    colorTo: "to-indigo-600",
    wallets: [
      { id: "ethereum-1", address: "0x19000aCf1395d67Ea55F9E6E381507Ba63cBfe84", qr: "/wallets/ethereum-1.jpeg" },
      { id: "ethereum-2", address: "0x4667313428A93E9562009D37FAdC1dB481E57ac7", qr: "/wallets/ethereum-2.jpeg" },
      { id: "ethereum-3", address: "0x3990D9Fc3Ad459A36AF5356E5635A09A3940b1Df", qr: "/wallets/ethereum-3.jpeg" },
    ]
  },
  "bitcoin cash": {
    name: "Bitcoin Cash",
    symbol: "BCH",
    logo: "/coins/bitcoin cash.svg",
    colorFrom: "from-green-400",
    colorTo: "to-green-600",
    wallets: [
      { id: "bitcoin-cash-1", address: "qqzv0hc2hyg0gjyluhgzndgryg5e4p2teure5rm3ap", qr: "/wallets/bitcoin-cash-1.jpeg" },
      { id: "bitcoin-cash-2", address: "qz3thhqx6nrk6etruas3hvwrlf4a7farpqrt8vl39g", qr: "/wallets/bitcoin-cash-2.jpeg" },
      { id: "bitcoin-cash-3", address: "qzuvcmjduwem9uxxg47wcwx0rvx3uc78lsuarl790w", qr: "/wallets/bitcoin-cash-3.jpeg" },
    ]
  },
  "usdt trc20": {
    name: "USDT TRC20",
    symbol: "USDT",
    logo: "/coins/tether.svg",
    colorFrom: "from-emerald-400",
    colorTo: "to-emerald-600",
    wallets: [
      { id: "usdt-trc20-1", address: "TPmAhfMbfKLeM6k3jR5eyPQ6yPQpD5X34H", qr: "/wallets/usdt-trc20-1.jpeg" },
      { id: "usdt-trc20-2", address: "TTmtcohePAuifw24G2VGsxjL5KvdM6775e", qr: "/wallets/usdt-trc20-2.jpeg" },
      { id: "usdt-trc20-3", address: "TTzqq2aHmXq1rfkCmT9NLfzaLs5YQfNnFB", qr: "/wallets/usdt-trc20-3.jpeg" },
    ]
  },
  "usdt erc20": {
    name: "USDT ERC20",
    symbol: "USDT",
    logo: "/coins/tether.svg",
    colorFrom: "from-emerald-400",
    colorTo: "to-emerald-600",
    wallets: [
      { id: "usdt-erc20-1", address: "0x19000aCf1395d67Ea55F9E6E381507Ba63cBfe84", qr: "/wallets/usdt-erc20-1.jpeg" },
      { id: "usdt-erc20-2", address: "0x4667313428A93E9562009D37FAdC1dB481E57ac7", qr: "/wallets/usdt-erc20-2.jpeg" },
      { id: "usdt-erc20-3", address: "0x3990D9Fc3Ad459A36AF5356E5635A09A3940b1Df", qr: "/wallets/usdt-erc20-3.jpeg" },
    ]
  },
  solana: {
    name: "Solana",
    symbol: "SOL",
    logo: "/coins/solana.svg",
    colorFrom: "from-fuchsia-500",
    colorTo: "to-cyan-400",
    wallets: [
      { id: "solana-1", address: "Bp6cwd1mnGSfqzcKuDkQ1yveCYa3JoHBcRML4dd8mw3q", qr: "/wallets/solana-1.jpeg" },
      { id: "solana-2", address: "3H31fnbbFAz2BxJ4NsmVDP9KBvkhvWmS6geLz5heGPHF", qr: "/wallets/solana-2.jpeg" },
      { id: "solana-3", address: "CbQyxEBvTsWZgfEK73ASZrmeaW7sqdfi6u6fzoiFWe2E", qr: "/wallets/solana-3.jpeg" },
    ]
  },
  dogecoin: {
    name: "Dogecoin",
    symbol: "DOGE",
    logo: "/coins/dogecoin.svg",
    colorFrom: "from-yellow-400",
    colorTo: "to-amber-500",
    wallets: [
      { id: "dogecoin-1", address: "DFEFopVkfZkKzUj8dgph7ykQqCoDsioJGi", qr: "/wallets/dogecoin-1.jpeg" },
      { id: "dogecoin-2", address: "DBk1e2235K9MwnWE5cqiogSbGRSY1usZ4S", qr: "/wallets/dogecoin-2.jpeg" },
      { id: "dogecoin-3", address: "DMPsKPAwAU4frkqpEFnqVksBfmM9hnem22", qr: "/wallets/dogecoin-3.jpeg" },
    ]
  },
  tron: {
    name: "Tron",
    symbol: "TRX",
    logo: "/coins/tron.svg",
    colorFrom: "from-red-500",
    colorTo: "to-rose-600",
    wallets: [
      { id: "tron-1", address: "TPmAhfMbfKLeM6k3jR5eyPQ6yPQpD5X34H", qr: "/wallets/tron-1.jpeg" },
      { id: "tron-2", address: "TTmtcohePAuifw24G2VGsxjL5KvdM6775e", qr: "/wallets/tron-2.jpeg" },
      { id: "tron-3", address: "TTzqq2aHmXq1rfkCmT9NLfzaLs5YQfNnFB", qr: "/wallets/tron-3.jpeg" },
    ]
  },
  stellar: {
    name: "Stellar",
    symbol: "XLM",
    logo: "/coins/stellar.svg",
    colorFrom: "from-sky-400",
    colorTo: "to-blue-600",
    wallets: [
      { id: "stellar-1", address: "GAXXNHZBG22KUTWYKR4MKJZUW6GKTDPSA2DGT6S6WXYPMY73KSZBJPNW", qr: "/wallets/stellar-1.jpeg" },
      { id: "stellar-2", address: "GBL2DVERGHHJTRZJWEAQLB5OXVT66CWLDRU2MA3CZDFEWSV3VNYOAU4F", qr: "/wallets/stellar-2.jpeg" },
      { id: "stellar-3", address: "GA5QV2AKQE2ZE4WOGC2MCX6F2PFNPQQAB6E7UPLTZVBDXRYNCW5KBMCW", qr: "/wallets/stellar-3.jpeg" },
    ]
  },
  dash: {
    name: "Dash",
    symbol: "DASH",
    logo: "/coins/dash.svg",
    colorFrom: "from-blue-400",
    colorTo: "to-blue-600",
    wallets: [
      { id: "dash-1", address: "XvWG5gwta1DzqV8Dyh7KmAyCN7HYKZ5DHe", qr: "/wallets/dash-1.jpeg" },
      { id: "dash-2", address: "XxRM5zmcjgYJSGYWNZnA99F6y87fHNsyBg", qr: "/wallets/dash-2.jpeg" },
      { id: "dash-3", address: "Xn36WvLZmmCnaav82NwBdEFnJqw8U2fZvk", qr: "/wallets/dash-3.jpeg" },
    ]
  },
  polkadot: {
    name: "Polkadot",
    symbol: "DOT",
    logo: "/coins/polkadot.svg",
    colorFrom: "from-pink-500",
    colorTo: "to-rose-600",
    wallets: [
      { id: "polkadot-1", address: "15p2arUMB8quNNqjKuoeJXQtBkh5CBSQvAvCW3kyci5zhQ9V", qr: "/wallets/polkadot-1.jpeg" },
      { id: "polkadot-2", address: "15VL1KJS8RxjxkAhEC6RNQZozWVAGNRLBrU9EaDipy6MKSN7", qr: "/wallets/polkadot-2.jpeg" },
      { id: "polkadot-3", address: "15yETpFFHaCFvgPtdKtLCa8whfAP8zqLeESTtza6Zx9AvBwM", qr: "/wallets/polkadot-3.jpeg" },
    ]
  },
  polygon: {
    name: "Polygon",
    symbol: "POL",
    logo: "/coins/polygon.svg",
    colorFrom: "from-purple-500",
    colorTo: "to-indigo-600",
    wallets: [
      { id: "polygon-1", address: "0x4667313428A93E9562009D37FAdC1dB481E57ac7", qr: "/wallets/polygon-1.jpeg" },
      { id: "polygon-2", address: "0x3990D9Fc3Ad459A36AF5356E5635A09A3940b1Df", qr: "/wallets/polygon-1.jpeg" },
      { id: "polygon-3", address: "0x19000aCf1395d67Ea55F9E6E381507Ba63cBfe84", qr: "/wallets/polygon-1.jpeg" },
    ]
  },
  litecoin: {
    name: "Lite Coin",
    symbol: "LTC",
    logo: "/coins/litecoin.svg",
    colorFrom: "from-slate-400",
    colorTo: "to-slate-600",
    wallets: [
      { id: "litecoin-1", address: "LbtMapDY1jiQgLPAcxbuHibN6Ne8jA9zfU", qr: "/wallets/litecoin-1.jpeg" },
      { id: "litecoin-2", address: "LWFykrKKLN2MkYcnFqmfLi9Xyo9N3fcH6G", qr: "/wallets/litecoin-2.jpeg" },
      { id: "litecoin-3", address: "ltc1qgtd4nsz44gpjsy2z7v3dsvpj58gsjx5fc0pa2z", qr: "/wallets/litecoin-3.jpeg" },
    ]
  },
  "binance coin": {
    name: "Binance Coin",
    symbol: "BNB",
    logo: "/coins/binance coin.svg",
    colorFrom: "from-yellow-400",
    colorTo: "to-yellow-600",
    wallets: [
      { id: "binance-coin-1", address: "0x19000aCf1395d67Ea55F9E6E381507Ba63cBfe84", qr: "/wallets/binance-coin-1.jpeg" },
      { id: "binance-coin-2", address: "0x4667313428A93E9562009D37FAdC1dB481E57ac7", qr: "/wallets/binance-coin-2.jpeg" },
      { id: "binance-coin-3", address: "0x3990D9Fc3Ad459A36AF5356E5635A09A3940b1Df", qr: "/wallets/binance-coin-3.jpeg" },
    ]
  },
};