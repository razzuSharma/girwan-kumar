"use client";

import { useEffect, useRef } from "react";

const visitingHours = [
  { day: "Sunday", hours: "9:00 AM - 5:00 PM", status: "open" },
  { day: "Monday", hours: "9:00 AM - 5:00 PM", status: "open" },
  { day: "Tuesday", hours: "9:00 AM - 5:00 PM", status: "open" },
  { day: "Wednesday", hours: "9:00 AM - 5:00 PM", status: "open" },
  { day: "Thursday", hours: "9:00 AM - 5:00 PM", status: "open" },
  { day: "Friday", hours: "9:00 AM - 4:00 PM", status: "open" },
  { day: "Saturday", hours: "Emergency Only", status: "closed" },
];

export default function Clinic() {
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section
      id="clinic"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="fade-up opacity-0 translate-y-4 mb-4">
            <span className="badge-capsule">Clinic Location</span>
          </div>
          <h2 className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out delay-100 text-3xl md:text-5xl font-bold text-foreground mb-6">
            Where to <span className="text-primary">Find Us</span>
          </h2>
          <p className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out delay-200 text-foreground-muted text-lg font-light">
            Providing expert care at Nobel Medical College & Teaching Hospital.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Location Info */}
          <div className="space-y-8 h-full">
            <div className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out delay-100 p-10 rounded-[3rem] bg-background-soft border border-border shadow-sm h-full flex flex-col">
              <div className="flex items-center gap-5 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Practice Location</h3>
                  <span className="flex items-center gap-2 text-xs text-accent font-bold uppercase tracking-wider mt-1">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    Currently Open for OPD
                  </span>
                </div>
              </div>

              <div className="flex-1 space-y-8">
                <div className="p-6 rounded-2xl bg-background border border-border">
                  <p className="font-bold text-foreground mb-2">Nobel Medical College & Teaching Hospital</p>
                  <address className="not-italic text-foreground-muted leading-relaxed font-light">
                    Kanchanbari, Biratnagar<br />
                    Morang District, Province No. 1, Nepal
                  </address>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <a href="tel:+9779842598431" className="p-5 rounded-2xl border border-border hover:border-primary/20 hover:bg-primary/5 transition-all flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] text-foreground-subtle font-bold uppercase tracking-widest">Call Now</p>
                      <p className="font-bold text-foreground">+977 9842598431</p>
                    </div>
                  </a>
                  <a href="mailto:Girwan.kumar@gmail.com" className="p-5 rounded-2xl border border-border hover:border-accent/20 hover:bg-accent/5 transition-all flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] text-foreground-subtle font-bold uppercase tracking-widest">Email Us</p>
                      <p className="font-bold text-foreground text-sm truncate">GIRWAN.KUMAR</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map & Hours */}
          <div className="space-y-8 flex flex-col">
            <div className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out delay-200 p-10 rounded-[3rem] bg-background-soft border border-border shadow-sm flex-1">
              <h3 className="text-xl font-bold text-foreground mb-8 flex items-center gap-3">
                <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                Visiting Hours
              </h3>
              <div className="space-y-3">
                {visitingHours.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-4 rounded-xl bg-background border border-border/50 group hover:border-primary/20 transition-all">
                    <span className="font-bold text-foreground">{item.day}</span>
                    <span className={`text-sm ${item.status === 'closed' ? 'text-error font-medium' : 'text-foreground-muted'}`}>
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-border flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center text-error">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <p className="text-xs text-foreground-muted font-light">Emergency services are available 24/7 at the main hospital entrance.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
