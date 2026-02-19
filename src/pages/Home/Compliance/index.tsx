import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from '@tanstack/react-router';

// Components
import { Badge } from "@/components/ui/badge";

// Icons
import { Scale, ChevronRight, Calendar, Globe, CheckCircle2, ShieldCheck, AlertTriangle, FileText, Building2, Lock } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";


const frameworks = [
    {
        name: "GDPR",
        region: "European Union",
        status: "Compliant",
        description: "Cold Asset fully complies with the General Data Protection Regulation. We implement privacy-by-design principles, maintain a lawful basis for all data processing, and honor all data subject rights including access, deletion, and portability.",
        badges: ["Privacy by Design", "DPA Agreements", "Data Subject Rights"]
    },
    {
        name: "CCPA",
        region: "California, USA",
        status: "Compliant",
        description: "We comply with the California Consumer Privacy Act and the California Privacy Rights Act. California residents may opt out of any data sale (we don't sell data), request deletion, and exercise full CCPA rights through our privacy portal.",
        badges: ["No Data Sale", "Opt-Out Rights", "Non-Discrimination"]
    },
    {
        name: "AML/CFT",
        region: "Global",
        status: "Compliant",
        description: "Cold Asset maintains robust Anti-Money Laundering and Counter-Financing of Terrorism controls. We implement transaction monitoring, risk-based due diligence, and report suspicious activity to appropriate authorities as required by law.",
        badges: ["Transaction Monitoring", "Risk Assessment", "SAR Filing"]
    },
    {
        name: "FATF Travel Rule",
        region: "International",
        status: "Compliant",
        description: "We comply with Financial Action Task Force recommendations regarding the Travel Rule for cryptocurrency transactions. Originator and beneficiary information is transmitted for qualifying transactions as required.",
        badges: ["Travel Rule", "VASP Compliance", "Information Sharing"]
    },
    {
        name: "MiCA",
        region: "European Union",
        status: "In Progress",
        description: "We are actively preparing for full compliance with the EU Markets in Crypto-Assets Regulation framework, which comes into full effect in 2025. We have engaged regulatory counsel and are updating our operations accordingly.",
        badges: ["CASP Registration", "Regulatory Engagement", "Stablecoin Rules"]
    },
    {
        name: "FinCEN / BSA",
        region: "United States",
        status: "Compliant",
        description: "Cold Asset operates in compliance with the Bank Secrecy Act and FinCEN guidance for money services businesses and cryptocurrency wallet providers. We maintain required records and file reports as mandated.",
        badges: ["BSA Compliance", "Record Keeping", "CTR Filing"]
    }
];

const certifications = [
    { icon: ShieldCheck, title: "SOC 2 Type II", body: "AICPA", description: "Security, availability, and confidentiality controls audited annually by an independent firm.", year: "2025" },
    { icon: Lock, title: "ISO/IEC 27001", body: "BSI Group", description: "Information security management systems certified to the highest international standard.", year: "2025" },
    { icon: FileText, title: "PCI DSS Level 1", body: "QSA Audit", description: "Payment Card Industry Data Security Standard compliance for payment processing components.", year: "2025" },
    { icon: Globe, title: "GDPR Certification", body: "EU DPA", description: "Independently verified GDPR compliance under Article 42 certification mechanism.", year: "2025" }
];

const sections = [
    { id: "overview", title: "Overview" },
    { id: "regulatory-frameworks", title: "Regulatory Frameworks" },
    { id: "certifications", title: "Certifications" },
    { id: "kyc-aml", title: "KYC / AML" },
    { id: "sanctions", title: "Sanctions Compliance" },
    { id: "reporting", title: "Reporting & Disclosure" },
    { id: "contact", title: "Compliance Contact" }
];

