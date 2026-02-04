import { motion } from "framer-motion";
import { QRCodeCanvas } from "qrcode.react";
import { useRef } from "react";

// Hooks
import { useUserDetails } from "@/services/queries.service";

// Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ErrorScreen } from "@/components/ErrorComponents";

// Icons
import { Download, Share2 } from "lucide-react";

const AccountQRCodePage = ({ coin }: { coin: string }) => {

    const { data, isLoading, isFetching, isError, refetch } = useUserDetails();
    const qrRef = useRef<HTMLCanvasElement | null>(null);

    const loading = isLoading || isFetching;
    const accountId = data?.data?.accountId || "";

    const handleDownload = () => {
        if (!qrRef.current) return;

        const url = qrRef.current.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = url;
        a.download = `ColdAsset-${accountId}.png`;
        a.click();
    };

    const handleShare = async () => {
        if (!navigator.share) {
            alert("Sharing is not supported on this device.");
            return;
        }

        try {
            await navigator.share({
                title: "My Cold Asset Account ID",
                text: `Here is my Cold Asset account ID: ${accountId}`,
            });
        } catch (err) {
            console.error("Share cancelled", err);
        }
    };

    // Loading State
    if (loading) {
        return (
            <main className="mx-auto mt-20 max-w-md">
                <Card>
                    <CardHeader>
                        <CardTitle>Loading QR Code</CardTitle>
                        <CardDescription>Please wait a moment…</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 animate-pulse">
                        <div className="bg-muted mx-auto rounded-xl w-48 h-48" />
                        <div className="bg-muted mx-auto rounded w-40 h-4" />
                        <div className="flex gap-3">
                            <div className="bg-muted rounded w-full h-10" />
                            <div className="bg-muted rounded w-full h-10" />
                        </div>
                    </CardContent>
                </Card>
            </main>
        );
    }

    // Error State
    if (isError) {
        return (
            <ErrorScreen
                variant="card"
                type="500"
                title="Couldn't fetch your account details"
                onRetry={refetch}
            />
        );
    }

    return (
        <motion.main className="mx-auto mt-20 px-4 max-w-xl" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="shadow-xl">
                <CardHeader className="text-center">
                    <CardTitle className="capitalize">Your {coin} QR Code</CardTitle>
                    <CardDescription>
                        Scan or share this QR code to receive assets
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col items-center gap-6">
                    {/* QR */}
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }} className="bg-card shadow-sm p-6 border border-border rounded-2xl">

                        <QRCodeCanvas value={accountId} size={200} level="H" marginSize={1} ref={qrRef} />
                    </motion.div>

                    {/* Account ID */}
                    <div className="text-center">
                        <p className="mb-1 text-muted-foreground text-xs">Your Account ID</p>
                        <p className="font-mono font-semibold text-foreground tracking-wide">
                            {accountId}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex sm:flex-row flex-col gap-3 w-full">
                        <Button variant="secondary" className="sm:w-1/2" onClick={handleDownload}>
                            <Download className="size-4" />
                            Download
                        </Button>

                        <Button onClick={handleShare} className="sm:w-1/2">
                            <Share2 className="size-4" />
                            Share
                        </Button>
                    </div>


                    <p className="text-yellow-500 text-xs text-center leading-relaxed">
                        Anyone with this QR code or Account ID can send you assets. Do not
                        share with untrusted sources.
                    </p>
                </CardContent>
            </Card>
        </motion.main>
    );
};

export default AccountQRCodePage;
