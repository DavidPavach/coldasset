import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from '@tanstack/react-router';

// Components
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

// Icons
import { Cookie, ChevronRight, Calendar, CheckCircle2, XCircle, Info } from 'lucide-react';


const cookieTypes = [
    {
        id: "essential",
        name: "Essential Cookies",
        required: true,
        description: "These cookies are strictly necessary for the Service to function. They cannot be disabled.",
        examples: [
            { name: "session_id", purpose: "Maintains your login session", duration: "Session" },
            { name: "csrf_token", purpose: "Protects against cross-site request forgery", duration: "Session" },
            { name: "wallet_pref", purpose: "Remembers your wallet display preferences", duration: "1 year" },
            { name: "security_challenge", purpose: "Used during authentication", duration: "30 minutes" }
        ]
    },
    {
        id: "functional",
        name: "Functional Cookies",
        required: false,
        description: "These cookies enable enhanced functionality and personalization, such as remembering your preferred currency display.",
        examples: [
            { name: "currency_pref", purpose: "Remembers your preferred fiat currency", duration: "1 year" },
            { name: "theme_pref", purpose: "Saves your dark/light mode setting", duration: "1 year" },
            { name: "language_pref", purpose: "Remembers your language selection", duration: "1 year" }
        ]
    },
    {
        id: "analytics",
        name: "Analytics Cookies",
        required: false,
        description: "Help us understand how you interact with Cold Asset so we can improve the experience. All data is anonymized.",
        examples: [
            { name: "ca_analytics", purpose: "Tracks anonymized usage patterns", duration: "90 days" },
            { name: "feature_usage", purpose: "Records which features are used most", duration: "30 days" },
            { name: "perf_metrics", purpose: "Measures app performance", duration: "7 days" }
        ]
    },
    {
        id: "marketing",
        name: "Marketing Cookies",
        required: false,
        description: "Used to deliver relevant information about Cold Asset features. We do not serve third-party advertising.",
        examples: [
            { name: "campaign_ref", purpose: "Tracks referral sources for campaign attribution", duration: "30 days" },
            { name: "feature_promo", purpose: "Controls which feature announcements you see", duration: "30 days" }
        ]
    }
];

