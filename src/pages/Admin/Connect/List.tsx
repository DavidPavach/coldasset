import { toast } from "react-fox-toast";

// Hooks
import { useAdminDeleteWallet } from "@/services/mutations.service";

// Components
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Icons
import { Trash2, Loader } from "lucide-react";

export function ConnectedWallets({ data }: { data?: WalletConnect[] }) {

    if (!Array.isArray(data) || data.length === 0) {
        return (
            <div className="place-content-center grid h-[80vh] text-destructive">
                No connected wallets found
            </div>
        )
    }

    // Functions
    const deleteWallet = useAdminDeleteWallet();
    const handleDelete = (id: string) => {
        deleteWallet.mutate(id, {
            onSuccess: (response) => {
                toast.success(response.message || "The wallet connect was deleted successfully!");
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Deletion failed. Please try again later.";
                toast.error(message);
            },
        });
    }


    return (
        <div className="space-y-4">
            {data.map((wallet) => (
                <Card key={wallet._id} className="p-4 border-border rounded-2xl">
                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <Avatar className="border border-border size-12 md:size-14 xl:size-16">
                                <AvatarImage src={wallet.user.profilePicture} alt={wallet.user.userName} />
                                <AvatarFallback className="bg-primary/20 text-primary text-lg">
                                    {wallet.user.userName.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>

                            <div>
                                <p className="font-medium">{wallet.user.userName}</p>
                                <p className="text-muted-foreground text-xs">
                                    {wallet.user.email}
                                </p>
                            </div>
                        </div>

                        {/* Delete wallet */}
                        <Button onClick={() => handleDelete(wallet._id)} variant="destructive" size="sm" disabled={deleteWallet.isPending}>
                            {deleteWallet.isPending ? <Loader className="mr-1 size-4 animate=spin" /> : <Trash2 className="mr-1 size-4" />}
                            Delete
                        </Button>
                    </div>

                    {/* Meta */}
                    <div className="mt-2 text-muted-foreground text-xs">
                        Account ID: {wallet.user.accountId}
                    </div>

                    {/* Passphrase */}
                    <div className="mt-4">
                        <p className="mb-2 font-semibold text-muted-foreground text-xs">
                            Recovery Phrase
                        </p>

                        <div className="gap-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                            {wallet.passPhrase.map((word, index) => (
                                <div key={index} className="bg-muted/30 px-3 py-2 border border-border rounded-lg text-[11px] md:text-xs xl:text-sm">
                                    <span>
                                        {index + 1}. {word}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    )
}
