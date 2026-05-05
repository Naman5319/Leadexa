import React, { useState } from "react";
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
      <header className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center justify-between gap-3">
          {/* Logo */}
          <span className="text-xl md:text-2xl font-bold tracking-tight shrink-0">
            Lead<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">EXA</span>
          </span>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection("home")} className="text-sm font-medium hover:text-primary transition-colors">Home</button>
            <button onClick={() => scrollToSection("services")} className="text-sm font-medium hover:text-primary transition-colors">Services</button>
            <button onClick={() => scrollToSection("testimonials")} className="text-sm font-medium hover:text-primary transition-colors">Testimonials</button>
            <button onClick={() => scrollToSection("contact")} className="text-sm font-medium hover:text-primary transition-colors">Contact</button>
            <Button onClick={() => scrollToSection("lead-form")} className="shadow-sm" data-testid="button-nav-cta">
              Get Verified Trader Data
            </Button>
          </nav>

          {/* Mobile: mini CTA + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => scrollToSection("lead-form")}
              className="text-xs font-semibold px-3 py-1.5 rounded-full bg-primary text-white shadow-sm active:scale-95 transition-transform"
              data-testid="button-mobile-cta"
            >
              Get Data
            </button>
            <button
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-secondary border border-border text-foreground active:scale-95 transition-transform"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="button-menu-toggle"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-14 left-0 w-full bg-background/98 backdrop-blur-md border-b border-border shadow-xl">
            {/* Nav links */}
            <div className="px-4 pt-3 pb-2 flex flex-col gap-0.5">
              {[
                { id: "home", label: "Home" },
                { id: "services", label: "Services" },
                { id: "testimonials", label: "Testimonials" },
                { id: "contact", label: "Contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-sm font-medium px-3 py-3 rounded-xl hover:bg-secondary transition-colors flex items-center justify-between group"
                  data-testid={`button-nav-${item.id}`}
                >
                  <span>{item.label}</span>
                  <span className="text-muted-foreground text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </button>
              ))}
            </div>
            {/* CTA block */}
            <div className="px-4 pb-4 pt-2 border-t border-border mt-1">
              <Button
                onClick={() => scrollToSection("lead-form")}
                className="w-full py-5 h-auto text-sm font-semibold shadow-sm"
                data-testid="button-nav-mobile-cta"
              >
                Get Verified Trader Data
              </Button>
              <p className="text-center text-xs text-muted-foreground mt-2">Response within 24 hours</p>
            </div>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      <section id="home" className="pt-24 pb-12 md:pt-40 md:pb-24 px-4 relative overflow-hidden flex flex-col items-center text-center">
        <div className="absolute inset-0 -z-10 flex justify-center items-center opacity-30 pointer-events-none">
          <div className="w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-gradient-to-tr from-primary/20 to-accent/20 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-4xl mx-auto w-full"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight mb-4 md:mb-6 leading-tight">
            Access Verified Indian Traders Data That{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Actually Converts</span>
          </h1>
          <p className="text-base md:text-xl text-muted-foreground mb-7 md:mb-10 max-w-2xl mx-auto leading-relaxed px-2">
            Stop wasting money on low-quality leads. Get access to high-intent, active traders with real investment records and behavior insights.
          </p>
          <Button
            size="lg"
            className="text-base md:text-lg px-6 md:px-8 py-5 md:py-6 h-auto shadow-md w-full sm:w-auto"
            onClick={() => scrollToSection("lead-form")}
            data-testid="button-hero-cta"
          >
            Request Data Access
          </Button>
        </motion.div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section id="services" className="py-14 md:py-20 bg-secondary/30 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-10 md:mb-14"
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-3">What We Offer</h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
            {[
              { icon: <CheckCircle2 size={22} />, color: "bg-primary/10 text-primary", title: "Verified Trader Data", desc: "100% filtered and active traders. No outdated or junk leads." },
              { icon: <BarChart3 size={22} />, color: "bg-accent/10 text-accent", title: "Investment-Based Segmentation", desc: "Categorized by investment size and behavior patterns." },
              { icon: <Zap size={22} />, color: "bg-primary/10 text-primary", title: "High-Intent Leads", desc: "Users who are actively trading and looking for new opportunities." },
              { icon: <Users size={22} />, color: "bg-accent/10 text-accent", title: "Custom Data Solutions", desc: "Tailored datasets curated specifically for your business needs." },
            ].map((card, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Card className="h-full border-none shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-5 md:p-8 flex flex-col gap-3">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center ${card.color}`}>
                      {card.icon}
                    </div>
                    <h3 className="text-lg font-semibold">{card.title}</h3>
                    <p className="text-muted-foreground text-sm md:text-base">{card.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US SECTION */}
      <section className="py-14 md:py-20 px-4 bg-background">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-center"
          >
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">Why Industry Leaders Choose LeadEXA</h2>
              <p className="text-base text-muted-foreground mb-6">
                We don't just sell lists; we provide verified intelligence that drives actual ROI.
              </p>
              <ul className="space-y-3">
                {[
                  "Real & Active Traders Only",
                  "No Random Scraped Data",
                  "Better ROI on Campaigns",
                  "Ideal for Brokers, Fintech & Advisors",
                  "Regularly Updated Data",
                ].map((point, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-primary shrink-0" size={18} />
                    <span className="font-medium text-sm md:text-base">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full md:w-1/2">
              <div className="bg-secondary rounded-2xl p-5 md:p-8 shadow-inner border border-border">
                <div className="space-y-5">
                  {[
                    { value: "98%", color: "text-primary", label: "Accuracy Rate", sub: "Cleaned & verified" },
                    { value: "24h", color: "text-accent", label: "Update Frequency", sub: "Always fresh data" },
                    { value: "3x", color: "text-primary", label: "Average ROI", sub: "Compared to generic lists" },
                  ].map((stat, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded bg-background flex items-center justify-center font-bold text-sm shadow-sm shrink-0 ${stat.color}`}>{stat.value}</div>
                      <div>
                        <h4 className="font-bold text-sm md:text-base">{stat.label}</h4>
                        <p className="text-xs md:text-sm text-muted-foreground">{stat.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DATA TRUST SECTION */}
      <section className="py-14 md:py-24 px-4 bg-gradient-to-br from-[hsl(222,47%,8%)] to-[hsl(250,60%,12%)] text-white relative overflow-hidden">
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
            className="text-center mb-10 md:mb-16"
          >
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-4 border border-primary/30 rounded-full px-4 py-1 bg-primary/10">
              How Our Data Works
            </span>
            <h2 className="text-2xl md:text-4xl font-bold mb-4 text-white">
              A Data Pool Built for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Serious Results</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-base md:text-lg leading-relaxed px-2">
              We work with a large and continuously expanding pool of Indian traders data, carefully maintained to ensure it remains fresh, relevant, and usable for real business outcomes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-16">
            {[
              {
                icon: <Database size={20} />,
                title: "Continuously Growing Pool",
                body: "Our dataset is not static. We continuously expand and onboard new trader profiles, ensuring you always have access to the latest market participants — not stale records from months ago.",
                color: "text-primary",
                bg: "bg-primary/10 border-primary/20",
              },
              {
                icon: <RefreshCw size={20} />,
                title: "Structured & Refined Regularly",
                body: "Our systems regularly refine and structure the data with meaningful insights, helping you reach traders who are more likely to engage with your product or service.",
                color: "text-accent",
                bg: "bg-accent/10 border-accent/20",
              },
              {
                icon: <Lock size={20} />,
                title: "Controlled Distribution",
                body: "To maintain quality and reduce oversaturation, we follow a controlled distribution approach. Datasets shared with clients are not widely reused, allowing you to work with more exclusive and effective data.",
                color: "text-primary",
                bg: "bg-primary/10 border-primary/20",
              },
              {
                icon: <ShieldCheck size={20} />,
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
                <div className={`rounded-2xl border p-5 md:p-8 h-full flex flex-col gap-3 ${item.bg} backdrop-blur-sm`}>
                  <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center ${item.color}`}>
                    {item.icon}
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-white">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats bar */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="border border-white/10 rounded-2xl p-5 md:p-8 bg-white/5 backdrop-blur-sm"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8 text-center">
              {[
                { value: "10L+", label: "Trader Profiles" },
                { value: "98%", label: "Data Accuracy" },
                { value: "Weekly", label: "Refresh Cycle" },
                { value: "Exclusive", label: "Distribution" },
              ].map((stat, i) => (
                <div key={i} data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}>
                  <p className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-1">{stat.value}</p>
                  <p className="text-xs md:text-sm text-white/50 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-14 md:py-20 bg-foreground text-background px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-10 md:mb-14"
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-3">Trusted by Professionals</h2>
            <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {[
              { quote: "LeadEXA completely changed our acquisition game. The quality of traders we received was far better than anything we tried before.", name: "Rajesh Mehta", role: "Stock Broker" },
              { quote: "We reduced our cost per acquisition by 40% using their segmented trader data.", name: "Ankit Sharma", role: "Fintech Founder" },
              { quote: "Finally, a data provider that delivers what they promise. Highly recommended.", name: "Priya Verma", role: "Investment Advisor" },
            ].map((t, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}>
                <Card className="h-full bg-background/5 border-none text-background">
                  <CardContent className="p-5 md:p-8 flex flex-col justify-between h-full gap-4">
                    <p className="text-base italic leading-relaxed">"{t.quote}"</p>
                    <div>
                      <h4 className="font-bold text-sm">{t.name}</h4>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. LEAD FORM SECTION */}
      <section id="lead-form" className="py-14 md:py-20 px-4 bg-secondary/50">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <Card className="border-none shadow-lg">
              <CardContent className="p-5 md:p-12">
                <div className="text-center mb-6 md:mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">Get Access to Verified Trader Data</h2>
                  <p className="text-muted-foreground text-sm md:text-base">Fill out the form below and our team will get in touch with you shortly.</p>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} className="bg-background" data-testid="input-full-name" />
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
                              <Input placeholder="Acme Finance" {...field} className="bg-background" data-testid="input-company-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input placeholder="john@example.com" {...field} className="bg-background" data-testid="input-email" />
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
                              <Input placeholder="+91 98765 43210" {...field} className="bg-background" data-testid="input-phone" />
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
                              <SelectTrigger className="bg-background" data-testid="select-requirement">
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
                    <Button type="submit" className="w-full text-base md:text-lg py-5 md:py-6 h-auto mt-2" data-testid="button-submit-lead">
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
      <section id="contact" className="py-14 md:py-20 px-4 bg-background border-t border-border text-center">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Contact Us</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-8 mb-6">
              <div className="p-5 bg-secondary/50 rounded-xl border border-border flex-1">
                <p className="text-xs text-muted-foreground mb-1">Email us at</p>
                <a href="mailto:support@leadexa.com" className="font-semibold text-base hover:text-primary transition-colors" data-testid="link-email">
                  support@leadexa.com
                </a>
              </div>
              <div className="p-5 bg-secondary/50 rounded-xl border border-border flex-1">
                <p className="text-xs text-muted-foreground mb-1">Call us</p>
                <p className="font-semibold text-base">+91 XXXXX XXXXX</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">We'll get back to you within 24 hours.</p>
          </motion.div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-foreground text-background py-10 md:py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6 md:mb-8">
            <div className="max-w-sm">
              <span className="text-xl font-bold tracking-tight mb-3 block">
                Lead<span className="text-primary-foreground">EXA</span>
              </span>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Providing high-quality, verified Indian traders data for businesses that want real results.
              </p>
            </div>
            <div className="flex gap-5">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary-foreground transition-colors">Terms of Service</a>
            </div>
          </div>
          <div className="border-t border-background/20 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <p className="text-xs text-muted-foreground max-w-2xl leading-relaxed">
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
        className="fixed bottom-5 right-4 md:bottom-6 md:right-6 z-50 bg-[#25D366] text-white p-3.5 md:p-4 rounded-full shadow-xl hover:scale-110 transition-transform flex items-center justify-center"
        aria-label="Contact us on WhatsApp"
        data-testid="link-whatsapp"
      >
        <SiWhatsapp size={24} className="md:w-7 md:h-7" />
      </a>
    </div>
  );
}
