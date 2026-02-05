"use client";

import { useEffect, useRef } from "react";

const visitingHours = [
  { day: "Sunday", hours: "9:00 AM - 5:00 PM", status: "open" },
  { day: "Monday", hours: "9:00 AM - 5:00 PM", status: "open" },
  { day: "Tuesday", hours: "9:00 AM - 5:00 PM", status: "open" },
  { day: "Wednesday", hours: "9:00 AM - 5:00 PM", status: "open" },
  { day: "Thursday", hours: "9:00 AM - 5:00 PM", status: "open" },
  { day: "Friday", hours: "9:00 AM - 4:00 PM", status: "open" },
  { day: "Saturday", hours: "Closed", status: "closed" },
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
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = sectionRef.current?.querySelectorAll(".fade-up");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-500";
      case "limited":
        return "bg-amber-500";
      case "closed":
        return "bg-red-400";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <section
      id="clinic"
      ref={sectionRef}
      className="py-20 md:py-28 bg-background"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out badge-capsule mb-4">
            Practice Location
          </span>
          <h2 className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out delay-100 text-2xl md:text-3xl font-semibold text-foreground mb-4">
            Hospital Information
          </h2>
          <p className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out delay-200 text-foreground-muted">
            Nobel Medical College & Teaching Hospital — Providing quality healthcare in Eastern Nepal.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Clinic Details */}
          <div className="space-y-8">
            {/* Location Card */}
            <div className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out delay-100 p-6 bg-background-soft rounded-3xl border border-border">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground">Location</h3>
                  <span className="inline-flex items-center gap-1.5 text-xs text-green-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Currently Open
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-background rounded-2xl border border-border">
                  <p className="font-medium text-foreground mb-1">Nobel Medical College & Teaching Hospital</p>
                  <address className="not-italic text-foreground-subtle leading-relaxed">
                    Kanchanbari, Biratnagar<br />
                    Morang District, Province No. 1<br />
                    Nepal
                  </address>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <a href="tel:+9779842598431" className="flex items-center gap-3 p-3 bg-background rounded-xl border border-border hover:border-primary/30 transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                      <svg className="w-4 h-4 text-primary group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-foreground-subtle">Phone</p>
                      <p className="text-sm font-medium text-foreground">+977 9842598431</p>
                    </div>
                  </a>
                  
                  <a href="mailto:Girwan.kumar@gmail.com" className="flex items-center gap-3 p-3 bg-background rounded-xl border border-border hover:border-primary/30 transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                      <svg className="w-4 h-4 text-primary group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-foreground-subtle">Email</p>
                      <p className="text-sm font-medium text-foreground truncate">Girwan.kumar@gmail.com</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Visiting Hours - Pill Style List */}
            <div className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out delay-200 p-6 bg-background-soft rounded-3xl border border-border">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-foreground">Visiting Hours</h3>
              </div>
              
              <div className="space-y-2">
                {visitingHours.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-3 bg-background rounded-xl border border-border hover:border-primary/20 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-2 h-2 rounded-full ${getStatusColor(item.status)}`} aria-hidden="true" />
                      <span className="text-sm font-medium text-foreground w-20">{item.day}</span>
                    </div>
                    <span className={`text-sm ${item.status === "closed" ? "text-foreground-subtle" : "text-foreground-muted"}`}>
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
              
              <p className="mt-4 text-xs text-foreground-subtle">
                * Emergency services available 24/7. OPD appointments available during visiting hours.
              </p>
            </div>

            {/* Facilities & Accessibility */}
            <div className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out delay-300 p-6 bg-background-soft rounded-3xl border border-border">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M16 12l-4-4-4 4M12 16V8" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-foreground">Facilities & Accessibility</h3>
              </div>
              
              <ul className="space-y-3">
                {[
                  "Modern 750+ bed teaching hospital facility",
                  "Wheelchair accessible entrance and elevators",
                  "On-site pharmacy and diagnostic center",
                  "Ample parking space available",
                  "Located 3 km from Biratnagar Airport",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-foreground-muted text-sm">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out delay-200">
            <div className="p-6 bg-background-soft rounded-3xl border border-border h-full">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="3 11 22 2 13 21 11 13 3 11" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-foreground">Directions to Nobel Medical College</h3>
              </div>
              
              <div className="aspect-[4/3] bg-background rounded-2xl overflow-hidden border border-border">
                {/* Placeholder for map */}
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-background-soft to-background">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <svg
                      className="w-10 h-10 text-primary"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <p className="text-sm text-foreground-subtle mb-1">Nobel Medical College</p>
                  <p className="text-xs text-foreground-subtle mb-1">Biratnagar, Nepal</p>
                  <p className="text-xs text-foreground-subtle mb-4">Kanchanbari, Morang District</p>
                  <a
                    href="https://maps.google.com/?q=Nobel+Medical+College+Biratnagar+Nepal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-pill btn-pill-outline text-sm"
                  >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="3 11 22 2 13 21 11 13 3 11" />
                    </svg>
                    Open in Google Maps
                  </a>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-background rounded-2xl border border-border">
                <p className="text-sm text-foreground-muted mb-2">
                  <strong className="text-foreground">From Biratnagar Airport:</strong> Approximately 10 minutes drive (3 km) via Mahendra Highway.
                </p>
                <p className="text-sm text-foreground-muted">
                  <strong className="text-foreground">From Biratnagar Bus Stand:</strong> About 15 minutes drive (5 km) via Kanchanbari Road.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
}
