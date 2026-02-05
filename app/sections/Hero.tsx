"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
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

  return (
    <section
      id="home"
      ref={sectionRef}
      className="min-h-screen pt-20 flex items-center bg-background"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="order-2 md:order-1">
            {/* Medical Badge */}
            <div className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out">
              <span className="badge-capsule mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true" />
                Medical Officer | Internal Medicine
              </span>
            </div>

            <h1 className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out delay-100 text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight mb-6">
              Dr. Girwan Kumar{" "}
              <span className="text-primary">Budhathoki</span>
            </h1>

            <p className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out delay-200 text-lg text-foreground-muted mb-8 max-w-lg">
              MBBS graduate and dedicated Medical Officer providing compassionate, 
              patient-centered healthcare. Committed to evidence-based medicine 
              and preventive care for better patient outcomes.
            </p>

            {/* CTA Buttons - Pill Style */}
            <div className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out delay-300 flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="btn-pill btn-pill-primary"
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Book Appointment
              </a>
              <a
                href="#qualifications"
                className="btn-pill btn-pill-secondary"
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                View Credentials
              </a>
            </div>

            {/* Quick Stats - Medical Pills */}
            <div className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out delay-400 mt-12 pt-8 border-t border-border">
              <div className="flex flex-wrap gap-4">
                <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-background-soft border border-border">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-foreground-subtle">Degree</p>
                    <p className="text-sm font-medium text-foreground">MBBS</p>
                  </div>
                </div>
                
                <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-background-soft border border-border">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-foreground-subtle">Department</p>
                    <p className="text-sm font-medium text-foreground">Medical Officer</p>
                  </div>
                </div>
                
                <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-background-soft border border-border">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-semibold text-primary">✓</span>
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-foreground-subtle">Status</p>
                    <p className="text-sm font-medium text-foreground">Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Image - Medical Style */}
          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <div className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out delay-200 relative">
              {/* Medical Rings Background */}
              <div className="absolute inset-0 -m-8" aria-hidden="true">
                <div className="absolute inset-0 rounded-full border border-primary/10" />
                <div className="absolute inset-4 rounded-full border border-primary/10" />
                <div className="absolute inset-8 rounded-full border border-primary/10" />
              </div>
              
              {/* Main Image Container - Pill/Capsule Shape Option */}
              <div className="relative w-72 h-96 md:w-80 md:h-112 rounded-[3rem] overflow-hidden bg-background-soft shadow-2xl border-4 border-background">
                {/* Placeholder for doctor photo */}
                <div className="w-full h-full bg-linear-to-b from-primary/5 to-primary/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto rounded-full bg-background flex items-center justify-center shadow-lg mb-4">
                      <svg
                        className="w-16 h-16 text-primary/40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <p className="text-sm text-foreground-subtle">Dr. Girwan K. Budhathoki</p>
                  </div>
                </div>
                
                {/* Medical Badge Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-background/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-border flex items-center justify-center gap-2">
                    <div className="dot-pulse" aria-hidden="true" />
                    <span className="text-xs font-medium text-foreground">Accepting New Patients</span>
                  </div>
                </div>
              </div>
              
              {/* Floating Medical Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary rounded-2xl rotate-12 shadow-lg flex items-center justify-center" aria-hidden="true">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </div>
              
              <div className="absolute -bottom-2 -left-6 px-4 py-2 bg-green-500 text-white rounded-full shadow-lg" aria-hidden="true">
                <span className="text-xs font-semibold">MBBS</span>
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
