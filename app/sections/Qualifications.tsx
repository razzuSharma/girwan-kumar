"use client";

import { useEffect, useRef } from "react";

const degrees = [
  {
    degree: "MBBS",
    title: "Bachelor of Medicine and Bachelor of Surgery",
    institution: "Nobel Medical College & Teaching Hospital",
    year: "2024",
  },
];

const certifications = [
  {
    name: "Medical Registration",
    status: "Active",
    year: "2024",
    id: "NMC_REG_35140"
  },
  {
    name: "Basic Life Support (BLS)",
    status: "Certified",
    year: "2024",
    id: "BLS_CERT"
  },
];

export default function Qualifications() {
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
      id="qualifications"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Header Section */}
          <div className="lg:w-1/3">
            <div className="fade-up opacity-0 translate-y-4 mb-4">
              <span className="badge-capsule">Credentials</span>
            </div>
            <h2 className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out delay-100 text-3xl md:text-5xl font-bold text-foreground mb-6">
              Empowered by <span className="text-primary">Medical Knowledge</span>
            </h2>
            <p className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out delay-200 text-foreground-muted text-lg font-light leading-relaxed">
              Academic excellence and certified clinical skills form the pillar of my medical practice.
            </p>

            <div className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out delay-300 mt-12 p-8 rounded-[2rem] bg-white border border-border shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h4 className="font-bold text-foreground">Verified Status</h4>
              </div>
              <p className="text-sm text-foreground-muted font-light mb-6">All medical registrations and professional certifications are valid and authenticated.</p>
              <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
                <div className="h-full w-full bg-accent rounded-full animate-pulse opacity-60" />
              </div>
            </div>
          </div>

          {/* List Section */}
          <div className="lg:w-2/3 space-y-8">
            {/* Education */}
            <div className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out delay-100">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
                Medical Education
              </h3>
              <div className="grid gap-6">
                {degrees.map((item, index) => (
                  <div key={index} className="p-8 rounded-3xl bg-white border border-border hover:border-primary/30 transition-all shadow-sm group">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                      <div>
                        <span className="text-primary font-bold text-lg">{item.degree}</span>
                        <h4 className="text-foreground font-semibold mt-1">{item.title}</h4>
                      </div>
                      <span className="px-4 py-1 rounded-full bg-primary/5 text-primary text-xs font-bold border border-primary/10">
                        Class of {item.year}
                      </span>
                    </div>
                    <p className="text-sm text-foreground-muted font-light flex items-center gap-2">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      </svg>
                      {item.institution}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out delay-200">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Professional Certifications
              </h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {certifications.map((item, index) => (
                  <div key={index} className="p-6 rounded-3xl bg-white border border-border shadow-sm hover:shadow-md transition-all">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs font-bold text-accent px-3 py-1 bg-accent/5 rounded-full border border-accent/10">{item.status}</span>
                      <span className="text-xs text-foreground-subtle">{item.year}</span>
                    </div>
                    <h4 className="text-foreground font-bold mb-2">{item.name}</h4>
                    <p className="text-[10px] font-mono text-foreground-subtle tracking-widest uppercase">Registry ID: {item.id}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
