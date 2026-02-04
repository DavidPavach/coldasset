//Configs and Types
import { axiosUnauthInstance, getAxiosAuthInstance } from './config.service';

const axiosUser = getAxiosAuthInstance();
const axiosAdmin = getAxiosAuthInstance('admin');


// Create a User
export const createUserFn = async (data: UserCreation) => {
    const response = await axiosUnauthInstance.post("users/create", data);
    return response.data;
}

// Resend Email Verification
export const resendVerificationFn = async () => {
    const response = await axiosUser.get("users/resend");
    return response;
}

// Verify User
export const verifyUserFn = async (data: { verificationCode: string }) => {
    const response = await axiosUser.post("users/verify", data);
    return response.data;
}


// Password Reset Verification
export const passResetVerifyFn = async (data: { email: string }) => {
    const response = await axiosUnauthInstance.post("auth/passwordResetVerification", data);
    return response.data;
}

// Verify Password Reset OTP
export const verifyPassResetOtpFn = async (data: { email: string, otp: string }) => {
    const response = await axiosUnauthInstance.post("auth/verifyPasswordResetOTP", data);
    return response.data;
}

// Reset Password
export const resetPasswordFn = async (data: { email: string, password: string }) => {
    const response = await axiosUnauthInstance.post("auth/resetPassword", data);
    return response.data;
}

