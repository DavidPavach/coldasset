import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

// Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Icons
import { Download, Share, PlusSquare, CheckCircle2, WifiOff, MoreVertical, Zap } from "lucide-react";
import { Home, Apple, Chrome, NotificationBing, Monitor, Mobile, ShieldSecurity } from "iconsax-reactjs";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

function isIos(): boolean {
  const ua = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(ua);
}

function isSafari(): boolean {
  const ua = window.navigator.userAgent.toLowerCase();
  const isAppleWebKit = ua.includes("applewebkit");
  const isChrome = ua.includes("crios") || ua.includes("chrome");
  const isFirefox = ua.includes("fxios");
  return isAppleWebKit && !isChrome && !isFirefox;
}

function isStandalone(): boolean {
  // display-mode works on most modern browsers
  const displayModeStandalone = window.matchMedia?.("(display-mode: standalone)")?.matches ?? false;

  // iOS Safari supports navigator.standalone
  const nav = window.navigator as unknown as { standalone?: boolean };
  const iosStandalone = typeof nav.standalone === "boolean" ? nav.standalone : false;

  return displayModeStandalone || iosStandalone;
}

export default function Installation() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  const platform = useMemo(() => {
    const ios = isIos();
    const safari = isSafari();
    const android = /android/i.test(window.navigator.userAgent);
    const desktop = !ios && !android;
    return { ios, safari, android, desktop };
  }, []);

  useEffect(() => {
    setIsInstalled(isStandalone());

    const handleBeforeInstall = (e: Event) => {
      // Chromium only. iOS Safari won't fire this.
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall as EventListener);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall as EventListener);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") setIsInstalled(true);

    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  const showInstallButton = !isInstalled && isInstallable;
  const showIosA2HS = !isInstalled && platform.ios && platform.safari && !isInstallable;

  const pwaFeatures = [
    { icon: WifiOff, title: "Offline Access", description: "Access your wallet data even without internet" },
    { icon: Zap, title: "Lightning Fast", description: "Near-instant loading with cached resources" },
    { icon: NotificationBing, title: "Push Notifications", description: "Get alerts for transactions and price changes" },
    { icon: Home, title: "Home Screen", description: "Launch directly from your device like a native app" },
  ];

  const iosSteps = [
    { step: 1, title: "Open in Safari", description: "Make sure you're viewing Cold Asset in Safari browser" },
    { step: 2, title: "Tap Share Button", description: "Tap the share icon at the bottom of the screen", icon: Share },
    { step: 3, title: "Add to Home Screen", description: "Scroll down and tap 'Add to Home Screen'", icon: PlusSquare },
    { step: 4, title: "Confirm Installation", description: "Tap 'Add' in the top right corner" },
  ];

  const androidSteps = [
    { step: 1, title: "Open in Chrome", description: "Make sure you're viewing Cold Asset in Chrome browser" },
    { step: 2, title: "Tap Menu", description: "Tap the three dots in the top right corner", icon: MoreVertical },
    { step: 3, title: "Install App", description: "Tap 'Install app' or 'Add to Home screen'" },
    { step: 4, title: "Confirm Installation", description: "Tap 'Install' in the popup dialog" },
  ];

  const desktopSteps = [
    { step: 1, title: "Open in Chrome/Edge", description: "Make sure you're using Chrome, Edge, or Brave browser" },
    { step: 2, title: "Look for Install Icon", description: "Find the install icon in the address bar or menu" },
    { step: 3, title: "Click Install", description: "Click 'Install' in the popup dialog" },
    { step: 4, title: "Launch from Desktop", description: "Find Cold Asset in your applications" },
  ];

  const faqs = [
    {
      question: "What is a PWA?",
      answer:
        "A Progressive Web App (PWA) is a web app that can be installed, works offline with caching, and feels closer to a native app while still being delivered through the web.",
    },
    {
      question: "Why don’t I see the Install button on iPhone?",
      answer:
        "iOS Safari does not support the Chromium install prompt. On iPhone/iPad you install via Safari → Share → Add to Home Screen.",
    },
    {
      question: "Can I uninstall it?",
      answer:
        "Yes. On mobile, long-press the icon and remove it. On desktop, uninstall it from your browser’s installed apps list.",
    },
    {
      question: "Will it work offline?",
      answer:
        "If you cache the app shell and key pages, the app can open offline. Live network actions still require connectivity.",
    },
  ];

  return (
    <div>
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="top-32 right-1/4 absolute bg-primary/10 blur-3xl rounded-full size-96" />

        <div className="z-10 relative mx-auto px-4 md:px-5 xl:px-6 container">
          <motion.div className="mx-auto max-w-6xl text-center" initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge variant="outline"
              className="bg-primary/5 mb-6 px-4 py-2 border-primary/30 text-[11px] md:text-xs xl:text-sm">
              <Download className="mr-2 size-4 text-primary" />
              Progressive Web App
            </Badge>

            <h1 className="mb-6 font-bold text-5xl md:text-6xl xl:text-7xl tracking-tight">Install Cold Asset</h1>

            <p className="mx-auto mb-10 max-w-2xl text-muted-foreground text-base md:text-lg xl:text-xl leading-relaxed">
              Works on any device. Chromium browsers can install instantly. iOS installs via “Add to Home Screen”.
            </p>

            {isInstalled ? (
              <motion.div className="inline-flex items-center gap-3 bg-green-100 px-6 py-2 rounded-2xl text-green-800"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <CheckCircle2 className="size-6" />
                <span className="font-semibold">Cold Asset is installed on this device!</span>
              </motion.div>
            ) : showInstallButton ? (
              <Button size="lg" onClick={handleInstallClick}
                className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 px-10 py-7 rounded-xl text-primary-foreground text-sm md:text-base xl:text-lg">
                <Download className="mr-3 size-6" />
                Install Now
              </Button>
            ) : showIosA2HS ? (
              <p className="text-muted-foreground">
                iOS Safari installs via <span className="font-semibold">Share → Add to Home Screen</span> (see iPhone/iPad
                tab below).
              </p>
            ) : (
              <p className="text-muted-foreground">Follow the instructions below to install on your device.</p>
            )}
          </motion.div>
        </div>
      </section>

      <section className="bg-muted/30 py-20">
        <div className="mx-auto px-4 md:px-5 xl:px-6 container">
          <motion.div className="mb-12 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="mb-4 font-bold text-2xl md:text-3xl xl:text-4xl">Why Install the WebApp?</h2>
            <p className="mx-auto max-w-xl text-muted-foreground">Experience Cold Asset like a native app</p>
          </motion.div>

          <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-4 mx-auto max-w-5xl">
            {pwaFeatures.map((feature, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <Card className="bg-card hover:shadow-lg border-border h-full text-center transition-shadow">
                  <CardContent className="p-4 md:p-5 xl:p-6">
                    <div className="flex justify-center items-center bg-primary/10 mx-auto mb-4 rounded-2xl size-10 md:size-12 xl:size-14">
                      <feature.icon className="size-5 md:size-6 xl:size-7 text-primary" />
                    </div>
                    <h3 className="mb-2 font-semibold">{feature.title}</h3>
                    <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto px-4 md:px-5 xl:px-6 container">
          <motion.div className="mb-12 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="mb-4 font-bold text-2xl md:text-3xl xl:text-4xl">Installation Guide</h2>
            <p className="mx-auto max-w-xl text-muted-foreground">Select your device type</p>
          </motion.div>

          <Tabs defaultValue="ios" className="mx-auto max-w-6xl">
            <TabsList className="grid grid-cols-3 bg-muted mb-12 px-1 rounded-xl w-full">
              <TabsTrigger value="ios" className="data-[state=active]:bg-card rounded-lg">
                <Apple className="mr-0.5 size-5" />
                iPhone/iPad
              </TabsTrigger>
              <TabsTrigger value="android" className="data-[state=active]:bg-card rounded-lg">
                <Mobile className="mr-0.5 size-5" />
                Android
              </TabsTrigger>
              <TabsTrigger value="desktop" className="data-[state=active]:bg-card rounded-lg">
                <Monitor className="mr-0.5 size-5" />
                Desktop
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ios">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Apple className="size-6" />
                    iOS Installation (Safari Required)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {iosSteps.map((step, index) => (
                      <motion.div key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="flex items-start gap-6 bg-muted/50 p-2 md:p-3 xl:p-4 rounded-xl">
                        <div className="flex justify-center items-center bg-primary rounded-full size-12 font-bold text-primary-foreground text-sm md:text-base xl:text-lg shrink-0">
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <h4 className="mb-1 font-semibold">{step.title}</h4>
                          <p className="text-muted-foreground">{step.description}</p>
                        </div>
                        {step.icon ? (
                          <div className="flex justify-center items-center bg-card border border-border rounded-lg size-10">
                            <step.icon className="size-5 text-primary" />
                          </div>
                        ) : null}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="android">
              <Card className="pt-0 border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Chrome className="size-6" />
                    Android Installation (Chrome Recommended)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {androidSteps.map((step, index) => (
                      <motion.div key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }} className="flex items-start gap-6 bg-muted/50 p-4 rounded-xl">
                        <div className="flex justify-center items-center bg-primary rounded-full size-12 font-bold text-primary-foreground text-sm md:text-base xl:text-lg shrink-0">
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <h4 className="mb-1 font-semibold">{step.title}</h4>
                          <p className="text-muted-foreground">{step.description}</p>
                        </div>
                        {step.icon ? (
                          <div className="flex justify-center items-center bg-card border border-border rounded-lg size-10">
                            <step.icon className="size-5 text-primary" />
                          </div>
                        ) : null}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="desktop">
              <Card className="pt-0 border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Monitor className="size-6" />
                    Desktop Installation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {desktopSteps.map((step, index) => (
                      <motion.div key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }} className="flex items-start gap-6 bg-muted/50 p-4 rounded-xl">
                        <div className="flex justify-center items-center bg-primary rounded-full size-12 font-bold text-primary-foreground text-sm md:text-base xl:text-lg shrink-0">
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <h4 className="mb-1 font-semibold">{step.title}</h4>
                          <p className="text-muted-foreground">{step.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto px-4 md:px-5 xl:px-6 container">
          <div className="mx-auto max-w-3xl">
            <motion.div className="mb-12 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <h2 className="mb-4 font-bold text-2xl md:text-3xl xl:text-4xl">Frequently Asked Questions</h2>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-card px-6 border border-border rounded-xl">
                  <AccordionTrigger className="py-6 font-semibold text-left hover:no-underline">{faq.question}</AccordionTrigger>
                  <AccordionContent className="pb-6 text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section className="bg-linear-to-br from-foreground to-foreground/90 py-20">
        <div className="mx-auto px-4 md:px-5 xl:px-6 text-center container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <ShieldSecurity className="mx-auto mb-6 size-16 text-primary" />
            <h2 className="mb-6 font-bold text-background text-3xl md:text-4xl xl:text-5xl">Your Security, Everywhere</h2>
            <p className="mx-auto mb-10 max-w-2xl text-background/70 text-base md:text-lg xl:text-xl">
              Install Cold Asset and take it anywhere.
            </p>
            {showInstallButton ? (
              <Button size="lg" onClick={handleInstallClick}
                className="bg-primary hover:bg-primary/90 px-10 py-7 rounded-4xl text-primary-foreground text-sm md:text-base xl:text-lg">
                <Download className="mr-3 size-6" />
                Install Cold Asset Now
              </Button>
            ) : null}
          </motion.div>
        </div>
      </section>
    </div>
  );
}