import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from '@tanstack/react-router';
import { cn } from "@/lib/utils";

// Hooks
import { useUserDetails } from '@/services/queries.service';

// Components
import { Button } from "@/components/ui/button";
import PassphraseWord from './PassphraseWord';
import StepIndicator from './StepIndicator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import PassphraseLoader from './Loader';
import { ErrorScreen } from '@/components/ErrorComponents';

// Icons
import { Download, AlertTriangle, ArrowRight, Shield, Eye, EyeOff, Copy, Check } from 'lucide-react';

export default function PassphraseDisplay() {

  const { data, isLoading, isFetching, isError, refetch } = useUserDetails();

  const [isRevealed, setIsRevealed] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);


  const loading = isLoading || isFetching;

  if (loading) {
    return <PassphraseLoader />;
  }

  if (isError) {
    return (
      <ErrorScreen
        variant="fullscreen"
        type="500"
        title={`Couldn't fetch your passphrase details, kindly try again later`}
        onRetry={refetch}
      />
    );
  }

  const userPassphrase = data?.data.passPhrase || [];

  // Functions
  const handleCopy = async () => {
    const text = userPassphrase.map((word, i) => `${i + 1}. ${word}`).join('\n');
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = async () => {
    setIsDownloading(true);

    // Create PDF content
    const pdfContent = `
SECURE PASSPHRASE BACKUP
========================
Generated: ${new Date().toLocaleDateString()}

⚠️ IMPORTANT: Store this document securely!
   Do not share these phrases with anyone.

YOUR 12-WORD RECOVERY PHRASE:
-----------------------------
${userPassphrase.map((word, i) => `${String(i + 1).padStart(2, '0')}. ${word}`).join('\n')}

-----------------------------
Keep this document in a safe place.
You will need these words in exact order to recover your account.
    `.trim();

    // Create blob and download
    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `passphrase-backup-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setTimeout(() => setIsDownloading(false), 1000);
  };

  return (
    <div className="min-h-dvh">
      <div className="mx-auto px-4 py-8 md:py-12 max-w-2xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <div className="inline-flex justify-center items-center bg-primary/10 mb-4 rounded-2xl size-12 md:size-14 xl:size-16">
            <Shield className="size-6 md:size-7 xl:size-8 text-primary" />
          </div>
          <h1 className="mb-2 font-bold text-foreground text-xl md:text-2xl xl:text-3xl">
            Your Recovery Phrase
          </h1>
          <p className="text-muted-foreground">
            Write down these 12 words in order and store them safely
          </p>
        </motion.div>

        {/* Step Indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-8">
          <StepIndicator currentStep={1} />
        </motion.div>

        {/* Warning Alert */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Alert className="bg-amber-50/50 dark:bg-amber-950/20 mb-6 border-amber-500/50">
            <AlertTriangle className="size-4 text-amber-600" />
            <AlertTitle className="font-semibold text-amber-800 dark:text-amber-200">
              Critical Security Warning
            </AlertTitle>
            <AlertDescription className="text-amber-700 dark:text-amber-300">
              <ul className="space-y-1 mt-2 list-disc list-inside">
                <li>Never share these words with anyone</li>
                <li>Store them offline in a secure location</li>
                <li>Anyone with these words can access your account</li>
                <li>We will never ask for your recovery phrase</li>
              </ul>
            </AlertDescription>
          </Alert>
        </motion.div>

        {/* Passphrase Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="shadow-lg border-border">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-sm md:text-base xl:text-lg">Recovery Phrase</CardTitle>
                  <CardDescription className='mt-1 text-[11px] md:text-xs xl:text-sm'>12 words in sequence</CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setIsRevealed(!isRevealed)} className="text-muted-foreground hover:text-foreground">
                  {isRevealed ? (
                    <><EyeOff className="mr-2 size-4" /> Hide</>
                  ) : (
                    <><Eye className="mr-2 size-4" /> Show</>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className={cn(
                "gap-3 grid grid-cols-2 md:grid-cols-3 transition-all duration-300",
                !isRevealed && "blur-md select-none pointer-events-none"
              )}>
                {userPassphrase.map((word, index) => (
                  <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + index * 0.05 }}>
                    <PassphraseWord index={index + 1} word={word} />
                  </motion.div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex sm:flex-row flex-col gap-3 mt-6 pt-6 border-border border-t">
                <Button variant="outline" onClick={handleCopy} className="flex-1">
                  {copied ? (
                    <><Check className="mr-2 size-4" /> Copied!</>
                  ) : (
                    <><Copy className="mr-2 size-4" /> Copy to Clipboard</>
                  )}
                </Button>
                <Button onClick={handleDownloadPDF} disabled={isDownloading} className="flex-1">
                  <Download className={cn("mr-2 size-4", isDownloading && "animate-bounce")} />
                  {isDownloading ? 'Downloading...' : 'Download as PDF'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Continue Button */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-8">
          <Link to={"/passphrase-verification"}>
            <Button className="shadow-lg shadow-primary/25 hover:shadow-primary/40 w-full font-semibold transition-all duration-300">
              I've Saved My Phrase
              <ArrowRight className="ml-2 size-5" />
            </Button>
          </Link>
          <p className="mt-3 text-muted-foreground text-xs text-center">
            You'll need to verify your phrase on the next step
          </p>
        </motion.div>
      </div>
    </div>
  );
}