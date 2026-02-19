import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from '@tanstack/react-router';

// Components
import { Badge } from "@/components/ui/badge";

// Icons
import { FileText, ChevronRight, Calendar, AlertTriangle } from 'lucide-react';


const sections = [
    {
        id: "acceptance",
        title: "Acceptance of Terms",
        content: [
            {
                subtitle: "Agreement to Terms",
                text: "By accessing or using Cold Asset (the \"Service\"), you agree to be bound by these Terms of Service. If you do not agree to all of these terms, you are prohibited from using or accessing our Service."
            },
            {
                subtitle: "Age Requirement",
                text: "You must be at least 18 years of age to use Cold Asset. By using the Service, you represent and warrant that you meet this requirement. Users under 18 may not create accounts or access the Service."
            },
            {
                subtitle: "Changes to Terms",
                text: "Cold Asset reserves the right to modify these terms at any time. We will provide at least 30 days' notice for material changes via email or in-app notification. Continued use of the Service after changes constitutes acceptance of the new terms."
            }
        ]
    },
    {
        id: "service-description",
        title: "Description of Service",
        content: [
            {
                subtitle: "What Cold Asset Provides",
                text: "Cold Asset is a non-custodial cryptocurrency wallet application that enables you to store, send, receive, and manage digital assets. We provide the software interface; you maintain full custody of your private keys and assets."
            },
            {
                subtitle: "Non-Custodial Nature",
                text: "Cold Asset is a non-custodial wallet. This means we never hold, control, or have access to your cryptocurrency. You are solely responsible for safeguarding your private keys and recovery phrase. Loss of these credentials means permanent loss of access to your assets."
            },
            {
                subtitle: "Service Availability",
                text: "We strive for 99.9% uptime but do not guarantee uninterrupted access. The Service may be temporarily unavailable due to maintenance, updates, or circumstances beyond our control. Blockchain networks operate independently of Cold Asset."
            }
        ]
    },
    {
        id: "user-responsibilities",
        title: "User Responsibilities",
        content: [
            {
                subtitle: "Security of Credentials",
                text: "You are solely responsible for maintaining the security of your recovery phrase, private keys, and account credentials. Cold Asset cannot recover lost recovery phrases or private keys. Never share these with anyone, including Cold Asset support staff."
            },
            {
                subtitle: "Compliance with Laws",
                text: "You agree to use Cold Asset only for lawful purposes and in accordance with all applicable local, national, and international laws, including those governing cryptocurrency transactions, capital gains, and financial reporting in your jurisdiction."
            },
            {
                subtitle: "Prohibited Activities",
                text: "You may not use Cold Asset for money laundering, terrorist financing, tax evasion, sanctions violations, or any other illegal activity. We cooperate fully with law enforcement and regulatory authorities as required by law."
            },
            {
                subtitle: "Accurate Information",
                text: "You agree to provide accurate, current, and complete information when using the Service and to update such information to keep it accurate. You are responsible for all activity that occurs under your account."
            }
        ]
    },
    {
        id: "risks",
        title: "Risks & Disclaimers",
        content: [
            {
                subtitle: "Cryptocurrency Risks",
                text: "Cryptocurrency values are highly volatile and speculative. You may lose some or all of your investment. Cold Asset does not provide investment advice, and nothing in this app constitutes financial advice. Always do your own research."
            },
            {
                subtitle: "Transaction Irreversibility",
                text: "Blockchain transactions are irreversible. Once a transaction is broadcast to a network, it cannot be cancelled or reversed. Always verify recipient addresses carefully before confirming any transaction."
            },
            {
                subtitle: "Smart Contract Risk",
                text: "Interactions with DeFi protocols and smart contracts carry additional risks including bugs, exploits, and protocol failures. Cold Asset is not responsible for losses incurred through third-party smart contract interactions."
            },
            {
                subtitle: "Regulatory Risk",
                text: "The regulatory environment for cryptocurrency is rapidly evolving. Changes in laws or regulations may adversely affect your ability to use Cold Asset or the value of your digital assets."
            }
        ]
    },
    {
        id: "intellectual-property",
        title: "Intellectual Property",
        content: [
            {
                subtitle: "Ownership",
                text: "Cold Asset and its original content, features, and functionality are owned by Cold Asset Inc. and are protected by international copyright, trademark, patent, and other intellectual property laws."
            },
            {
                subtitle: "License to Use",
                text: "We grant you a limited, non-exclusive, non-transferable, revocable license to use the Cold Asset application for your personal, non-commercial purposes, subject to these Terms."
            },
            {
                subtitle: "Open Source",
                text: "Certain components of Cold Asset are open source and subject to their respective licenses. Our open source repository is available on GitHub. Commercial use of our open source components is subject to separate licensing terms."
            }
        ]
    },
    {
        id: "limitation-liability",
        title: "Limitation of Liability",
        content: [
            {
                subtitle: "Disclaimer of Warranties",
                text: "The Service is provided on an \"AS IS\" and \"AS AVAILABLE\" basis without any warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability or fitness for a particular purpose."
            },
            {
                subtitle: "Liability Cap",
                text: "To the maximum extent permitted by law, Cold Asset's total liability to you for any damages shall not exceed the greater of $100 USD or the fees you paid to Cold Asset in the 12 months preceding the claim."
            },
            {
                subtitle: "Exclusions",
                text: "Cold Asset shall not be liable for: loss of cryptocurrency due to lost credentials; losses from market volatility; third-party service failures; unauthorized access resulting from your failure to maintain security; or any indirect, incidental, or consequential damages."
            }
        ]
    },
    {
        id: "termination",
        title: "Termination",
        content: [
            {
                subtitle: "Your Right to Terminate",
                text: "You may stop using Cold Asset at any time. As a non-custodial wallet, your assets remain accessible through other compatible wallets using your recovery phrase, even after ceasing to use Cold Asset."
            },
            {
                subtitle: "Our Right to Terminate",
                text: "We may terminate or suspend your access immediately, without prior notice, if you breach these Terms. Upon termination, your right to use the Service ceases immediately."
            }
        ]
    },
    {
        id: "governing-law",
        title: "Governing Law & Disputes",
        content: [
            {
                subtitle: "Governing Law",
                text: "These Terms shall be governed by the laws of the State of Delaware, United States, without regard to conflict of law provisions."
            },
            {
                subtitle: "Dispute Resolution",
                text: "Any disputes arising from these Terms or use of the Service shall first be attempted to be resolved through good-faith negotiation. If unresolved, disputes shall be submitted to binding arbitration in accordance with AAA Commercial Arbitration Rules."
            },
            {
                subtitle: "Class Action Waiver",
                text: "You agree to resolve disputes with Cold Asset on an individual basis and waive any right to participate in class action lawsuits or class-wide arbitration."
            }
        ]
    }
];

