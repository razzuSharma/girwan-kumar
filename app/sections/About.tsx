"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const timeline = [
  {
    year: "2024",
    title: "Medical Officer",
    description: "Currently serving as a Medical Officer at Nobel Medical College & Teaching Hospital, specializing in inpatient care and emergency medical management.",
  },
  {
    year: "2024",
    title: "MBBS Completion",
    description: "Successfully completed Bachelor of Medicine and Bachelor of Surgery, laying the foundation for clinical excellence and patient-centered care.",
  },
];

const focusAreas = [
  {
    title: "Patient-Centered Care",
    description: "Prioritizing the unique needs and values of each patient to ensure compassionate and effective treatment outcomes.",
    icon: "heart"
  },
  {
    title: "Clinical Excellence",
    description: "Committed to maintaining the highest standards of medical practice through continuous learning and evidence-based protocols.",
    icon: "award"
  },
  {
    title: "Preventive Medicine",
    description: "Focused on identifying risk factors early and implementing strategies to prevent chronic diseases before they develop.",
    icon: "shield"
  }
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
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".fade-up");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Bio */}
          <div className="relative">
            <div className="fade-up opacity-0 translate-y-4 mb-6">
              <span className="badge-capsule">Personal Journey</span>
            </div>
            <h2 className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out delay-100 text-3xl md:text-4xl font-bold text-foreground mb-8">
              A Dedication to <span className="text-primary">Clinical Excellence</span> & Compassion
            </h2>

            <div className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out delay-200 space-y-6 text-foreground-muted leading-relaxed">
              <p>
                As a Medical Officer at Nobel Medical College, my approach to medicine is rooted in the belief that every patient deserves not just clinical expertise, but genuine empathy and respect.
              </p>
              <p>
                My journey in healthcare began with a deep-seated desire to serve the community in Nepal. Since completing my MBBS, I have dedicated myself to providing comprehensive care that addresses both the physical and emotional aspects of health.
              </p>
            </div>

            <div className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out delay-300 mt-12 grid sm:grid-cols-3 gap-6">
              {focusAreas.map((area, index) => (
                <div key={index} className="p-5 rounded-2xl bg-white border border-border shadow-sm hover:border-primary/20 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      {area.icon === "heart" && <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />}
                      {area.icon === "award" && <><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></>}
                      {area.icon === "shield" && <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />}
                    </svg>
                  </div>
                  <h4 className="text-sm font-bold text-foreground mb-2">{area.title}</h4>
                  <p className="text-xs text-foreground-subtle leading-normal">{area.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Timeline */}
          <div className="lg:pl-8">
            <div className="fade-up opacity-0 translate-y-4 mb-6">
              <span className="badge-capsule bg-accent-light/10 text-accent">Career Timeline</span>
            </div>

            <div className="relative pl-8 border-l border-primary/20 space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className="relative fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full bg-white border-4 border-primary shadow-sm" />

                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-2">
                    <span className="text-primary font-bold tracking-tight">{item.year}</span>
                    <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                  </div>
                  <p className="text-sm text-foreground-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out delay-400 mt-16 p-8 rounded-[2.5rem] bg-gradient-to-br from-primary/5 to-accent/5 border border-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <p className="text-foreground italic font-medium relative z-10">
                "Medicine is not only a science; it is also an art. It does not consist of compounding pills and plasters; it deals with the very processes of life, which must be understood before they may be guided."
              </p>
              <p className="mt-4 text-xs font-bold text-primary tracking-widest uppercase">— Clinical Philosophy</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