export default function Compliance() {
    const [activeSection, setActiveSection] = useState("overview");

    return (
        <div className="bg-background min-h-screen">
            {/* Hero */}
            <section className="relative py-20 border-border border-b overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-accent/5" />
                <div className="z-10 relative mx-auto px-4 md:px-5 xl:px-6 container">
                    <motion.div className="max-w-6xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <Badge variant="outline" className="bg-primary/5 mb-4 px-4 py-2 border-primary/30">
                            <Scale className="mr-2 size-4 text-primary" />
                            Legal
                        </Badge>
                        <h1 className="mb-4 font-bold text-foreground text-3xl md:text-4xl xl:text-6xl">Compliance</h1>
                        <p className="mb-4 text-muted-foreground text-sm md:text-base xl:text-lg">
                            Cold Asset is committed to operating with integrity and in full compliance with applicable laws and regulations across all jurisdictions we serve.
                        </p>
                        <div className="flex items-center gap-2 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
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

                            <div className="bg-primary/5 mt-8 p-4 border border-primary/20 rounded-xl">
                                <Building2 className="mb-2 size-5 text-primary" />
                                <p className="mb-1 font-medium text-[11px] text-foreground md:text-xs xl:text-sm">Legal Entity</p>
                                <p className="text-muted-foreground text-xs">Cold Asset Inc.</p>
                                <p className="text-muted-foreground text-xs">Delaware, USA</p>
                            </div>
                        </div>
                    </aside>

                    {/* Main */}
                    <main className="space-y-16 lg:col-span-3">
                        {/* Overview */}
                        <motion.section id="overview" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} onViewportEnter={() => setActiveSection("overview")}>
                            <h2 className="mb-6 pb-3 border-border border-b font-bold text-foreground text-lg md:text-xl xl:text-2xl">Overview</h2>
                            <p className="mb-6 text-muted-foreground leading-relaxed">
                                As a cryptocurrency wallet provider operating globally, Cold Asset takes its compliance obligations seriously. We maintain a dedicated compliance team, engage external legal counsel in key jurisdictions, and conduct regular internal and external audits to ensure our practices meet or exceed regulatory requirements.
                            </p>
                            <p className="mb-6 text-muted-foreground leading-relaxed">
                                Cold Asset is a non-custodial wallet, meaning we do not hold, control, or have access to customer funds. This fundamental architecture reduces our regulatory footprint while ensuring that users maintain full control of their assets.
                            </p>
                            <div className="gap-4 grid md:grid-cols-3">
                                {[
                                    { value: "50+", label: "Countries Served" },
                                    { value: "6", label: "Regulatory Frameworks" },
                                    { value: "4", label: "Active Certifications" }
                                ].map((stat, i) => (
                                    <div key={i} className="bg-card p-4 md:p-5 xl:p-6 border border-border rounded-xl text-center">
                                        <p className="mb-1 font-bold text-primary text-xl md:text-2xl xl:text-3xl">{stat.value}</p>
                                        <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                        {/* Regulatory Frameworks */}
                        <motion.section id="regulatory-frameworks" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} onViewportEnter={() => setActiveSection("regulatory-frameworks")}>
                            <h2 className="mb-6 pb-3 border-border border-b font-bold text-foreground text-lg md:text-xl xl:text-2xl">Regulatory Frameworks</h2>
                            <div className="space-y-6">
                                {frameworks.map((fw, index) => (
                                    <Card key={index} className="border-border">
                                        <CardContent className="p-4 md:p-5 xl:p-6">
                                            <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
                                                <div>
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <h3 className="font-bold text-foreground text-base md:text-lg xl:text-xl">{fw.name}</h3>
                                                        <Badge variant="outline" className="text-xs">
                                                            <Globe className="mr-1 size-3" />
                                                            {fw.region}
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <Badge className={fw.status === "Compliant" ? "bg-green-100 text-green-800 border-green-200" : "bg-amber-100 text-amber-800 border-amber-200"}>
                                                    {fw.status === "Compliant" ? (
                                                        <CheckCircle2 className="mr-1 size-3" />
                                                    ) : (
                                                        <AlertTriangle className="mr-1 size-3" />
                                                    )}
                                                    {fw.status}
                                                </Badge>
                                            </div>
                                            <p className="mb-4 text-[11px] text-muted-foreground md:text-xs xl:text-sm leading-relaxed">{fw.description}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {fw.badges.map((b, i) => (
                                                    <Badge key={i} variant="secondary" className="bg-muted border-0 text-muted-foreground text-xs">
                                                        {b}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </motion.section>

                        {/* Certifications */}
                        <motion.section id="certifications" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} onViewportEnter={() => setActiveSection("certifications")}>
                            <h2 className="mb-6 pb-3 border-border border-b font-bold text-foreground text-lg md:text-xl xl:text-2xl">Certifications & Audits</h2>
                            <div className="gap-6 grid md:grid-cols-2">
                                {certifications.map((cert, index) => (
                                    <div key={index} className="bg-card p-6 border border-border rounded-xl">
                                        <div className="flex items-start gap-4">
                                            <div className="flex justify-center items-center bg-primary/10 rounded-xl size-10 md:size-12 shrink-0">
                                                <cert.icon className="size-5 md:size-6 text-primary" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="font-semibold text-foreground">{cert.title}</h3>
                                                    <Badge variant="outline" className="text-xs">{cert.year}</Badge>
                                                </div>
                                                <p className="mb-2 text-primary text-xs">{cert.body}</p>
                                                <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">{cert.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                        {/* KYC/AML */}
                        <motion.section id="kyc-aml" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} onViewportEnter={() => setActiveSection("kyc-aml")}>
                            <h2 className="mb-6 pb-3 border-border border-b font-bold text-foreground text-lg md:text-xl xl:text-2xl">KYC / AML</h2>
                            <div className="space-y-4 text-muted-foreground">
                                <p className="leading-relaxed">Cold Asset employs a risk-based approach to Know Your Customer (KYC) and Anti-Money Laundering (AML) obligations. Basic wallet functionality is available without KYC to preserve user privacy. Enhanced features with higher transaction thresholds require identity verification.</p>
                                <p className="leading-relaxed">Our AML program includes transaction monitoring using on-chain analytics, screening against global sanctions and PEP lists, enhanced due diligence for high-risk use cases, and mandatory reporting of suspicious activity to relevant financial intelligence units.</p>
                                <p className="leading-relaxed">We use industry-leading blockchain analytics tools to detect and prevent the use of Cold Asset for illicit purposes, including mixing, tumbling, and transactions linked to known criminal wallets.</p>
                            </div>
                        </motion.section>

                        {/* Sanctions */}
                        <motion.section id="sanctions" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} onViewportEnter={() => setActiveSection("sanctions")}>
                            <h2 className="mb-6 pb-3 border-border border-b font-bold text-foreground text-lg md:text-xl xl:text-2xl">Sanctions Compliance</h2>
                            <div className="space-y-4 text-muted-foreground">
                                <p className="leading-relaxed">Cold Asset maintains a comprehensive sanctions compliance program in accordance with OFAC, UN, EU, and other applicable sanctions regimes. We screen all users and transactions against applicable sanctions lists.</p>
                                <p className="leading-relaxed">Cold Asset does not provide services to individuals or entities on the SDN list, or to persons located in comprehensively sanctioned jurisdictions including Cuba, Iran, North Korea, Syria, and the Crimea region of Ukraine.</p>
                                <div className="bg-amber-50 p-4 border border-amber-200 rounded-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <AlertTriangle className="size-5 text-amber-600" />
                                        <span className="font-medium text-amber-800">Restricted Jurisdictions</span>
                                    </div>
                                    <p className="text-[11px] text-amber-700 md:text-xs xl:text-sm">If you are located in a sanctioned jurisdiction or believe you have been incorrectly restricted, contact our compliance team at compliance@coldasset.com for review.</p>
                                </div>
                            </div>
                        </motion.section>

                        {/* Reporting */}
                        <motion.section id="reporting" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} onViewportEnter={() => setActiveSection("reporting")}>
                            <h2 className="mb-6 pb-3 border-border border-b font-bold text-foreground text-lg md:text-xl xl:text-2xl">Reporting & Disclosure</h2>
                            <div className="space-y-4 text-muted-foreground">
                                <p className="leading-relaxed">Cold Asset publishes an annual Transparency Report detailing the number of government data requests received, the number fulfilled, and general statistics about our compliance activities. We challenge overly broad requests where legally permitted.</p>
                                <p className="leading-relaxed">We publish third-party security audit reports, penetration test summaries, and SOC 2 reports to qualified parties upon request under NDA. Our SOC 2 executive summary is publicly available on our website.</p>
                            </div>
                        </motion.section>

                        {/* Contact */}
                        <motion.section  id="contact"  initial={{ opacity: 0, y: 20 }}  whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} onViewportEnter={() => setActiveSection("contact")}>
                            <h2 className="mb-6 pb-3 border-border border-b font-bold text-foreground text-lg md:text-xl xl:text-2xl">Compliance Contact</h2>
                            <div className="gap-6 grid md:grid-cols-2">
                                {[
                                    { title: "General Compliance", email: "compliance@coldasset.com", description: "For general compliance inquiries and regulatory matters" },
                                    { title: "Law Enforcement", email: "legal@coldasset.com", description: "For law enforcement requests and legal process" },
                                    { title: "Sanctions Screening", email: "sanctions@coldasset.com", description: "For sanctions-related queries and disputed restrictions" },
                                    { title: "Data Protection Officer", email: "dpo@coldasset.com", description: "For privacy and data protection matters" }
                                ].map((contact, i) => (
                                    <div key={i} className="bg-card p-5 border border-border rounded-xl">
                                        <h4 className="mb-1 font-semibold text-foreground">{contact.title}</h4>
                                        <a href={`mailto:${contact.email}`} className="text-[11px] text-primary md:text-xs xl:text-sm hover:underline">{contact.email}</a>
                                        <p className="mt-2 text-muted-foreground text-xs">{contact.description}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                        <div className="bg-primary/5 p-6 border border-primary/20 rounded-2xl">
                            <p className="text-muted-foreground text-sm">
                                For related policies, see our{' '}
                                <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                                {' '}and{' '}
                                <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>.
                            </p>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}