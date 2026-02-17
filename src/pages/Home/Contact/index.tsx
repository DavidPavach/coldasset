import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-fox-toast';
import { Link } from '@tanstack/react-router';

// Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Icons
import { MapPin, Send, Clock, HelpCircle, FileText, ExternalLink, CheckCircle2, Loader2 } from 'lucide-react';
import { Messages, Call, ShieldSecurity, Sms } from "iconsax-reactjs";

export default function Contact() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        category: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    // Functions
    const reset = () => {
        setFormData({
            name: '',
            email: '',
            subject: '',
            category: '',
            message: ''
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);
        reset();
        toast.success('Message sent successfully! We\'ll get back to you soon.');
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const contactMethods = [
        {
            icon: Sms,
            title: "Email Support",
            description: "Get help via email",
            value: "support@cold-asset.com",
            action: "mailto:support@cold-asset.com"
        },
        {
            icon: Messages,
            title: "Live Chat",
            description: "Chat with our team",
            value: "Available 24/7",
            action: "/"
        },
        {
            icon: Call,
            title: "Call Support",
            description: "Premium support line",
            value: "+1 (888) COLD-AST",
            action: "tel:+18882653278"
        }
    ];

    const quickLinks = [
        { icon: HelpCircle, title: "Help Center", description: "Browse FAQs and guides", link: "#" },
        { icon: FileText, title: "Documentation", description: "Technical resources", link: "#" },
        { icon: ShieldSecurity, title: "Security Issues", description: "Report vulnerabilities", link: "#" }
    ];

    const offices = [
        { city: "San Francisco", address: "100 Market St, Suite 500", timezone: "PST" },
        { city: "London", address: "1 Liverpool St, EC2M 7QD", timezone: "GMT" },
        { city: "Singapore", address: "1 Raffles Place, #40-01", timezone: "SGT" }
    ];

    if (isSubmitted) {
        return (
            <div className="flex justify-center items-center px-4 md:px-5 xl:px-6 py-10">
                <motion.div className="max-w-lg text-center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                    <div className="flex justify-center items-center bg-green-100 mx-auto mb-6 rounded-full w-20 h-20">
                        <CheckCircle2 className="size-10 text-green-600" />
                    </div>
                    <h1 className="mb-4 font-bold text-foreground text-xl md:text-2xl xl:text-3xl">Message Sent!</h1>
                    <p className="mb-8 text-muted-foreground">
                        Thank you for reaching out. Our team will review your message and get back to you within 24 hours.
                    </p>
                    <Button
                        onClick={() => {
                            setIsSubmitted(false);
                            setFormData({ name: '', email: '', subject: '', category: '', message: '' });
                        }}
                        variant="outline"
                        className="rounded-xl">
                        Send Another Message
                    </Button>
                </motion.div>
            </div>
        );
    }

    return (
        <div>
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-accent/5" />
                <div className="top-20 left-1/3 absolute bg-primary/10 blur-3xl rounded-full w-80 h-80" />

                <div className="z-10 relative mx-auto px-4 md:px-5 xl:px-6 container">
                    <motion.div className="mx-auto max-w-3xl text-center" initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <Badge variant="outline" className="bg-primary/5 mb-6 px-4 py-2 border-primary/30 text-[11px] md:text-xs xl:text-sm">
                            <Messages className="mr-2 text-primary" />
                            Get in Touch
                        </Badge>

                        <h1 className="mb-6 font-bold text-foreground text-4xl md:text-5xl xl:text-6xl tracking-tight">
                            We're Here to Help
                        </h1>

                        <p className="mx-auto max-w-2xl text-muted-foreground text-base md:text-lg xl:text-xl leading-relaxed">
                            Have questions about Cold Asset? Our team is ready to assist you
                            with any inquiries about our wallet, security, or features.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Methods */}
            <section className="py-12">
                <div className="mx-auto px-6 container">
                    <div className="gap-6 grid md:grid-cols-3 mx-auto max-w-6xl">
                        {contactMethods.map((method, index) => (
                            <motion.a key={index} href={method.action} initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                                <Card className="group bg-card hover:shadow-primary/5 hover:shadow-xl border-border hover:border-primary/30 h-full transition-all duration-300 cursor-pointer">
                                    <CardContent className="p-4 md:p-5 xl:p-6 text-center">
                                        <div className="flex justify-center items-center bg-primary/10 group-hover:bg-primary/20 mx-auto mb-4 rounded-2xl size-10 md:size-12 xl:size-14 transition-colors">
                                            <method.icon className="size-5 md:size-6 xl:size-7 text-primary" />
                                        </div>
                                        <h3 className="mb-1 font-semibold text-foreground">{method.title}</h3>
                                        <p className="mb-2 text-[11px] text-muted-foreground md:text-xs xl:text-sm">{method.description}</p>
                                        <p className="font-medium text-primary">{method.value}</p>
                                    </CardContent>
                                </Card>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Contact Section */}
            <section className="py-20">
                <div className="mx-auto px-4 md:px-5 xl:px-6 container">
                    <div className="gap-12 grid lg:grid-cols-5 mx-auto max-w-6xl">
                        {/* Contact Form */}
                        <motion.div className="lg:col-span-3" initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <Card className="border-border">
                                <CardHeader className="pb-4">
                                    <CardTitle className="font-bold text-lg md:text-xl xl:text-2xl">Send us a Message</CardTitle>
                                    <p className="text-muted-foreground">Fill out the form and we'll respond within 24 hours</p>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="gap-6 grid md:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">Full Name</Label>
                                                <Input id="name" placeholder="John Doe" value={formData.name}
                                                    onChange={(e) => handleInputChange('name', e.target.value)} required
                                                    className="rounded-xl h-12" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email Address</Label>
                                                <Input id="email" type="email" placeholder="john@example.com" value={formData.email}
                                                    onChange={(e) => handleInputChange('email', e.target.value)} required className="rounded-xl h-12" />
                                            </div>
                                        </div>

                                        <div className="gap-6 grid md:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="category">Category</Label>
                                                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)} >
                                                    <SelectTrigger className="rounded-xl w-full h-12">
                                                        <SelectValue placeholder="Select a category" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="general">General Inquiry</SelectItem>
                                                        <SelectItem value="support">Technical Support</SelectItem>
                                                        <SelectItem value="security">Security Concern</SelectItem>
                                                        <SelectItem value="business">Business Partnership</SelectItem>
                                                        <SelectItem value="media">Media Inquiry</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="subject">Subject</Label>
                                                <Input id="subject" placeholder="How can we help?" value={formData.subject}
                                                    onChange={(e) => handleInputChange('subject', e.target.value)}
                                                    required
                                                    className="rounded-xl h-12" />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="message">Message</Label>
                                            <Textarea id="message" placeholder="Tell us more about your inquiry..." value={formData.message}
                                                onChange={(e) => handleInputChange('message', e.target.value)} required
                                                className="rounded-xl min-h-40 resize-none" />
                                        </div>

                                        <Button type="submit" size="lg" disabled={isSubmitting}
                                            className="bg-primary hover:bg-primary/90 rounded-xl w-full h-14 text-primary-foreground text-sm md:text-base xl:text-lg">
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="mr-2 size-5 animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="mr-2 size-5" />
                                                    Send Message
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Sidebar */}
                        <motion.div className="space-y-6 lg:col-span-2" initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            {/* Quick Links */}
                            <Card className="border-border">
                                <CardHeader className="pb-4">
                                    <CardTitle className="font-semibold text-lg">Quick Resources</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {quickLinks.map((link, index) => (
                                        <Link key={index} to={link.link}
                                            className="group flex items-center gap-4 hover:bg-muted p-3 rounded-xl transition-colors">
                                            <div className="flex justify-center items-center bg-primary/10 group-hover:bg-primary/20 rounded-lg size-10 transition-colors">
                                                <link.icon className="size-5 text-primary" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-foreground">{link.title}</p>
                                                <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">{link.description}</p>
                                            </div>
                                            <ExternalLink className="w-4 h-4 text-muted-foreground" />
                                        </Link>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* Office Locations */}
                            <Card className="border-border">
                                <CardHeader className="pb-4">
                                    <CardTitle className="font-semibold text-lg">Global Offices</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {offices.map((office, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <MapPin className="mt-0.5 size-5 text-primary" />
                                            <div>
                                                <p className="font-medium text-foreground">{office.city}</p>
                                                <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">{office.address}</p>
                                                <div className="flex items-center gap-1 mt-1">
                                                    <Clock className="size-3 text-muted-foreground" />
                                                    <span className="text-muted-foreground text-xs">{office.timezone}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* Response Time */}
                            <Card className="bg-primary/5 border-primary/20">
                                <CardContent className="p-4 md:p-5 xl:p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="flex justify-center items-center bg-primary/10 rounded-full size-10 md:size-12">
                                            <Clock className="size-5 md:size-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-foreground">Fast Response</p>
                                            <p className="text-[11px] text-muted-foreground md:text-xs xl:text-sm">Average response time: 4 hours</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FAQ Teaser */}
            <section className="bg-muted/30 py-20">
                <div className="mx-auto px-4 md:px-5 xl:px-6 text-center container">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <h2 className="mb-4 font-bold text-foreground text-xl md:text-2xl xl:text-3xl">
                            Frequently Asked Questions
                        </h2>
                        <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
                            Find quick answers to common questions in our Help Center
                        </p>
                        <Button variant="outline" size="lg" className="rounded-xl">
                            <HelpCircle className="mr-2 size-5" />
                            Browse Help Center
                        </Button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}