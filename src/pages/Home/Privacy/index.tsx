import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from '@tanstack/react-router';

// Components
import { Badge } from "@/components/ui/badge";

// Icons
import { Shield, ChevronRight, Calendar, Mail } from 'lucide-react';


const sections = [
    {
        id: "information-we-collect",
        title: "Information We Collect",
        content: [
            {
                subtitle: "Account Information",
                text: "When you create a Cold Asset wallet, we collect minimal information necessary to provide our services. This may include your email address for account recovery and security notifications. We do not require government-issued ID for basic wallet functionality."
            },
            {
                subtitle: "Technical Data",
                text: "We automatically collect certain technical information when you use our app, including device type, operating system version, app version, and anonymized usage statistics. This data helps us improve performance and fix bugs."
            },
            {
                subtitle: "Transaction Metadata",
                text: "Cold Asset does not store your private keys or transaction details on our servers. Your blockchain transactions are public by nature of the underlying technology, but we do not log or store transaction history beyond what is visible on the blockchain."
            },
            {
                subtitle: "Support Communications",
                text: "If you contact our support team, we retain records of those communications to assist you and improve our services. You may request deletion of support records at any time."
            }
        ]
    },
    {
        id: "how-we-use-information",
        title: "How We Use Your Information",
        content: [
            {
                subtitle: "Service Delivery",
                text: "We use your information solely to operate, maintain, and improve Cold Asset. This includes processing your requests, providing customer support, and sending security-critical notifications."
            },
            {
                subtitle: "Security & Fraud Prevention",
                text: "Your data may be used to detect and prevent fraudulent activity, unauthorized access attempts, and other security threats to protect your assets and our platform."
            },
            {
                subtitle: "Legal Compliance",
                text: "We may process your information where required by applicable law, regulation, or court order. We will notify you of such requests where legally permitted."
            },
            {
                subtitle: "We Do NOT Sell Your Data",
                text: "Cold Asset will never sell, rent, or trade your personal information to third parties for marketing purposes. Your privacy is fundamental to our business model."
            }
        ]
    },
    {
        id: "data-security",
        title: "Data Security",
        content: [
            {
                subtitle: "Encryption",
                text: "All data transmitted to and from Cold Asset is encrypted using TLS 1.3. Data at rest is encrypted using AES-256. Your private keys are encrypted locally on your device and never transmitted to our servers."
            },
            {
                subtitle: "Zero-Knowledge Architecture",
                text: "Cold Asset is built on a zero-knowledge principle — we are technically incapable of accessing your private keys, recovery phrases, or decrypting your wallet data. You alone control your assets."
            },
            {
                subtitle: "Security Audits",
                text: "We conduct regular third-party security audits and penetration testing. Audit reports are made available publicly on our website. We also operate a responsible disclosure bug bounty program."
            }
        ]
    },
    {
        id: "your-rights",
        title: "Your Privacy Rights",
        content: [
            {
                subtitle: "Access & Portability",
                text: "You have the right to access any personal data we hold about you and receive it in a portable format. Submit a data access request through our support portal."
            },
            {
                subtitle: "Deletion",
                text: "You may request deletion of your personal data at any time. Note that certain data may be retained for legal compliance purposes. Blockchain transaction records cannot be deleted as they are immutable by design."
            },
            {
                subtitle: "GDPR & CCPA Rights",
                text: "If you are located in the European Economic Area or California, you have additional rights under GDPR and CCPA respectively, including the right to object to processing and the right to non-discrimination."
            }
        ]
    },
    {
        id: "third-parties",
        title: "Third-Party Services",
        content: [
            {
                subtitle: "Blockchain Networks",
                text: "Transactions are broadcast to public blockchain networks. This information becomes part of the public blockchain record and is subject to the decentralized nature of those networks."
            },
            {
                subtitle: "Analytics",
                text: "We use privacy-preserving analytics tools that do not track individuals or use cookies. All analytics data is aggregated and anonymized before processing."
            },
            {
                subtitle: "Infrastructure Providers",
                text: "We work with carefully vetted cloud infrastructure providers who process data only on our behalf under strict data processing agreements aligned with applicable privacy laws."
            }
        ]
    },
    {
        id: "contact",
        title: "Contact & Updates",
        content: [
            {
                subtitle: "Privacy Officer",
                text: "For privacy-related inquiries, contact our Data Protection Officer at privacy@coldasset.com. We aim to respond to all privacy requests within 30 days."
            },
            {
                subtitle: "Policy Updates",
                text: "We may update this Privacy Policy from time to time. We will notify you of significant changes via email or in-app notification at least 30 days before they take effect."
            }
        ]
    }
];

