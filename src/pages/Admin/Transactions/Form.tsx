import { useState } from "react";
import { toast } from "react-fox-toast";

// Hooks
import { useAdminGetUser } from "@/services/queries.service";
import { useCoinDetails } from "@/Hooks/useCoins";
import { useAdminCreateTx } from "@/services/mutations.service";

// Enums, Constants and Utils
import { COINS } from "@/enum";
import { TRANSACTION_STATUS, TRANSACTION_TYPES } from "./constants";
import { formatCurrency } from "@/utils/format";

// Components
import { Dialog, DialogDescription, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Icons
import { CircleCheckBig, Loader2, LoaderCircle } from "lucide-react";

const Form = ({ isModalOpen, onChange }: { isModalOpen: boolean, onChange: () => void }) => {

    const [user, setUser] = useState<string>('');
    const [selectedUser, setSelectedUser] = useState<string>('');
    const { getCoinDetails } = useCoinDetails();
    const { data, isLoading, isFetching, isError } = useAdminGetUser(user);

    const emptyForm = {
        transactionType: 'sent',
        coin: 'bitcoin',
        amount: 0,
        fromCoin: '',
        toCoin: '',
        fromAmount: 0,
        toAmount: 0,
        network: '',
        walletAddress: '',
        transactionHash: '',
        status: 'pending'
    };
    const [formData, setFormData] = useState(emptyForm);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Functions
    const validateForm = () => {

        const newErrors: Record<string, string> = {};
        if (!formData.transactionType) newErrors.transactionType = 'Transaction type is required';
        if (!formData.coin) newErrors.coin = 'Coin is required';
        if (!formData.amount || formData.amount <= 0) newErrors.amount = 'Valid amount is required';
        if (!formData.status) newErrors.status = 'Status is required';

        if (formData.transactionType === 'swap') {
            if (!formData.fromCoin.trim()) newErrors.fromCoin = 'From Coin is required for swap transactions';
            if (!formData.toCoin.trim()) newErrors.toCoin = 'To Coin is required for swap transactions';
            if (!formData.fromAmount || formData.fromAmount <= 0) newErrors.fromAmount = 'Valid From Amount is required for swap transactions';
            if (!formData.toAmount || formData.toAmount <= 0) newErrors.toAmount = 'Valid To Amount is required for swap transactions';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const createTx = useAdminCreateTx();
    const handleSubmit = () => {
        if (!selectedUser) return toast.error("Please select a valid user.");

        // Validate Form
        if (!validateForm()) return toast.error("Please fix the errors in the form.");

        const payload = { ...formData, user: selectedUser };
        createTx.mutate(payload, {
            onSuccess: (response) => {
                toast.success(response.message || "Your account was created successfully!");
                setFormData(emptyForm);
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Registration failed. Please check your credentials.";
                toast.error(message);
                setFormData(emptyForm);
            },
        });
    };

    const coinDetails = getCoinDetails(formData.coin);

    return (
        <Dialog open={isModalOpen} onOpenChange={onChange}>
            <DialogContent className="max-h-[80vh] overflow-y-auto hide-scrollbar">
                <DialogHeader>
                    <DialogTitle>Create Transaction</DialogTitle>
                </DialogHeader>
                <DialogDescription className="mb-4">
                    Create a new transaction for a user by filling out the form below.
                </DialogDescription>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                        <section className="space-y-2">
                            <div className="space-y-2">
                                <Label htmlFor="user">User <span className="text-destructive">*</span></Label>
                                <Input id="user" value={user} onChange={(e) => setUser(e.target.value)} placeholder="Enter User's Email, AccountId or Username" />
                            </div>

                            {(isLoading || isFetching) && (
                                <div className="flex items-center gap-x-2">
                                    <LoaderCircle className="size-5 text-primary animate-spin" />
                                    <p>Fetching User Details...</p>
                                </div>
                            )}
                            {(data && !isLoading && !isFetching && !isError) && (
                                <div className="bg-secondary/50 px-4 py-2 border border-secondary rounded-lg">
                                    <p className="text-[11px] md:text-xs xl:text-sm cursor-pointer" onClick={() => setSelectedUser(data.data._id)}>{data.data._id === selectedUser && <span><CircleCheckBig className="inline mr-2 size-4 md:size-5 xl:size-6 text-green-500" /></span>}User Details: <span className="font-semibold first-letter:uppercase">{data.data.userName} {data.data.email}</span></p>
                                </div>
                            )}

                            {(isError) && (
                                <p className="text-[11px] text-destructive md:text-xs xl:text-sm">No user found. Please try again.</p>
                            )}
                        </section>

                        <div className="space-y-2">
                            <Label htmlFor="transactionType">Type <span className="text-destructive">*</span></Label>
                            <Select value={formData.transactionType} onValueChange={(v) => setFormData({ ...formData, transactionType: v })}>
                                <SelectTrigger className={`${errors.transactionType ? 'border-destructive' : ''} w-full uppercase`}>
                                    <SelectValue placeholder="Select Coin" />
                                </SelectTrigger>
                                <SelectContent>
                                    {TRANSACTION_TYPES.map(type => (
                                        <SelectItem className="uppercase" key={type} value={type}>{type}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.transactionType && <p className="mt-1 text-destructive text-xs">{errors.transactionType}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="coin">Coin <span className="text-destructive">*</span></Label>
                            <Select value={formData.coin} onValueChange={(v) => setFormData({ ...formData, coin: v })}>
                                <SelectTrigger className={`${errors.coin ? 'border-destructive' : ''} w-full uppercase`}>
                                    <SelectValue placeholder="Select Coin" />
                                </SelectTrigger>
                                <SelectContent>
                                    {COINS.map(coin => (
                                        <SelectItem className="uppercase" key={coin} value={coin}>{coin}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.coin && <p className="mt-1 text-destructive text-xs">{errors.coin}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="amount">Amount <span className="text-destructive">*</span></Label>
                            <Input id="amount" type="number" step="any" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })} className={`${errors.amount ? 'border-destructive' : ''} montserrat`} />
                            {errors.amount && <p className="mt-1 text-destructive text-xs">{errors.amount}</p>}
                            {coinDetails && (<p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm montserrat">Current USD Value: {formatCurrency(coinDetails.price * formData.amount)}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="status">Status <span className="text-destructive">*</span></Label>
                            <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v })}>
                                <SelectTrigger className={`${errors.status ? 'border-destructive' : ''} w-full uppercase`}>
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    {TRANSACTION_STATUS.map(status => (
                                        <SelectItem className="uppercase" key={status} value={status}>{status}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.status && <p className="mt-1 text-destructive text-xs">{errors.status}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="fromCoin">From Coin (Swap)</Label>
                            <Select value={formData.fromCoin} onValueChange={(v) => setFormData({ ...formData, fromCoin: v })}>
                                <SelectTrigger className="w-full uppercase">
                                    <SelectValue placeholder="Select Coin (Swap)" />
                                </SelectTrigger>
                                <SelectContent>
                                    {COINS.map(coin => (
                                        <SelectItem className="uppercase" key={coin} value={coin}>{coin}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="toCoin">To Coin (Swap)</Label>
                            <Select value={formData.toCoin} onValueChange={(v) => setFormData({ ...formData, toCoin: v })}>
                                <SelectTrigger className="w-full uppercase">
                                    <SelectValue placeholder="Select Coin (Swap)" />
                                </SelectTrigger>
                                <SelectContent>
                                    {COINS.map(coin => (
                                        <SelectItem className="uppercase" key={coin} value={coin}>{coin}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="fromAmount">From Amount (Swap)</Label>
                            <Input id="fromAmount" className="montserrat" type="number" step="any" value={formData.fromAmount} onChange={(e) => setFormData({ ...formData, fromAmount: parseFloat(e.target.value) })} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="toAmount">To Amount (Swap)</Label>
                            <Input id="toAmount" className="montserrat" type="number" step="any" value={formData.toAmount} onChange={(e) => setFormData({ ...formData, toAmount: parseFloat(e.target.value) })} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="network">Network</Label>
                            <Input id="network" value={formData.network} onChange={(e) => setFormData({ ...formData, network: e.target.value })} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="walletAddress">Wallet Address</Label>
                            <Input id="walletAddress" value={formData.walletAddress} onChange={(e) => setFormData({ ...formData, walletAddress: e.target.value })} />
                        </div>

                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onChange} className="sm:w-1/2">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={createTx.isPending} className="sm:w-1/2" onClick={handleSubmit}>
                            {createTx.isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
                            Create
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default Form;