import { create } from "zustand";

type PassphraseFlowState = {
    email: string;
    verification: boolean;
    setEmail: (email: string) => void;
    setVerification: (value: boolean) => void;
};

export const userPassphraseFlow = create<PassphraseFlowState>((set) => ({
    email: "",
    verification: false,

    setEmail: (email) =>
        set({ email }),

    setVerification: (value) =>
        set({ verification: value }),
}));
