"use client";

import { useEffect, useRef } from "react";

const timeline = [
  {
    year: "2024",
    title: "MBBS Degree",
    description: "Completed Bachelor of Medicine and Bachelor of Surgery with dedication to clinical excellence.",
  },
  {
    year: "2024",
    title: "Medical Officer",
    description: "Started professional journey as a Medical Officer, providing comprehensive patient care.",
  },
];

const focusAreas = [
  "General health check-ups and screenings",
  "Management of common illnesses",
  "Preventive medicine and health education",
  "Chronic disease monitoring",
  "Patient-centered care approach",
  "Emergency medical care",
];

export default function About() {
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
      id="about"
      ref={sectionRef}
      className="py-20 md:py-28 bg-background-soft"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out badge-capsule mb-4">
            Physician Profile
          </span>
          <h2 className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out delay-100 text-2xl md:text-3xl font-semibold text-foreground mb-4">
            About Dr. Budhathoki
          </h2>
          <p className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out delay-200 text-foreground-muted">
            A fresh perspective in medicine with a commitment to patient care excellence.
          </p>
        </div>

        {/* Biography */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 mb-20">
          <div className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out delay-100">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-foreground">Clinical Philosophy</h3>
            </div>
            <div className="space-y-4 text-foreground-muted leading-relaxed pl-13">
              <p>
                Dr. Girwan Kumar Budhathoki is a dedicated Medical Officer with an MBBS degree, 
                committed to providing compassionate, patient-centered healthcare. His approach 
                combines thorough clinical evaluation with a genuine concern for each patient&apos;s 
                well-being.
              </p>
              <p>
                As a new medical professional, Dr. Budhathoki brings fresh knowledge and modern 
                medical practices to his practice. He emphasizes clear communication, preventive 
                care, and building trusting relationships with his patients.
              </p>
            </div>
          </div>
          
          <div className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out delay-200">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-foreground">Areas of Focus</h3>
            </div>
            <ul className="space-y-3 pl-13">
              {focusAreas.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-foreground-muted">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5" aria-hidden="true">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Timeline - Medical Style */}
        <div className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out delay-300">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-foreground">Education & Career</h3>
          </div>
          
          <div className="relative pl-5">
            {/* Timeline line - Pill shaped */}
            <div className="absolute left-8 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b from-primary via-primary-light to-primary/30" aria-hidden="true" />
            
            <div className="space-y-6">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className="relative flex gap-6 group"
                >
                  {/* Year Pill */}
                  <div className="flex-shrink-0 w-24 pt-1">
                    <span className="inline-flex items-center px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full">
                      {item.year}
                    </span>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="absolute left-[27px] top-3 w-3 h-3 rounded-full bg-primary border-2 border-background group-hover:scale-125 transition-transform" aria-hidden="true" />
                  
                  {/* Content Card */}
                  <div className="flex-1 pb-6">
                    <div className="p-5 bg-background rounded-2xl border border-border group-hover:border-primary/30 group-hover:shadow-md transition-all">
                      <h4 className="font-medium text-foreground mb-1">{item.title}</h4>
                      <p className="text-sm text-foreground-subtle">{item.description}</p>
                    </div>
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
        .pl-13 {
          padding-left: 3.25rem;
        }
      `}</style>
    </section>
  );
}
