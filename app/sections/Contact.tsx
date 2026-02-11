"use client";

import { useEffect, useRef, useState } from "react";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    reason: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".fade-up");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormState({ name: "", email: "", phone: "", date: "", reason: "", message: "" });
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Form Side */}
          <div className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out">
            <div className="mb-8">
              <span className="badge-capsule mb-4">Appointments</span>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                Schedule Your <span className="text-primary">Medical Consultation</span>
              </h2>
              <p className="text-foreground-muted font-light text-lg">
                Fill out the form below to request an appointment. Our clinical staff
                will reach out to confirm your visit within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {isSuccess && (
                <div className="p-6 rounded-2xl bg-accent/10 border border-accent/20 text-accent font-bold flex items-center gap-3 animate-in slide-in-from-top-4">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Request Sent Successfully! We&apos;ll contact you soon.
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-foreground-muted tracking-widest uppercase">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    className="input-clinical"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-foreground-muted tracking-widest uppercase">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    className="input-clinical"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-foreground-muted tracking-widest uppercase">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formState.phone}
                    onChange={handleChange}
                    className="input-clinical"
                    placeholder="+977"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-foreground-muted tracking-widest uppercase">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formState.date}
                    onChange={handleChange}
                    className="input-clinical"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold text-foreground-muted tracking-widest uppercase">
                  Reason for Visit
                </label>
                <select
                  name="reason"
                  required
                  value={formState.reason}
                  onChange={handleChange}
                  className="input-clinical appearance-none"
                >
                  <option value="">Select a service</option>
                  <option value="general">General Consultation</option>
                  <option value="followup">Follow-up Visit</option>
                  <option value="acute">Acute Illness</option>
                  <option value="preventive">Preventive Screening</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold text-foreground-muted tracking-widest uppercase">
                  Additional Details
                </label>
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  rows={4}
                  className="input-clinical resize-none"
                  placeholder="Tell us about your symptoms or medical concerns..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-pill btn-pill-primary w-full py-5 text-lg shadow-xl"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white animate-spin rounded-full" />
                ) : (
                  "Submit Appointment Request"
                )}
              </button>
            </form>
          </div>

          {/* Info Side */}
          <div className="lg:pl-10 space-y-12">
            <div className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out delay-200 p-10 rounded-[3rem] bg-gradient-to-br from-primary to-accent text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 scale-150 group-hover:scale-110 transition-transform duration-1000">
                <svg className="w-32 h-32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>

              <h3 className="text-2xl font-bold mb-6">Patient Support</h3>
              <p className="text-white/80 font-light mb-8 leading-relaxed">
                Our professional medical team is here to assist you with any questions or concerns. Feel free to reach out via phone or email for direct assistance.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-background-soft/20 flex items-center justify-center">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">Urgent Inquiries</p>
                    <p className="text-lg font-bold">+977 9842598431</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-background-soft/20 flex items-center justify-center">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">Email Communication</p>
                    <p className="text-lg font-bold">Girwan.kumar@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out delay-400 p-8 rounded-[2rem] bg-background-soft border border-border shadow-sm">
              <h4 className="font-bold text-foreground mb-4">Patient Portal</h4>
              <p className="text-sm text-foreground-muted leading-relaxed font-light mb-6">
                We value your time. For the most efficient experience, please have your previous medical history ready if this is your first visit.
              </p>
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Compassionate Healthcare
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