export default function TermsOfService() {
    const [activeSection, setActiveSection] = useState(sections[0].id);

    return (
        <div>
            {/* Hero */}
            <section className="relative py-20 border-border border-b overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-accent/5" />
                <div className="z-10 relative mx-auto px-4 md:px-5 xl:px-6 container">
                    <motion.div className="max-w-3xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <Badge variant="outline" className="bg-primary/5 mb-4 px-4 py-2 border-primary/30">
                            <FileText className="mr-2 size-4 text-primary" />
                            Legal
                        </Badge>
                        <h1 className="mb-4 font-bold text-foreground text-3xl md:text-4xl xl:text-6xl">Terms of Service</h1>
                        <p className="mb-4 text-muted-foreground text-sm md:text-base xl:text-lg">
                            Please read these terms carefully before using Cold Asset. They govern your use of our cryptocurrency wallet services.
                        </p>
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-2 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                                <Calendar className="size-4" />
                                <span>Last updated: February 1, 2026</span>
                            </div>
                            <div className="flex items-center gap-2 bg-amber-50 px-3 py-1 border border-amber-200 rounded-full text-[11px] text-amber-600 md:text-xs xl:text-sm">
                                <AlertTriangle className="size-3.5" />
                                <span>Non-custodial wallet — you control your keys</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <div className="mx-auto px-4 md:px-5 xl:px-6 py-20 container">
                <div className="gap-12 grid lg:grid-cols-4 mx-auto max-w-6xl">
                    {/* Sidebar */}
                    <aside className="lg:col-span-1">
                        <div className="top-8 sticky space-y-1">
                            <p className="mb-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Contents</p>
                            {sections.map((section) => (
                                <a key={section.id} href={`#${section.id}`}
                                    onClick={() => setActiveSection(section.id)}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-[11px] md:text-xs xl:text-sm transition-all ${activeSection === section.id
                                        ? 'bg-primary/10 text-primary font-medium'
                                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                        }`}>
                                    <ChevronRight className="size-3 shrink-0" />
                                    {section.title}
                                </a>
                            ))}
                        </div>
                    </aside>

                    {/* Main */}
                    <main className="space-y-16 lg:col-span-3">
                        {sections.map((section, index) => (
                            <motion.section key={section.id} id={section.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ delay: index * 0.05 }} onViewportEnter={() => setActiveSection(section.id)}>
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
                                For related policies, see our{' '}
                                <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                                {' '}and{' '}
                                <Link to="/compliance" className="text-primary hover:underline">Compliance</Link> pages.
                            </p>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}