// KYC
declare type KycStatus = 'pending' | 'accepted' | 'rejected';

declare type Kyc = {
    _id: string;
    idType: string;
    status: KycStatus;
    images: string[];
    lastSubmissionDate: string;
}

// User
declare type UserData = {
    _id: string;
    id: string;
    accountId: string;
    userName: string;
    email: string;
    phoneNumber: string;
    country: string;
    address?: string;
    gender?: 'male' | 'female' | 'other';
    profilePicture: string;
    password: string;
    encryptedPassword: string;
    decryptedPassword: string;
    passPhrase: string[];
    verificationCode: string;
    verificationCodeExpiry: string;
    passwordResetCode?: string;
    isVerified: boolean;
    isSuspended: boolean;
    message: string | null;
    suspendedDate: string | null;
    minimumTransfer: number | null;
    createdAt: string;
    updatedAt: string;
    __v?: number;
    kyc?: Kyc;
    passcode?: string;
    lastSession?: string;
}

// User Response Wrapper
declare type GetUserResponse = {
    message: string | null;
    status: number;
    success: boolean;
    data: UserData;
}

declare type UserBalance = {
    "binance coin": number;
    bitcoin: number;
    "bitcoin cash": number;
    dash: number;
    dogecoin: number;
    ethereum: number;
    litecoin: number;
    polygon: number;
    polkadot: number;
    solana: number;
    stellar: number;
    tron: number;
    "usdt erc20": number;
    "usdt trc20": number;
}

// User Balance Response Wrapper
declare type GetUserBalanceResponse = {
    message: string | null;
    status: number;
    success: boolean;
    data: UserBalance;
}

declare type AdminUser = {
    _id: string;
    userName: string;
    accountId: string;
    email: string;
}

// Admin Get User Response Wrapper
declare type GetAdminUserResponse = {
    message: string | null;
    status: number;
    success: boolean;
    data: AdminUser;
}

// Admin Get Full User Response Wrapper
declare type GetAdminUserResponse1 = {
    message: string | null;
    status: number;
    success: boolean;
    data: UserData;
}

declare type AdminAllUsers = {
    accountId: string;
    country: string;
    email: string;
    gender: string;
    isSuspended: boolean;
    isVerified: boolean;
    phoneNumber: string;
    profilePicture: string;
    userName: string;
    createdAt: string;
    _id: string;
}

// Admin Get All Users Response Wrapper
declare type GetAdminUsersResponse = {
    message: string | null;
    status: number;
    success: boolean;
    data: {
        data: AdminAllUsers[];
        pagination: {
            page: number;
            pages: number;
            total: number;
        };
    };
}

declare type WalletConnect = {
    createdAt: string;
    passPhrase: string[];
    updatedAt: string;
    wallet: string;
    _id: string;
    user: {
        accountId: string;
        email: string;
        id: string;
        profilePicture?: string;
        userName: string;
        _id: string;
    }
}

// Admin Get Wallet Connect Response
declare type GetWalletConnectResponse = {
    message: string | null;
    status: number;
    success: boolean;
    data: {
        data: WalletConnect[];
        pagination: {
            page: number;
            pages: number;
            total: number;
        };
    };
}

declare type Staff = {
    adminId: string;
    email: string;
    encryptedPassword: string;
    decryptedPassword: string;
    isSuspended: boolean;
    role: "admin" | "super_admin";
    _id: string;
    createdAt: string;
}

// Admin Get All Staff
declare type GetStaffResponse = {
    message: string | null;
    status: number;
    success: boolean;
    data: Staff[];
}

// Get Current Admin Response
declare type GetCurrentAdminResponse = {
    message: string | null;
    status: number;
    success: boolean;
    data: Staff;
}