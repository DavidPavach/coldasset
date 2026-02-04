// Create User
declare type UserCreation = {
    email: string,
    userName: string,
    country: string,
    phoneNumber: string,
    password: string,
    device: {
        ua: string | undefined,
        type: string | undefined,
        os: string | undefined,
        browser: string | undefined
    },
}

// Authenticate User
declare type UserAuth = {
    email: string,
    password: string,
    device: {
        ua: string | undefined,
        type: string | undefined,
        os: string | undefined,
        browser: string | undefined
    }
}

// Update User
declare type UpdateUser = {
    email: string
    userName?: string,
    passcode?: string,
    country?: string,
    address?: string,
    profilePicture?: string,
    gender?: 'male' | 'female' | 'prefer not to say',
    phoneNumber?: string,
    password?: string,
    isVerified?: boolean,
    isSuspended?: boolean,
    message?: string,
    minimumTransfer?: number,
    encryptedPassword?: string,
}

// Transaction
declare type TransactionCoin =
    | "bitcoin" | "ethereum" | "binance coin" | "tron"
    | "usdt trc20" | "usdt erc20" | "solana" | "litecoin" | "dogecoin" | "dash"
    | "bitcoin cash" | "polkadot" | "polygon" | "stellar";

declare type Transaction = {
    _id: string;
    user: string;
    receiver?: string | null;
    coin: TransactionCoin;
    transactionType: "sent" | "received" | "swap";
    amount: number;
    fromCoin?: TransactionCoin;
    toCoin?: TransactionCoin;
    fromAmount?: number;
    toAmount?: number;
    network?: string | null;
    walletAddress?: string;
    transactionHash?: string;
    status: "successful" | "failed" | "pending";
    createdAt: string;
    updatedAt: string;
};

declare type NewTx = {
    receiver?: string | null;
    coin: TransactionCoin;
    transactionType: "sent" | "received" | "swap";
    amount: number;
    fromCoin?: TransactionCoin;
    toCoin?: TransactionCoin;
    fromAmount?: number;
    toAmount?: number;
    network?: string | null;
    walletAddress?: string;
}

// Meta Enums
declare type WalletEntry = { id: string; address: string; qr: string; };

// News
declare type NewsArticle = {
    article_id: string;
    title: string;
    link: string;
    description: string;
    pubDate: string;
    source_id: string;
    category?: string[];
    image_url?: string;
}

// Admin
type UserBrief = {
    _id: string;
    userName: string;
    email: string;
    accountId: string;
    profilePicture?: string | null;
};


declare type AdminTx = Transaction & {
    user: UserBrief;
};

// Create New User Transaction
declare type AdminNewTx = {
    user: string;
    receiver?: string
    coin: string;
    transactionType: string;
    amount: number;
    fromCoin?: string;
    toCoin?: string;
    fromAmount?: number;
    toAmount?: number;
    network?: string;
    walletAddress?: string;
    status: string;
}

// Update User Details
declare type AdminUpdateUser = {
    email: string;
    [key: string]: string | boolean | number | object;
};

// Update Admin Details
declare type AdminUpdate = {
    adminId: string,
    email?: string,
    password?: string,
    role?: "admin" | "super_admin",
    isSuspended?: boolean;
}

// Create Notification
declare type NotificationPayload = {
    user: string,
    type: string,
    subtype: string,
    title: string,
    message: string,
}