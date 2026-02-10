import { Link } from "@tanstack/react-router";

export default function Footer() {
    const footerLinks = {
        Products: [
            { name: "Cold Wallet", href: "/create" },
            { name: "Mobile App", href: "/install" },
            { name: "Browser Extension", href: "/install" },
            { name: "Hardware Device", href: "/install" },
        ],
        Company: [
            { name: "Features", href: "/features" },
            { name: "Careers", href: "/careers" },
            { name: "Contact", href: "/contact" },
        ],
        Resources: [
            { name: "Documentation", href: "/docs" },
            { name: "Help Center", href: "/contact" },
            { name: "Security", href: "/security" },
        ],
        Legal: [
            { name: "Privacy Policy", href: "/privacy" },
            { name: "Terms of Service", href: "/terms" },
            { name: "Cookie Policy", href: "/cookie" },
            { name: "Compliance", href: "/compliance" },
        ],
    };

    return (
        <footer className="relative border-border border-t">
            <div className="mx-auto px-4 md:px-6 xl:px-8 max-w-7xl">
                {/* Main Footer */}
                <div className="py-20">
                    <div className="gap-8 lg:gap-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                        {/* Brand Column */}
                        <div className="col-span-2">
                            <div className="flex items-center gap-x-2">
                                <img src="/logo1.png" alt="cold asset logo" className="w-10" />
                                <span className="font-bold text-foreground text-base md:text-lg xl:text-xl tracking-tight">
                                    Cold<span className="text-primary">Asset</span>
                                </span>
                            </div>

                            <p className="mb-6 max-w-xs text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                                The most secure cryptocurrency wallet. Protecting over $12
                                billion in digital assets worldwide.
                            </p>
                        </div>

                        {/* Link Columns */}
                        {Object.entries(footerLinks).map(([category, links]) => (
                            <div key={category}>
                                <h3 className="mb-4 font-semibold text-foreground">
                                    {category}
                                </h3>
                                <ul className="space-y-3">
                                    {links.map((link) => (
                                        <li key={link.name}>
                                            <Link to={link.href} className="text-[11px] text-muted-foreground hover:text-foreground md:text-xs xl:text-sm transition-colors">
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="py-6 border-border border-t">
                    <div className="flex md:flex-row flex-col justify-between items-center gap-4">
                        <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                            © {new Date().getFullYear()} Cold Asset. All rights reserved.
                        </p>

                        <div className="flex items-center gap-6">
                            <span className="flex items-center gap-2 text-[11px] text-muted-foreground md:text-xs xl:text-sm">
                                <span className="bg-success rounded-full size-2 animate-pulse" />
                                All systems operational
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
