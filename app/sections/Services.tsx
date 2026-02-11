"use client";

import { useEffect, useRef } from "react";

const services = [
  {
    title: "Primary Care & Wellness",
    description: "Comprehensive annual examinations including health screenings, risk assessments, and personalized wellness planning.",
    icon: "heart"
  },
  {
    title: "Chronic Disease Control",
    description: "Ongoing management for hypertension, diabetes, and respiratory disorders with evidence-based medical protocols.",
    icon: "activity"
  },
  {
    title: "Preventive Screenings",
    description: "Early detection programs, cardiovascular risk assessments, and lifestyle counseling to maintain long-term vitality.",
    icon: "shield"
  },
  {
    title: "Acute Care Services",
    description: "Rapid diagnosis and professional treatment for sudden illnesses, infections, and urgent medical concerns.",
    icon: "thermometer"
  },
  {
    title: "Geriatric Support",
    description: "Specialized care for older adults focusing on cognitive health, mobility, and effective medication management.",
    icon: "users"
  },
  {
    title: "Medical Consultations",
    description: "In-depth discussions regarding symptoms, test results, and optimized treatment options for better clarity.",
    icon: "message-circle"
  },
];

const IconSVG = ({ type }: { type: string }) => {
  switch (type) {
    case "heart":
      return <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />;
    case "activity":
      return <path d="M22 12h-4l-3 9L9 3l-3 9H2" />;
    case "shield":
      return <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />;
    case "thermometer":
      return <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />;
    case "users":
      return <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>;
    case "message-circle":
      return <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />;
    default:
      return null;
  }
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
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".fade-up");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-24 bg-background/50 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="fade-up opacity-0 translate-y-4 mb-4">
            <span className="badge-capsule">Our Expertise</span>
          </div>
          <h2 className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out delay-100 text-3xl md:text-5xl font-bold text-foreground mb-6">
            Comprehensive <span className="text-primary">Medical Services</span>
          </h2>
          <p className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out delay-200 text-foreground-muted text-lg font-light">
            Dedicated to improving the quality of life through professional and
            patient-centered internal medicine care.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out group card-clinical"
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <IconSVG type={service.icon} />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-foreground-muted leading-relaxed font-light mb-8">
                {service.description}
              </p>

              <a
                href="#contact"
                className="inline-flex items-center text-sm font-bold text-primary group-hover:gap-2 transition-all"
              >
                Learn More
                <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
