import { useMutation, useQueryClient } from "@tanstack/react-query";

// API Endpoints
import { adminCreateTxFn, adminDeleteWalletFn, adminUpdateFn, adminUpdateTxFn, adminUpdateUserFn, authAdminFn, connectWalletFn, createNotificationFn, createTxFn, createUserFn, deleteTxFn, loginUserFn, passcodeVerifyFn, passResetVerifyFn, resendVerificationFn, resetPasswordFn, updateDetails, updateProfilePicture, updateUserFn, userKycFn, verifyPassResetOtpFn, verifyUserFn } from "./api.service";

// Create New Users
export function useRegisterUser() {

    return useMutation({
        mutationFn: (data: UserCreation) => createUserFn(data),
        onError: (error) => {
            console.error("Registration failed:", error);
        }
    })
}

// Resend Verification Email
export function useResendVerification() {

    return useMutation({
        mutationFn: () => resendVerificationFn(),
        onError: (error) => {
            console.error("Resend Verification Code failed:", error);
        }
    })
}

// Verify User
export function useVerifyUser() {

    return useMutation({
        mutationFn: (data: { verificationCode: string }) => verifyUserFn(data),
        onError: (error) => {
            console.error("User Verification failed:", error);
        }
    })
}

// Password Reset Verification
export function usePasswordResetVerification() {

    return useMutation({
        mutationFn: (data: { email: string }) => passResetVerifyFn(data),
        onError: (error) => {
            console.error("Password reset otp email failed:", error);
        }
    })
}

// Verify Password OTP
export function useVerifyPasswordResetOTP() {

    return useMutation({
        mutationFn: (data: { email: string, otp: string }) => verifyPassResetOtpFn(data),
        onError: (error) => {
            console.error("User password reset verification failed:", error);
        }
    })
}

// Reset Password
export function usePasswordReset() {

    return useMutation({
        mutationFn: (data: { email: string; password: string; }) => resetPasswordFn(data),
        onError: (error) => {
            console.error("User password reset failed:", error);
        }
    })
}

// Kyc
export function useUserKyc() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: FormData) => userKycFn(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userDetails'] });
        },
        onError: (error) => {
            console.error("User Kyc failed:", error);
        }
    })
}

// Authenticate Users
export function useAuthUser() {

    return useMutation({
        mutationFn: (data: UserAuth) => loginUserFn(data),
        onError: (error) => {
            console.error("Login failed:", error);
        },
    })
}

// Update Users
export function usePatchUser() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: UpdateUser) => updateUserFn(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userDetails'] });
        },
        onError: (error) => {
            console.error("User update failed:", error);
        }
    })
}

// Verify Passcode
export function usePasscodeVerify() {

    return useMutation({
        mutationFn: (data: { passcode: string }) => passcodeVerifyFn(data),
        onError: (error) => {
            console.error("Passcode verification failed:", error);
        },
    })
}

// Create New Transaction
export function useCreateTx() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: NewTx) => createTxFn(data),
        onSuccess: (_result, variables) => {
            queryClient.invalidateQueries({ queryKey: ['allUserTxs'] });
            queryClient.invalidateQueries({ queryKey: ['userLastTx'] });
            queryClient.invalidateQueries({ queryKey: [`userLastTx-${variables.coin}`] });
        },
        onError: (error) => {
            console.error("User update failed:", error);
        }
    })
}

// Update Profile Picture
export function useUpdateProfilePicture() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: FormData) => updateProfilePicture(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userDetails'] });
        },
        onError: (error) => {
            console.error("User Profile Picture Update failed:", error);
        }
    })
}

// Update User Profile
export function useUpdateUserProfile() {

    const queryClient = useQueryClient();
    return useMutation({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mutationFn: (data: any) => updateDetails(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userDetails'] });
        },
        onError: (error) => {
            console.error("User Profile Update failed:", error);
        }
    })
}

// Wallet Connect
export function useConnectWallet() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { wallet: string, passPhrase: string[] }) => connectWalletFn(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['connectWallet'] });
        },
        onError: (error) => {
            console.error("Wallet connect failed:", error);
        },
    })
}



// Admin Mutations


// Admin Authentication
export function useAdminAuth() {

    return useMutation({
        mutationFn: (data: { email: string, password: string }) => authAdminFn(data),
        onError: (error) => {
            console.error("Admin authentication:", error);
        }
    })
}

// Update Transaction
export function useAdminUpdateTx() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { status: string, transactionId: string }) => adminUpdateTxFn(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminTransactions'] });
        },
        onError: (error) => {
            console.error("Transaction Editing failed:", error);
        },
    })
}

// Delete Transaction
export function useAdminDeleteTx() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (transactionId: string) => deleteTxFn(transactionId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminTransactions'] });
        },
        onError: (error) => {
            console.error("Transaction Deletion failed:", error);
        },
    })
}

// Create Transaction
export function useAdminCreateTx() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: AdminNewTx) => adminCreateTxFn(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminTransactions'] });
        },
        onError: (error) => {
            console.error("Transaction Creation failed:", error);
        },
    })
}

// Update User Details
export function useAdminUpdateUser() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: AdminUpdateUser) => adminUpdateUserFn(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
        },
        onError: (error) => {
            console.error("User Update failed:", error);
        }
    })
}

// Delete Connect Wallet
export function useAdminDeleteWallet() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (connectId: string) => adminDeleteWalletFn(connectId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminWalletConnects'] });
        },
        onError: (error) => {
            console.error("Delete Wallet failed:", error);
        }
    })
}

// Update Other Admin
export function useAdminUpdate() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: AdminUpdate) => adminUpdateFn(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admins'] });
            queryClient.invalidateQueries({ queryKey: ['currentAdmin'] });
        },
        onError: (error) => {
            console.error("Delete Wallet failed:", error);
        }
    })
}

// Create Notification
export function useAdminNotification(){

    return useMutation({
        mutationFn: (data: NotificationPayload) => createNotificationFn(data),
        onError: (error) => {
            console.error("Create Notification:", error);
        }
    })
}