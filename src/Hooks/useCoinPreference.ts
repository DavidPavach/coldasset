import { useEffect, useState } from "react";

// Enums
import { COINS, type Coin } from "@/enum";

type CoinVisibility = Record<Coin, boolean>;
const STORAGE_KEY = "coin-visibility";

const buildState = (overrides?: Partial<Record<Coin, boolean>>): CoinVisibility =>
    COINS.reduce((acc, coin) => {
        acc[coin] = overrides?.[coin] ?? true;
        return acc;
    }, {} as CoinVisibility);

export function useCoinPreferences() {

    const [coins, setCoins] = useState<CoinVisibility>(() => buildState());

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);

        if (!stored) {
            const defaults = buildState();
            localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
            setCoins(defaults);
            return;
        }

        try {
            const parsed = JSON.parse(stored) as Partial<Record<Coin, boolean>>;
            const merged = buildState(parsed);

            setCoins(merged);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        } catch {
            const defaults = buildState();
            setCoins(defaults);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
        }
    }, []);

    const toggleCoin = (coin: Coin) => {
        setCoins((prev) => {
            const updated = {
                ...prev,
                [coin]: !prev[coin],
            };

            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        });
    };

    return { coins, toggleCoin };
}
