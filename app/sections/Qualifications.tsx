"use client";

import { useEffect, useRef } from "react";

const degrees = [
  {
    degree: "MBBS - Bachelor of Medicine and Bachelor of Surgery",
    institution: "Medical University",
    year: "2024",
  },
];

const certifications = [
  {
    name: "Medical Registration",
    status: "Active",
    year: "2024",
    icon: "shield",
  },
  {
    name: "Basic Life Support (BLS)",
    status: "Certified",
    year: "2024",
    icon: "heart",
  },
];

const affiliations = [
  "Nepal Medical Council",
  "Society of Internal Medicine",
];

const hospitalAffiliations = [
  {
    name: "Nobel Medical College & Teaching Hospital",
    role: "Medical Officer",
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
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = sectionRef.current?.querySelectorAll(".fade-up");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="qualifications"
      ref={sectionRef}
      className="py-20 md:py-28 bg-background-soft"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out badge-capsule mb-4">
            Credentials
          </span>
          <h2 className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out delay-100 text-2xl md:text-3xl font-semibold text-foreground mb-4">
            Qualifications & Certifications
          </h2>
          <p className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out delay-200 text-foreground-muted">
            Medical Officer with MBBS degree, dedicated to providing quality healthcare.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Medical Degrees - Pill Cards */}
          <div className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out delay-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-foreground">Medical Education</h3>
            </div>
            
            <div className="space-y-4">
              {degrees.map((item, index) => (
                <div key={index} className="p-5 bg-background rounded-2xl border border-border hover:border-primary/30 hover:shadow-md transition-all group">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:scale-110 transition-all">
                        <svg className="w-5 h-5 text-primary group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{item.degree}</h4>
                        <p className="text-sm text-foreground-subtle">{item.institution}</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full whitespace-nowrap">{item.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Board Certifications - Pill Style */}
          <div className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out delay-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="7" />
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-foreground">Certifications</h3>
            </div>
            
            <div className="space-y-4">
              {certifications.map((item, index) => (
                <div key={index} className="p-5 bg-background rounded-2xl border border-border hover:border-primary/30 hover:shadow-md transition-all group">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:scale-110 transition-all">
                        <svg className="w-5 h-5 text-primary group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          {item.icon === "shield" && <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />}
                          {item.icon === "heart" && <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />}
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{item.name}</h4>
                        <span className="inline-flex items-center mt-1.5 px-2.5 py-0.5 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5" />
                          {item.status}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-foreground-subtle bg-background-soft px-3 py-1 rounded-full whitespace-nowrap">{item.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Affiliations */}
          <div className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out delay-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-foreground">Professional Affiliations</h3>
            </div>
            
            <div className="p-6 bg-background rounded-2xl border border-border">
              <div className="flex flex-wrap gap-2">
                {affiliations.map((item, index) => (
                  <span key={index} className="inline-flex items-center px-4 py-2 text-sm font-medium text-foreground-muted bg-background-soft rounded-full border border-border hover:border-primary/30 hover:text-primary transition-colors">
                    <svg className="w-4 h-4 mr-2 text-primary/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Hospital Affiliations */}
          <div className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out delay-400">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-foreground">Hospital Affiliations</h3>
            </div>
            
            <div className="space-y-3">
              {hospitalAffiliations.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-background rounded-2xl border border-border hover:border-primary/30 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                    <svg className="w-6 h-6 text-primary group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground truncate">{item.name}</h4>
                    <p className="text-sm text-foreground-subtle">{item.role}</p>
                  </div>
                </div>
              ))}
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