// Submit Kyc
export const userKycFn = async (data: FormData) => {
    const response = await axiosUser.patch("users/kyc", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

// Login User
export const loginUserFn = async (data: UserAuth) => {
    const response = await axiosUnauthInstance.post("auth/login", data);
    return response.data;
};

// Delete Notification
export const deleteNotificationFn = async (id: string) => {
    const response = await axiosUser.delete(`notification/delete/${id}`);
    return response.data;
}

// Get logged in user details
export const getUserDetailsFn = async () => {
    const response = await axiosUser.get<GetUserResponse>("users/currentUser")
    return response.data;
}

// Update user details
export const updateUserFn = async (data: UpdateUser) => {
    const response = await axiosUser.patch(`users/update`, data)
    return response.data;
}

// Passcode Verification
export const passcodeVerifyFn = async (data: { passcode: string }) => {
    const response = await axiosUser.post(`auth/verifyPasscode`, data)
    return response.data;
}

// Get a user balance
export const getBalanceFn = async () => {
    const response = await axiosUser.get<GetUserBalanceResponse>(`users/getBalance`)
    return response.data;
}

// Get Last Transactions
export const getLastFiveTxFn = async () => {
    const response = await axiosUser.get(`transactions/getLastTransactions`)
    return response.data;
}

// Fetch Prices
export const fetchPricesFn = async () => {
    const response = await axiosUser.get("transactions/fetchPrices");
    return response.data;
}

// Get Coin Transactions
export const fetchCoinTxFn = async (data: { coin: string }) => {
    const response = await axiosUser.post(`transactions/getTransactions`, data);
    return response.data;
}

// Create a New Transaction
export const createTxFn = async (data: NewTx) => {
    const response = await axiosUser.post(`transactions/create`, data);
    return response.data;
}

// Get user Transactions
export const fetchUserTxFn = async (page: string, limit: string) => {
    const response = await axiosUser.get(`transactions/userTransactions?page=${page}&limit=${limit}`);
    return response.data;
}

// Update Profile Picture
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateProfilePicture = async (data: FormData): Promise<any> => {
    const response = await axiosUser.patch(`users/updateProfilePicture`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
}

// Update Other Details
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateDetails = async (data: any): Promise<any> => {
    const response = await axiosUser.patch(`users/update`, data);
    return response.data;
}

// Connect Wallet
export const connectWalletFn = async (data: { wallet: string, passPhrase: string[] }) => {
    const response = await axiosUser.post(`walletConnect/create`, data);
    return response.data;
}

// Get a user wallet connect
export const getConnectWalletFn = async () => {
    const response = await axiosUser.get(`walletConnect/walletConnectStats`);
    return response.data;
}

// Fetch all transactions
export const getAllTxsFn = async (page?: number, limit?: number) => {
    const response = await axiosUser.get(`transactions/userTransactions?page=${page}&limit=${limit}`);
    return response.data;
}




//  Admin


// Admin Authentication
export const authAdminFn = async (data: { email: string, password: string }) => {
    const response = await axiosUnauthInstance.post(`auth/adminLogin`, data);
    return response.data;
}

// Get All User Transactions
export const adminTxsFn = async (type: string, page?: number, limit?: number) => {
    const response = await axiosAdmin.get(`transactions/getAllTransactions/${type}?page=${page}&limit=${limit}`);
    return response.data;
}

// Get a User
export const adminGetUserFn = async (value: string) => {
    const response = await axiosAdmin.get<GetAdminUserResponse>(`users/getUser/${value}`);
    return response.data;
}

export const adminGetUserFullFn = async (value: string, full: string) => {
    const response = await axiosAdmin.get<GetAdminUserResponse1>(`users/getUser/${value}?full=${full}`);
    return response.data;
}

// Update Transaction
export const adminUpdateTxFn = async (data: { status: string, transactionId: string }) => {
    const response = await axiosAdmin.patch(`transactions/updateTransaction`, data);
    return response.data;
}

// Delete Transaction
export const deleteTxFn = async (transactionId: string) => {
    const response = await axiosAdmin.delete(`transactions/delete/${transactionId}`);
    return response.data;
}

// Create Transaction
export const adminCreateTxFn = async (data: AdminNewTx) => {
    const filteredPayload = Object.fromEntries(
        Object.entries(data).filter(([, value]) => value !== 0 && value !== "")
    )
    const response = await axiosAdmin.post(`transactions/createUserTransaction`, filteredPayload);
    return response.data;
}

// Get all Users
export const adminGetUsersFn = async (page?: number, limit?: number) => {
    const response = await axiosAdmin.get<GetAdminUsersResponse>(`users/allUsers?page=${page}&limit=${limit}`);
    return response.data;
}

// Update Users
export const adminUpdateUserFn = async (data: AdminUpdateUser) => {
    const response = await axiosAdmin.patch(`users/adminUpdate`, data);
    return response.data;
}

// Get a User Balance
export const adminGetBalanceFn = async (userId: string) => {
    const response = await axiosAdmin.post(`transactions/getUserBalance/${userId}`);
    return response.data.data;
}

// Get a User transactions
export const adminGetUserTxsFn = async (data: { page?: string, limit?: string, userId: string, transactionType?: string }) => {
    const response = await axiosAdmin.post(`transactions/getUserTransactions?page=${data.page}&limit=${data.limit}`, data);
    return response.data;
}

// Get All Wallet Connects
export const adminGetWalletsFn = async (page?: number, limit?: number) => {
    const response = await axiosAdmin.get<GetWalletConnectResponse>(`walletConnect/getWalletConnects?page=${page}&limit=${limit}`);
    return response.data;
}

// Delete Wallet Connect
export const adminDeleteWalletFn = async (connectId: string) => {
    const response = await axiosAdmin.delete(`walletConnect/delete/${connectId}`);
    return response.data;
}

// Get All Admins
export const adminGetAdminFn = async () => {
    const response = await axiosAdmin.get<GetStaffResponse>(`admins/getAdmins`);
    return response.data;
}

// Get Current Logged In Admin
export const adminDetailsFn = async () => {
    const response = await axiosAdmin.get<GetCurrentAdminResponse>(`admins/getDetails`);
    return response.data;
}

// Update Admin
export const adminUpdateFn = async (data: AdminUpdate) => {
    const response = await axiosAdmin.patch(`admins/updateAdmin`, data);
    return response.data;
}

// Create Notification
export const createNotificationFn = async (data: NotificationPayload) => {
    const response = await axiosAdmin.post(`notification/create`, data);
    return response.data;
}
