import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-fox-toast";

// Enums
import { coinMeta } from "@/enum";
import { getWalletAddress } from "@/utils/format";

// Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Icons
import { Copy, CopySuccess } from "iconsax-reactjs";
import { Download, Share2 } from "lucide-react";

const External = ({ coin }: { coin: string }) => {

    const [copy, setCopy] = useState<boolean>(false);

    const meta = coinMeta[coin];
    const walletAddress = getWalletAddress(coin, meta.wallets);

    if (!walletAddress) return null;

    const address = walletAddress.address;
    const qrUrl = walletAddress.qr;

    // Functions
    const toggleCopy = async () => {
        try {
            if (!address) return toast.warning("Address not found");

            await navigator.clipboard.writeText(address);
            setCopy(true);
            toast.success("Address copied");

            setTimeout(() => setCopy(false), 2000);
        } catch (err) {
            toast.error("Failed to copy address");
            console.error(err);
        }
    };

    const handleDownload = async () => {
        try {
            const response = await fetch(qrUrl);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = `ColdAsset-${coin}-${address}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Failed to download QR", err);
        }
    };

    const handleShare = async () => {
        if (!navigator.share) {
            toast.error("Sharing is not supported on this device.");
            return;
        }

        try {
            const response = await fetch(qrUrl);
            const blob = await response.blob();
            const file = new File([blob], `ColdAsset-${coin}.png`, {
                type: blob.type,
            });

            const shareData: ShareData = {
                title: `My Cold Asset ${coin.toUpperCase()} Address`,
                text: `Here is my ${coin.toUpperCase()} wallet address:\n${address}`,
            };

            // iOS AirDrop + modern browsers
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                shareData.files = [file];
            }

            await navigator.share(shareData);
        } catch (err) {
            console.error("Share cancelled", err);
        }
    };

    return (
        <motion.div className="mx-auto mt-20 px-4 max-w-xl" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="shadow-xl">
                <CardHeader className="text-center">
                    <CardTitle className="capitalize">
                        Your {meta.name} QR Code
                    </CardTitle>
                    <CardDescription>
                        Scan or share this QR code to receive assets
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col items-center gap-6">
                    {/* QR Image */}
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 20 }} className="bg-card shadow-sm p-4 md:p-5 xl:p-6 border border-border rounded-2xl">
                        <img
                            src={qrUrl}
                            alt={`${coin} wallet QR`}
                            className="size-50 object-contain"
                        />
                    </motion.div>

                    {/* Wallet Address */}
                    <div className="w-full text-center">
                        <p className="mb-1 text-muted-foreground text-xs">
                            Wallet Address
                        </p>

                        <div className="flex justify-center items-center gap-2">
                            <p className="font-mono font-semibold text-foreground break-all tracking-wide">
                                {address}
                            </p>

                            <button onClick={toggleCopy} className="hover:scale-110 transition" aria-label="Copy address">
                                {copy ? (
                                    <CopySuccess size={18} color="#22c55e" />
                                ) : (
                                    <Copy size={18} className="cursor-pointer" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex sm:flex-row flex-col gap-3 w-full">
                        <Button variant="secondary" className="flex gap-2 sm:w-1/2" onClick={handleDownload}>
                            <Download className="size-4" />
                            Download QR
                        </Button>

                        <Button onClick={handleShare} className="flex gap-2 sm:w-1/2">
                            <Share2 className="size-4" />
                            Share Address
                        </Button>
                    </div>

                    <p className="text-yellow-500 text-xs text-center leading-relaxed">
                        Anyone with this QR code or wallet address can send you assets.
                        Do not share with untrusted sources.
                    </p>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default External;
