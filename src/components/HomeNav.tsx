import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "@tanstack/react-router";

// Components
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";

// Icons
import { X } from "lucide-react";
import { Element4, LoginCurve } from "iconsax-reactjs";

export default function Navbar() {

    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const navLinks = [
        { name: "Security", href: "/security" },
        { name: "Features", href: "/features" },
        { name: "Contact", href: "/contact" },
        { name: "Installation", href: "/install" },
    ];

    return (
        <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} className={[
            "fixed inset-x-0 top-0 z-50 transition-all duration-500",
            isScrolled ? "bg-background/90 backdrop-blur-xl border-b border-border" : "bg-transparent"].join(" ")}>

            <div className="mx-auto px-4 md:px-6 xl:px-8 max-w-7xl">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <img src="/logo1.png" alt="Logo" className="w-10" />

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link key={link.name} to={link.href}
                                className={`${location.pathname === link.href ? "text-accent montserrat font-semibold" : "hover:bg-muted text-muted-foreground hover:text-foreground"} px-4 py-2 rounded-lg transition-colors`}>
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden lg:flex items-center gap-3">
                        <Link to="/login" className="flex items-center gap-x-2 hover:bg-muted px-6 py-2 rounded-2xl text-muted-foreground hover:text-foreground">
                            Sign In <LoginCurve />
                        </Link>

                        <Link to="/create" search={{ ref: undefined }} className="block bg-linear-to-r from-primary to-accent hover:opacity-90 px-6 py-2 rounded-2xl text-primary-foreground">
                            Get Started
                        </Link>

                        <ThemeToggle />
                    </div>

                    {/* Mobile Toggle */}
                    <div className="lg:hidden flex items-center gap-x-2">
                        <button onClick={() => setMobileMenuOpen((v) => !v)} className="p-2 text-foreground cursor-pointer">
                            {mobileMenuOpen ? <X /> : <Element4 />}
                        </button>
                        <ThemeToggle />
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-background/95 backdrop-blur-xl border-border border-t">
                        <div className="space-y-4 px-6 py-6">
                            {navLinks.map((link) => (
                                <Link key={link.name} to={link.href} className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}>
                                    {link.name}
                                </Link>
                            ))}

                            <div className="space-y-3 pt-4">
                                <Button variant="outline" className="hover:bg-muted border-border w-full text-foreground">
                                    Sign In
                                </Button>

                                <Button className="bg-linear-to-r from-primary to-accent w-full text-primary-foreground">
                                    Get Started
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
