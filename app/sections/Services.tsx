"use client";

import { useEffect, useRef } from "react";

const services = [
  {
    title: "Primary Care & Annual Physicals",
    description: "Comprehensive annual examinations including health screenings, risk assessments, and personalized wellness planning for adults of all ages.",
    icon: "clipboard",
  },
  {
    title: "Chronic Disease Management",
    description: "Ongoing care coordination for conditions including hypertension, diabetes, heart disease, and respiratory disorders with evidence-based treatment protocols.",
    icon: "activity",
  },
  {
    title: "Preventive Medicine",
    description: "Vaccination programs, cancer screenings, cardiovascular risk assessments, and lifestyle counseling to prevent disease before it occurs.",
    icon: "shield",
  },
  {
    title: "Acute Illness Care",
    description: "Diagnosis and treatment of sudden illnesses including infections, injuries, and other urgent medical concerns with same-day appointments available.",
    icon: "thermometer",
  },
  {
    title: "Geriatric Medicine",
    description: "Specialized care for older adults focusing on medication management, fall prevention, cognitive health, and maintaining quality of life.",
    icon: "users",
  },
  {
    title: "Health Consultations",
    description: "In-depth discussions about symptoms, test results, treatment options, and referrals to specialists when specialized care is indicated.",
    icon: "message-circle",
  },
];

const iconPaths: Record<string, string> = {
  clipboard: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
  activity: "M22 12h-4l-3 9L9 3l-3 9H2",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  thermometer: "M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z",
  users: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  "message-circle": "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z",
};

export default function Services() {
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
      id="services"
      ref={sectionRef}
      className="py-20 md:py-28 bg-background"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out badge-capsule mb-4">
            Medical Services
          </span>
          <h2 className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out delay-100 text-2xl md:text-3xl font-semibold text-foreground mb-4">
            Specializations & Services
          </h2>
          <p className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out delay-200 text-foreground-muted">
            Comprehensive internal medicine services for adult patients, from routine preventive care to complex medical management.
          </p>
        </div>

        {/* Services Grid - Medical Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out group card-medical"
              style={{ transitionDelay: `${(index + 2) * 100}ms` }}
            >
              {/* Icon - Pill Shape */}
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:scale-110 transition-all duration-300" aria-hidden="true">
                <svg
                  className="w-5 h-5 text-primary group-hover:text-white transition-colors"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={iconPaths[service.icon]} />
                </svg>
              </div>
              
              <h3 className="text-base font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-foreground-subtle leading-relaxed">
                {service.description}
              </p>
              
              {/* Learn More Link */}
              <div className="mt-4 pt-4 border-t border-border">
                <a 
                  href="#contact" 
                  className="inline-flex items-center text-sm font-medium text-primary hover:text-primary-dark transition-colors"
                >
                  Learn more
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out delay-500 mt-12 text-center">
          <p className="text-foreground-subtle mb-4">Need a service not listed here?</p>
          <a href="#contact" className="btn-pill btn-pill-outline">
            Contact for Consultation
          </a>
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
