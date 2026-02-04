// Format Date and Time
export const formatDate = (dateInput: Date | string | number, variant: "long" | "short" = "long") => {
  const date = new Date(dateInput);

  if (variant === "short") {
    const datePart = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "2-digit",
    });

    const timePart = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return `${datePart}, ${timePart}`;
  }

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Format currency
export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2,
  }).format(value)
}

// Format Crypto Amount
export const formatCryptoAmount = (value: number) => {
  if (value < 0.01) return value.toFixed(4);
  if (value < 1) return value.toFixed(3);
  if (value < 1000) return value.toFixed(2);
  return value.toFixed(2);
};

// Format Coin Percentage
export const formatPercentage = (value: number) => `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;

// Format Address
export const formatAddress = (address: string) => {
  if (address.length < 10) return address
  const start = address.substring(0, 4)
  const end = address.substring(address.length - 4)
  return `${start}...${end}`
}

// Valid AccountID
export function isValidUserId(id: string): boolean {
  const pattern = /^CA[A-Z0-9]{10}$/;
  return pattern.test(id);
}

const isBase58 = (s: string) => /^[1-9A-HJ-NP-Za-km-z]+$/.test(s);

export function validateWallet(address: string, coin: string): boolean {
  if (typeof address !== 'string' || typeof coin !== 'string') return false;
  const addr = address.trim();

  switch (coin.toLowerCase()) {
    case 'bitcoin':
      if (/^1[1-9A-HJ-NP-Za-km-z]{25,34}$/.test(addr)) return true;
      if (/^3[1-9A-HJ-NP-Za-km-z]{25,34}$/.test(addr)) return true;
      if (/^bc1[qpzry9x8gf2tvdw0s3jn54khce6mua7l]{6,87}$/i.test(addr)) return true;
      return false;

    case 'ethereum':
    case 'usdt erc20':
    case 'polygon':
    case 'binance coin':
      return /^0x[0-9a-fA-F]{40}$/.test(addr);

    case 'usdt trc20':
    case 'tron':
      if (/^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(addr)) return true;
      if (/^41[0-9a-fA-F]{40}$/.test(addr)) return true;
      if (/^0x[0-9a-fA-F]{40}$/.test(addr)) return true;
      return false;

    case 'solana':
      return isBase58(addr) && addr.length >= 32 && addr.length <= 44;

    case 'bitcoin cash':
      if (/^(bitcoincash:)?[qp][0-9a-z]{41,83}$/i.test(addr)) return true;
      if (/^[13][1-9A-HJ-NP-Za-km-z]{25,34}$/.test(addr)) return true;
      return false;

    case 'dogecoin':
      if (/^D[5-9A-HJ-NP-Za-km-z]{25,34}$/.test(addr)) return true;
      if (/^A[1-9A-HJ-NP-Za-km-z]{25,34}$/.test(addr)) return true;
      return false;

    case 'polkadot':
      return isBase58(addr) && addr.length >= 46 && addr.length <= 51;

    case 'litecoin':
      if (/^L[1-9A-HJ-NP-Za-km-z]{25,34}$/.test(addr)) return true;
      if (/^M[1-9A-HJ-NP-Za-km-z]{25,34}$/.test(addr)) return true;
      if (/^ltc1[qpzry9x8gf2tvdw0s3jn54khce6mua7l]{6,87}$/i.test(addr)) return true;
      return false;

    case 'stellar':
      return /^G[A-Z2-7]{55}$/.test(addr);

    case 'dash':
      return /^[X7][1-9A-HJ-NP-Za-km-z]{25,34}$/.test(addr);

    default:
      if (/^0x[0-9a-fA-F]{40}$/.test(addr)) return true;
      if (isBase58(addr) && addr.length >= 26 && addr.length <= 52) return true;
      return false;
  }
}

// Get wallet addresses
const lastIndex: Record<string, number> = {};
export function getWalletAddress(coin: string, wallets: WalletEntry[]): WalletEntry | undefined {
  if (!wallets?.length) return undefined;
  const next = ((lastIndex[coin] ?? -1) + 1) % wallets.length;
  lastIndex[coin] = next;
  return wallets[next];
}

// Get updated fields
export const getUpdatedFields = (original: Record<string, string | number | null>, current: Record<string, string | number>) => {

  const updated: Record<string, string | number> = {};

  Object.keys(current).forEach((key) => {
    const newValue = current[key];
    const oldValue = original[key];

    if (
      newValue !== "" &&
      newValue !== null &&
      newValue !== oldValue
    ) {
      updated[key] = newValue;
    }
  });

  return updated;
};

// Normalize Phrase
export const normalizePhrase = (phraseText: string): string[] => {
  return phraseText
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
};