export default function PrivacyPolicy() {
    const [activeSection, setActiveSection] = useState(sections[0].id);

    return (
        <div>
            {/* Hero */}
            <section className="relative py-20 border-border border-b overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-accent/5" />
                <div className="z-10 relative mx-auto px-4 md:px-5 xl:px-6 container">
                    <motion.div className="max-w-6xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <Badge variant="outline" className="bg-primary/5 mb-4 px-4 py-2 border-primary/30">
                            <Shield className="mr-2 size-4 text-primary" />
                            Legal
                        </Badge>
                        <h1 className="mb-4 font-bold text-foreground text-3xl md:text-4xl xl:text-6xl">Privacy Policy</h1>
                        <p className="mb-4 text-muted-foreground text-xs md:text-base xl:text-lg">
                            Cold Asset is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your information.
                        </p>
                        <div className="flex items-center gap-2 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                            <Calendar className="size-4" />
                            <span>Last updated: February 1, 2026</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <div className="mx-auto px-4 md:px-5 xl:px-6 py-20 container">
                <div className="gap-12 grid lg:grid-cols-4 mx-auto max-w-6xl">
                    {/* Sidebar Nav */}
                    <aside className="lg:col-span-1">
                        <div className="top-8 sticky space-y-1">
                            <p className="mb-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Contents</p>
                            {sections.map((section) => (
                                <a key={section.id} href={`#${section.id}`}
                                    onClick={() => setActiveSection(section.id)}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm transition-all ${activeSection === section.id
                                        ? 'bg-primary/10 text-primary font-medium'
                                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                        }`}>
                                    <ChevronRight className="size-3 shrink-0" />
                                    {section.title}
                                </a>
                            ))}

                            <div className="bg-muted/50 mt-8 p-4 border border-border rounded-xl">
                                <Mail className="mb-2 size-5 text-primary" />
                                <p className="mb-1 font-medium text-[11px] text-foreground md:text-xs xl:text-sm">Privacy Questions?</p>
                                <a href="mailto:privacy@cold-asset.com" className="text-primary text-xs hover:underline">
                                    privacy@cold-asset.com
                                </a>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="space-y-16 lg:col-span-3">
                        {sections.map((section, index) => (
                            <motion.section key={section.id} id={section.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ delay: index * 0.05 }}
                                onViewportEnter={() => setActiveSection(section.id)}>
                                <h2 className="mb-6 pb-3 border-border border-b font-bold text-foreground text-lg md:text-xl xl:text-2xl">
                                    {section.title}
                                </h2>
                                <div className="space-y-6">
                                    {section.content.map((item, i) => (
                                        <div key={i}>
                                            <h3 className="mb-2 font-semibold text-foreground">{item.subtitle}</h3>
                                            <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.section>
                        ))}

                        <div className="bg-primary/5 p-4 md:p-5 xl:p-6 border border-primary/20 rounded-2xl">
                            <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                                By using Cold Asset, you acknowledge that you have read and understood this Privacy Policy.
                                For related policies, see our{' '}
                                <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
                                {' '}and{' '}
                                <Link to="/cookie" className="text-primary hover:underline">Cookie Policy</Link>.
                            </p>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}