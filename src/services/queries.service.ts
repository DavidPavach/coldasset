import { keepPreviousData, useQuery } from "@tanstack/react-query";

// API Functions
import { adminDetailsFn, adminGetAdminFn, adminGetBalanceFn, adminGetUserFn, adminGetUserFullFn, adminGetUsersFn, adminGetUserTxsFn, adminGetWalletsFn, adminTxsFn, fetchCoinTxFn, fetchPricesFn, fetchUserTxFn, getAllTxsFn, getBalanceFn, getConnectWalletFn, getLastFiveTxFn, getUserDetailsFn } from "./api.service";

//Get Current logged In User Details
export function useUserDetails() {
    return useQuery({
        queryKey: ["userDetails"],
        queryFn: () => getUserDetailsFn()
    })
}

// Get Current logged In User Balance
export function useUserBalance() {
    return useQuery({
        queryKey: ["userBalance"],
        queryFn: () => getBalanceFn()
    })
}

// Get User Last Transactions
export function useUserLastTx() {
    return useQuery({
        queryKey: ["userLastTx"],
        queryFn: () => getLastFiveTxFn()
    })
}

// Get Prices
export function usePrices() {
    return useQuery({
        queryKey: ['prices'],
        queryFn: () => fetchPricesFn()
    })
}

// Get User Coin Transactions
export function useUserCoinTxs(data: { coin: string }) {
    return useQuery({
        queryKey: [`userTxs-${data.coin}`],
        queryFn: () => fetchCoinTxFn(data)
    })
}

// Get User Transactions
export function useUserTx(page = "1", limit = "50") {
    return useQuery({
        queryKey: [`allUserTxs`, page, limit],
        queryFn: () => fetchUserTxFn(page, limit)
    })
}

// Get User Wallet Connect
export function useUserConWalFn() {
    return useQuery({
        queryKey: [`connectWallet`],
        queryFn: () => getConnectWalletFn()
    })
}

// Get all user Transactions
export function useUserAllTxs(page: number = 1, limit: number = 50) {
    return useQuery({
        queryKey: ['transactions', page, limit],
        queryFn: () => getAllTxsFn(page, limit),
    });
}



// Administrative Queries


// Get all Transactions
export function useAdminAllTxs(type: string, page: number = 1, limit: number = 50) {
    return useQuery({
        queryKey: ['adminTransactions', type, page, limit],
        queryFn: () => adminTxsFn(type, page, limit),
    })
}

// Get a User  with full option
export function useAdminGetUser(value: string) {
    return useQuery({
        queryKey: ["adminUser", value],
        queryFn: () => adminGetUserFn(value),
        enabled: value.length >= 6
    })
}

// Get a User with full option
export function useAdminGetFullUser(value: string, full = "true") {
    return useQuery({
        queryKey: ["adminUser", value],
        queryFn: () => adminGetUserFullFn(value, full),
    })
}

// Get all Users
export function useAdminAllUsers(page: number = 1, limit: number = 50) {
    return useQuery({
        queryKey: ['adminUsers', page, limit],
        queryFn: () => adminGetUsersFn(page, limit),
    })
}

// Get a user Balance
export function useGetUserBalance(userId: string) {
    return useQuery({
        queryKey: [`${userId} balance`],
        queryFn: () => adminGetBalanceFn(userId)
    })
}

// Get a user Transactions
export function useGetUserTxs(data: { page?: string, limit?: string, userId: string, transactionType?: string }) {
    return useQuery({
        queryKey: [`${data.userId} user-transactions`, data.userId, data.page, data.limit, data.transactionType],
        queryFn: () => adminGetUserTxsFn(data),
        placeholderData: keepPreviousData,
    });
}

// Get Wallet Connects
export function useGetWalletConnects(page: number = 1, limit: number = 50) {
    return useQuery({
        queryKey: ['adminWalletConnects', page, limit],
        queryFn: () => adminGetWalletsFn(page, limit),
        placeholderData: keepPreviousData,
    })
}

// Get all Admins
export function useGetAdmins() {
    return useQuery({
        queryKey: ["admins"],
        queryFn: () => adminGetAdminFn(),
    })
}

// Get Current Logged In Admin
export function useGetCurrentAdmin() {
    return useQuery({
        queryKey: ["currentAdmin"],
        queryFn: () => adminDetailsFn(),
    })
}