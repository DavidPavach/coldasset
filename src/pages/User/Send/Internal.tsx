import { useState } from "react";
import { toast } from "react-fox-toast";

// Enums, Hooks and Utils
import { coinMeta } from "@/enum";
import { useUserDetails } from "@/services/queries.service";
import { useCoinDetails } from "@/Hooks/useCoinDetails";
import { isValidUserId, formatCurrency } from "@/utils/format";
import { useCreateTx } from "@/services/mutations.service";

// Components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Toast from "./Toast";
import { ErrorScreen } from "@/components/ErrorComponents";
import { Button } from "@/components/ui/button";

// Icons
import { AlertCircle, Loader } from "lucide-react";
import { ArrowRight, InfoCircle } from "iconsax-reactjs";

interface InternalFormData {
    coin: string;
    amount: string;
    receiver: string;
}

const Internal = ({ coin }: { coin: string }) => {

    const { getCoinDetails, loading: coinLoading, isError: coinError, refetch: refetchCoins } = useCoinDetails();
    const { data, isLoading, isFetching, isError, refetch } = useUserDetails();

    const [formData, setFormData] = useState<InternalFormData>({
        coin: coin,
        amount: "",
        receiver: "",
    });

    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
    const [show, setShow] = useState<boolean>(false);

    const createTx = useCreateTx();

    const handleInputChange = (field: keyof InternalFormData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

        setValidationErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[field];
            return newErrors;
        });
    };

    const validateForm = (): boolean => {
        const errors: Record<string, string> = {};

        if (!formData.coin) errors.coin = "Something went wrong, kindly restart the process";

        if (!formData.amount || Number.parseFloat(formData.amount) <= 0) {
            errors.amount = "Please enter a valid amount";
        }

        if (!isValidUserId(formData.receiver)) {
            errors.receiver = "Please enter a valid Account ID";
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const reset = () => {
        setFormData({
            coin: coin,
            amount: "",
            receiver: "",
        });
    };

    const toggleShow = () => (setShow((prev) => !prev));

    const handleSubmit = () => {

        if (data?.data.accountId === formData.receiver) return toast.error("You can't send cryptocurrency to yourself");
        if (!validateForm()) return toast.error("Kindly correct all errors");

        const submissionData = {
            ...formData,
            coin: formData.coin as TransactionCoin,
            amount: parseFloat(formData.amount),
            transactionType: "sent" as const,
        };

        createTx.mutate(submissionData, {
            onSuccess: (response) => {
                toast.success(response.data.message || "Your transfer was initiated successfully!");
                setShow(true);
                reset();
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Transfer failed. Please try again.";
                toast.error(message);
                reset();
            },
        });
    };

    const isLoadingState = isLoading || isFetching || coinLoading;

    // Loading State
    if (isLoadingState) {
        return (
            <main className="mx-auto mt-10 max-w-6xl">
                <Card>
                    <CardHeader>
                        <CardTitle>Loading transfer details...</CardTitle>
                        <CardDescription>Please wait a moment</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 animate-pulse">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-muted rounded-md h-10" />
                        ))}
                    </CardContent>
                </Card>
            </main>
        );
    }

    // Error State
    if (isError || coinError) {
        return (
            <ErrorScreen variant="card" type="500" title="Couldn't fetch your transfer details"
                onRetry={() => {
                    refetch();
                    refetchCoins();
                }}
            />
        );
    }

    const meta = coinMeta[coin];
    const coinDetails = getCoinDetails(coin);

    return (
        <>
            {show && <Toast message={data?.data.message} onClose={toggleShow} />}
            <main className="mx-auto mt-10 max-w-6xl">
                <div className="mb-8 text-center">
                    <h1 className="font-bold text-foreground text-2xl md:text-3xl xl:text-4xl capitalize">
                        Send {coin}
                    </h1>
                    <p className="mt-2 text-muted-foreground">Cold Asset Internal Transfer</p>
                </div>

                <Card>
                    <CardHeader className="bg-card/50 border-border/50 border-b">
                        <CardTitle>Transfer Details</CardTitle>
                        <CardDescription>Enter your internal transfer details</CardDescription>
                    </CardHeader>

                    <CardContent className="flex flex-col gap-y-5 pt-4">
                        {/* Account ID */}
                        <div className="space-y-2">
                            <label className="block font-semibold text-[11px] md:text-xs xl:text-sm">
                                Account ID
                            </label>

                            <Input placeholder="Enter user account ID (e.g., CA1111111110...)" value={formData.receiver}
                                onChange={(e) => handleInputChange("receiver", e.target.value)} className={`font-mono ${validationErrors.receiver ? "border-destructive" : ""}`} />
                            <p className="text-[10px] text-yellow-600 md:text-[11px] dark:text-yellow-500 xl:text-xs"> Double-check the account ID before submitting. Transfers cannot be reversed. </p>

                            {validationErrors.receiver && (
                                <div className="flex items-center gap-2 text-destructive text-xs">
                                    <AlertCircle className="size-4" />
                                    {validationErrors.receiver}
                                </div>
                            )}
                        </div>

                        {/* Amount */}
                        <div className="space-y-2">
                            <label className="block font-semibold text-[11px] md:text-xs xl:text-sm">
                                Amount
                            </label>

                            <div className="relative">
                                <Input type="number" placeholder="0.00" value={formData.amount} onChange={(e) => handleInputChange("amount", e.target.value)} className={`pr-12 montserrat ${validationErrors.amount ? "border-destructive" : ""}`} step="0.00000001" min="0" />

                                <span className="top-1/2 right-3 absolute text-muted-foreground text-xs -translate-y-1/2">
                                    {meta.name.toUpperCase()}
                                </span>
                            </div>

                            {validationErrors.amount && (
                                <div className="flex items-center gap-2 text-destructive text-xs">
                                    <AlertCircle className="size-4" />
                                    {validationErrors.amount}
                                </div>
                            )}
                        </div>

                        {/* Summary */}
                        {formData.amount && (
                            <div className="space-y-2 bg-muted mt-4 p-4 border border-border/50 rounded-lg">
                                <div className="flex justify-between text-xs">
                                    <span className="text-muted-foreground">Coin</span>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">{meta.name}</span>
                                        <img src={meta.logo} className="size-6" />
                                    </div>
                                </div>

                                <div className="flex justify-between text-xs">
                                    <span className="text-muted-foreground">Amount</span>
                                    <span className="font-medium montserrat">
                                        {formData.amount} {meta.symbol},{" "}
                                        {formatCurrency(parseFloat(formData.amount) * coinDetails.price)}
                                    </span>
                                </div>

                                <div className="flex justify-between mt-2 pt-2 border-border/50 border-t text-xs">
                                    <span className="text-muted-foreground">Receiver</span>
                                    <span className="max-w-xs font-mono truncate">
                                        {formData.receiver || <Loader className="size-4 text-primary animate-spin" />}
                                    </span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-muted-foreground">
                                        Network Fee <InfoCircle variant="Bold" className="inline mb-05 size-4 text-yellow-600 dark:text-yellow-500" />
                                    </span>
                                    <span className="font-medium text-foreground montserrat">1.02 ETH</span>
                                </div>
                            </div>
                        )}

                        {/* Submit */}
                        <div className="pt-6">
                            <Button className="gap-2 w-full h-8 md:h-10 xl:h-12" size="lg" disabled={createTx.isPending} onClick={handleSubmit}>
                                {createTx.isPending ? (
                                    <><Loader className="inline mr-0.5 size-4 animate-spin" /> Processing...</>
                                ) : (
                                    <>
                                        Confirm Transfer <ArrowRight className="size-4" />
                                    </>
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </>
    );
};

export default Internal;