export default function CookiePolicy() {

    const [activeSection, setActiveSection] = useState<string>("overview");
    const [preferences, setPreferences] = useState<Record<string, boolean>>({
        functional: true,
        analytics: false,
        marketing: false
    });
    const [saved, setSaved] = useState<boolean>(false);

    const handleSave = () => {
        localStorage.setItem('cookie_preferences', JSON.stringify({ ...preferences, essential: true }));
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div>
            {/* Hero */}
            <section className="relative py-20 border-border border-b overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-accent/5" />
                <div className="z-10 relative mx-auto px-4 md:px-5 xl:px-6 container">
                    <motion.div className="max-w-6xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <Badge variant="outline" className="bg-primary/5 mb-4 px-4 py-2 border-primary/30">
                            <Cookie className="mr-2 size-4 text-primary" />
                            Legal
                        </Badge>
                        <h1 className="mb-4 font-bold text-foreground text-3xl md:text-4xl xl:text-6xl">Cookie Policy</h1>
                        <p className="mb-4 text-muted-foreground text-sm md:text-base xl:text-lg">
                            We use cookies sparingly and only when necessary. Here's exactly what we use and why.
                        </p>
                        <div className="flex items-center gap-2 text-muted-foreground text-sm">
                            <Calendar className="size-4" />
                            <span>Last updated: February 1, 2026</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            <div className="mx-auto px-4 md:px-5 xl:px-6 py-20 container">
                <div className="gap-12 grid lg:grid-cols-4 mx-auto max-w-6xl">
                    {/* Sidebar */}
                    <aside className="lg:col-span-1">
                        <div className="top-8 sticky space-y-1">
                            <p className="mb-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Contents</p>
                            {["overview", ...cookieTypes.map(c => c.id), "manage-preferences"].map((id) => {
                                const label = id === "overview" ? "Overview" : id === "manage-preferences" ? "Manage Preferences"
                                    : cookieTypes.find(c => c.id === id)?.name;
                                return (
                                    <a key={id} href={`#${id}`}
                                        onClick={() => setActiveSection(id)}
                                        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm transition-all ${activeSection === id
                                            ? 'bg-primary/10 text-primary font-medium'
                                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                            }`}>
                                        <ChevronRight className="size-3 shrink-0" />
                                        {label}
                                    </a>
                                );
                            })}
                        </div>
                    </aside>

                    {/* Main */}
                    <main className="space-y-20 lg:col-span-3">
                        {/* Overview */}
                        <motion.section id="overview" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} onViewportEnter={() => setActiveSection("overview")}>
                            <h2 className="mb-6 pb-3 border-border border-b font-bold text-foreground text-lg md:text-xl xl:text-2xl">Overview</h2>
                            <div className="space-y-4">
                                <p className="text-muted-foreground leading-relaxed">
                                    Cold Asset uses cookies and similar tracking technologies to operate our Service. Unlike many financial applications, we take a minimal approach to cookies — we only use what is technically necessary or what provides a meaningful improvement to your experience.
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    We never use cookies to serve third-party advertisements or to track your activity across other websites. As a cryptocurrency wallet, we take your privacy seriously.
                                </p>
                                <div className="gap-4 grid md:grid-cols-2 mt-6">
                                    <div className="bg-green-50 p-4 border border-green-200 rounded-xl">
                                        <div className="flex items-center gap-2 mb-2">
                                            <CheckCircle2 className="size-5 text-green-600" />
                                            <span className="font-medium text-green-800">We DO use cookies for</span>
                                        </div>
                                        <ul className="space-y-1 text-[11px] text-green-700 md:text-xs xl:text-sm">
                                            <li>• Keeping you logged in securely</li>
                                            <li>• Remembering your preferences</li>
                                            <li>• Anonymized app analytics</li>
                                            <li>• Security protection</li>
                                        </ul>
                                    </div>
                                    <div className="bg-red-50 p-4 border border-red-200 rounded-xl">
                                        <div className="flex items-center gap-2 mb-2">
                                            <XCircle className="size-5 text-red-600" />
                                            <span className="font-medium text-red-800">We do NOT use cookies for</span>
                                        </div>
                                        <ul className="space-y-1 text-[11px] text-red-700 md:text-xs xl:text-sm">
                                            <li>• Third-party advertising</li>
                                            <li>• Cross-site tracking</li>
                                            <li>• Selling data to brokers</li>
                                            <li>• Profiling financial behaviour</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </motion.section>

                        {/* Cookie Types */}
                        {cookieTypes.map((type, index) => (
                            <motion.section key={type.id} id={type.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ delay: index * 0.05 }} onViewportEnter={() => setActiveSection(type.id)}>
                                <div className="flex justify-between items-center mb-6 pb-3 border-border border-b">
                                    <h2 className="font-bold text-foreground text-lg md:text-xl xl:text-2xl">{type.name}</h2>
                                    <Badge variant={type.required ? "default" : "outline"} className={type.required ? "bg-primary text-primary-foreground" : ""}>
                                        {type.required ? "Always Active" : "Optional"}
                                    </Badge>
                                </div>
                                <p className="mb-6 text-muted-foreground">{type.description}</p>
                                <div className="border border-border rounded-xl overflow-hidden">
                                    <table className="w-full text-[11px] md:text-xs xl:text-sm">
                                        <thead>
                                            <tr className="bg-muted/50 border-border border-b">
                                                <th className="px-4 py-3 font-medium text-foreground text-left">Cookie Name</th>
                                                <th className="px-4 py-3 font-medium text-foreground text-left">Purpose</th>
                                                <th className="px-4 py-3 font-medium text-foreground text-left">Duration</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {type.examples.map((cookie, i) => (
                                                <tr key={i} className={i !== type.examples.length - 1 ? "border-b border-border" : ""}>
                                                    <td className="px-4 py-3 font-mono text-primary text-xs">{cookie.name}</td>
                                                    <td className="px-4 py-3 text-muted-foreground">{cookie.purpose}</td>
                                                    <td className="px-4 py-3 text-muted-foreground">{cookie.duration}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.section>
                        ))}

                        {/* Manage Preferences */}
                        <motion.section id="manage-preferences" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} onViewportEnter={() => setActiveSection("manage-preferences")} >
                            <h2 className="mb-6 pb-3 border-border border-b font-bold text-foreground text-lg md:text-xl xl:text-2xl">Manage Preferences</h2>
                            <p className="mb-8 text-muted-foreground">Update your cookie preferences below. Changes take effect immediately.</p>

                            <div className="space-y-4">
                                {cookieTypes.map((type) => (
                                    <div key={type.id} className="flex justify-between items-center bg-card p-5 border border-border rounded-xl">
                                        <div>
                                            <p className="font-medium text-foreground">{type.name}</p>
                                            <p className="mt-0.5 text-[11px] text-muted-foreground md:text-xs xl:text-sm">{type.description}</p>
                                        </div>
                                        <div className="ml-4">
                                            {type.required ? (
                                                <div className="flex items-center gap-2 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                                                    <Info className="size-4" />
                                                    <span>Required</span>
                                                </div>
                                            ) : (
                                                <Switch checked={preferences[type.id]}
                                                    onCheckedChange={(val) => setPreferences(p => ({ ...p, [type.id]: val }))}
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center gap-4 mt-6">
                                <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 rounded-xl text-primary-foreground">
                                    {saved ? (
                                        <>
                                            <CheckCircle2 className="mr-2 size-4" />
                                            Saved!
                                        </>
                                    ) : "Save Preferences"}
                                </Button>
                                <Button variant="outline" onClick={() => setPreferences({ functional: false, analytics: false, marketing: false })} className="rounded-xl">
                                    Reject All Optional
                                </Button>
                            </div>
                        </motion.section>

                        <div className="bg-primary/5 p-4 md:p-5 xl:p-6 border border-primary/20 rounded-2xl">
                            <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                                For more on how we protect your data, see our{' '}
                                <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
                            </p>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}