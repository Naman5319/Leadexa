import React, { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SiWhatsapp } from "react-icons/si";
import { Menu, X, BarChart3, Users, CheckCircle2, Zap, Database, RefreshCw, ShieldCheck, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

// Form Schema
const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is too short"),
  requirement: z.enum(["Broker", "Fintech", "Advisor", "Other"], {
    required_error: "Please select a requirement",
  }),
});

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      companyName: "",
      email: "",
      phone: "",
      requirement: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast({
      title: "Request Submitted Successfully",
      description: "Our team will contact you within 24 hours.",
    });
    form.reset();
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-background font-sans text-foreground overflow-x-hidden">
      {/* 1. STICKY NAVBAR */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl font-bold tracking-tight text-foreground">
              Lead<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">EXA</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection("home")} className="text-sm font-medium hover:text-primary transition-colors">Home</button>
            <button onClick={() => scrollToSection("services")} className="text-sm font-medium hover:text-primary transition-colors">Services</button>
            <button onClick={() => scrollToSection("testimonials")} className="text-sm font-medium hover:text-primary transition-colors">Testimonials</button>
            <button onClick={() => scrollToSection("contact")} className="text-sm font-medium hover:text-primary transition-colors">Contact</button>
            <Button onClick={() => scrollToSection("lead-form")} className="shadow-sm">
              Get Verified Trader Data
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-foreground" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-background border-b border-border px-4 py-4 flex flex-col gap-4 shadow-lg">
            <button onClick={() => scrollToSection("home")} className="text-left text-sm font-medium p-2">Home</button>
            <button onClick={() => scrollToSection("services")} className="text-left text-sm font-medium p-2">Services</button>
            <button onClick={() => scrollToSection("testimonials")} className="text-left text-sm font-medium p-2">Testimonials</button>
            <button onClick={() => scrollToSection("contact")} className="text-left text-sm font-medium p-2">Contact</button>
            <Button onClick={() => scrollToSection("lead-form")} className="w-full mt-2">
              Get Verified Trader Data
            </Button>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      <section id="home" className="pt-32 pb-20 md:pt-40 md:pb-28 px-4 relative overflow-hidden flex flex-col items-center text-center">
        {/* Abstract Background Element */}
        <div className="absolute inset-0 -z-10 flex justify-center items-center opacity-30 pointer-events-none">
          <div className="w-[800px] h-[800px] bg-gradient-to-tr from-primary/20 to-accent/20 rounded-full blur-3xl" />
        </div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Access Verified Indian Traders Data That <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Actually Converts</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Stop wasting money on low-quality leads. Get access to high-intent, active traders with real investment records and behavior insights.
          </p>
          <Button size="lg" className="text-lg px-8 py-6 h-auto shadow-md" onClick={() => scrollToSection("lead-form")}>
            Request Data Access
          </Button>
        </motion.div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section id="services" className="py-20 bg-secondary/30 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Offer</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <Card className="h-full border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8 flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <CheckCircle2 size={24} />
                  </div>
                  <h3 className="text-xl font-semibold">Verified Trader Data</h3>
                  <p className="text-muted-foreground">100% filtered and active traders. No outdated or junk leads.</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
              <Card className="h-full border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8 flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                    <BarChart3 size={24} />
                  </div>
                  <h3 className="text-xl font-semibold">Investment-Based Segmentation</h3>
                  <p className="text-muted-foreground">Categorized by investment size and behavior patterns.</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}>
              <Card className="h-full border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8 flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Zap size={24} />
                  </div>
                  <h3 className="text-xl font-semibold">High-Intent Leads</h3>
                  <p className="text-muted-foreground">Users who are actively trading and looking for new opportunities.</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={3}>
              <Card className="h-full border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8 flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                    <Users size={24} />
                  </div>
                  <h3 className="text-xl font-semibold">Custom Data Solutions</h3>
                  <p className="text-muted-foreground">Tailored datasets curated specifically for your business needs.</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US SECTION */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex flex-col md:flex-row gap-12 items-center"
          >
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Industry Leaders Choose LeadEXA</h2>
              <p className="text-lg text-muted-foreground mb-8">
                We don't just sell lists; we provide verified intelligence that drives actual ROI.
              </p>
              <ul className="space-y-4">
                {[
                  "Real & Active Traders Only",
                  "No Random Scraped Data",
                  "Better ROI on Campaigns",
                  "Ideal for Brokers, Fintech & Advisors",
                  "Regularly Updated Data"
                ].map((point, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-primary" size={20} />
                    <span className="font-medium text-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 w-full">
              <div className="bg-secondary rounded-2xl p-8 shadow-inner border border-border">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded bg-background flex items-center justify-center font-bold text-primary shadow-sm">98%</div>
                    <div>
                      <h4 className="font-bold">Accuracy Rate</h4>
                      <p className="text-sm text-muted-foreground">Cleaned & verified</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded bg-background flex items-center justify-center font-bold text-accent shadow-sm">24h</div>
                    <div>
                      <h4 className="font-bold">Update Frequency</h4>
                      <p className="text-sm text-muted-foreground">Always fresh data</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded bg-background flex items-center justify-center font-bold text-primary shadow-sm">3x</div>
                    <div>
                      <h4 className="font-bold">Average ROI</h4>
                      <p className="text-sm text-muted-foreground">Compared to generic lists</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DATA TRUST SECTION */}
      <section className="py-24 px-4 bg-gradient-to-br from-[hsl(222,47%,8%)] to-[hsl(250,60%,12%)] text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-4 border border-primary/30 rounded-full px-4 py-1 bg-primary/10">
              How Our Data Works
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-5 text-white">
              A Data Pool Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Serious Results</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
              We work with a large and continuously expanding pool of Indian traders data, carefully maintained to ensure it remains fresh, relevant, and usable for real business outcomes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {[
              {
                icon: <Database size={22} />,
                title: "Continuously Growing Pool",
                body: "Our dataset is not static. We continuously expand and onboard new trader profiles, ensuring you always have access to the latest market participants — not stale records from months ago.",
                color: "text-primary",
                bg: "bg-primary/10 border-primary/20",
              },
              {
                icon: <RefreshCw size={22} />,
                title: "Structured & Refined Regularly",
                body: "Our systems regularly refine and structure the data with meaningful insights, helping you reach traders who are more likely to engage with your product or service.",
                color: "text-accent",
                bg: "bg-accent/10 border-accent/20",
              },
              {
                icon: <Lock size={22} />,
                title: "Controlled Distribution",
                body: "To maintain quality and reduce oversaturation, we follow a controlled distribution approach. Datasets shared with clients are not widely reused, allowing you to work with more exclusive and effective data.",
                color: "text-primary",
                bg: "bg-primary/10 border-primary/20",
              },
              {
                icon: <ShieldCheck size={22} />,
                title: "Compliance-First Approach",
                body: "Every dataset we deliver is handled with adherence to applicable data usage policies. We take compliance seriously so you can run your campaigns with confidence.",
                color: "text-accent",
                bg: "bg-accent/10 border-accent/20",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <div className={`rounded-2xl border p-8 h-full flex flex-col gap-4 ${item.bg} backdrop-blur-sm`}>
                  <div className={`w-11 h-11 rounded-lg bg-white/5 flex items-center justify-center ${item.color}`}>
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom trust bar */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="border border-white/10 rounded-2xl p-8 bg-white/5 backdrop-blur-sm"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "10L+", label: "Trader Profiles" },
                { value: "98%", label: "Data Accuracy" },
                { value: "Weekly", label: "Refresh Cycle" },
                { value: "Exclusive", label: "Distribution Policy" },
              ].map((stat, i) => (
                <div key={i} data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}>
                  <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-1">{stat.value}</p>
                  <p className="text-sm text-white/50 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-20 bg-foreground text-background px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Professionals</h2>
            <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <Card className="h-full bg-background/5 border-none text-background">
                <CardContent className="p-8 flex flex-col justify-between h-full">
                  <p className="text-lg italic mb-6">"LeadEXA completely changed our acquisition game. The quality of traders we received was far better than anything we tried before."</p>
                  <div>
                    <h4 className="font-bold text-primary-foreground">Rajesh Mehta</h4>
                    <p className="text-sm text-muted-foreground">Stock Broker</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.1 }}>
              <Card className="h-full bg-background/5 border-none text-background">
                <CardContent className="p-8 flex flex-col justify-between h-full">
                  <p className="text-lg italic mb-6">"We reduced our cost per acquisition by 40% using their segmented trader data."</p>
                  <div>
                    <h4 className="font-bold text-primary-foreground">Ankit Sharma</h4>
                    <p className="text-sm text-muted-foreground">Fintech Founder</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }}>
              <Card className="h-full bg-background/5 border-none text-background">
                <CardContent className="p-8 flex flex-col justify-between h-full">
                  <p className="text-lg italic mb-6">"Finally, a data provider that delivers what they promise. Highly recommended."</p>
                  <div>
                    <h4 className="font-bold text-primary-foreground">Priya Verma</h4>
                    <p className="text-sm text-muted-foreground">Investment Advisor</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. LEAD FORM SECTION */}
      <section id="lead-form" className="py-20 px-4 bg-secondary/50">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <Card className="border-none shadow-lg">
              <CardContent className="p-8 md:p-12">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-3">Get Access to Verified Trader Data</h2>
                  <p className="text-muted-foreground">Fill out the form below and our team will get in touch with you shortly.</p>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} className="bg-background" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Acme Finance" {...field} className="bg-background" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input placeholder="john@example.com" {...field} className="bg-background" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+91 98765 43210" {...field} className="bg-background" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="requirement"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Requirement</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-background">
                                <SelectValue placeholder="Select your industry" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Broker">Broker</SelectItem>
                              <SelectItem value="Fintech">Fintech</SelectItem>
                              <SelectItem value="Advisor">Advisor</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full text-lg py-6 h-auto mt-4" data-testid="button-submit-lead">
                      Get Data Now
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* 7. CONTACT SECTION */}
      <section id="contact" className="py-20 px-4 bg-background border-t border-border text-center">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
            <div className="flex flex-col md:flex-row justify-center gap-8 mb-8">
              <div className="p-6 bg-secondary/50 rounded-xl border border-border">
                <p className="text-sm text-muted-foreground mb-1">Email us at</p>
                <p className="font-semibold text-lg">support@leadexa.com</p>
              </div>
              <div className="p-6 bg-secondary/50 rounded-xl border border-border">
                <p className="text-sm text-muted-foreground mb-1">Call us</p>
                <p className="font-semibold text-lg">+91 XXXXX XXXXX</p>
              </div>
            </div>
            <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
          </motion.div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-foreground text-background py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
            <div className="max-w-sm">
              <span className="text-2xl font-bold tracking-tight mb-4 block">
                Lead<span className="text-primary-foreground">EXA</span>
              </span>
              <p className="text-muted-foreground text-sm">
                Providing high-quality, verified Indian traders data for businesses that want real results.
              </p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary-foreground transition-colors">Terms of Service</a>
            </div>
          </div>
          <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <p className="text-xs text-muted-foreground max-w-2xl">
              Disclaimer: LeadEXA provides data for business and marketing purposes only. We ensure compliance with applicable data usage policies.
            </p>
            <p className="text-xs text-muted-foreground shrink-0">
              © 2026 LeadEXA. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON */}
      <a
        href="https://wa.me/placeholder"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform flex items-center justify-center"
        aria-label="Contact us on WhatsApp"
        data-testid="link-whatsapp"
      >
        <SiWhatsapp size={28} />
      </a>
    </div>
  );
}