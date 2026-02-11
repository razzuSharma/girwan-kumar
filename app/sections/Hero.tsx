"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

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
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".fade-up");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-[90vh] flex items-center pt-28 pb-20 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="relative z-10 text-center lg:text-left order-2 lg:order-1">
            <div className="fade-up opacity-0 translate-y-4 mb-6 inline-block">
              <span className="badge-capsule">
                <span className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse" />
                Accepting New Patients
              </span>
            </div>

            <h1 className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out delay-100 text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
              Compassionate Care for Your <br />
              <span className="text-primary italic">Long-Term Health</span>
            </h1>

            <p className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out delay-200 text-lg md:text-xl text-foreground-muted mb-10 max-w-2xl mx-auto lg:mx-0 font-light">
              Dr. Girwan Kumar Budhathoki provides expert internal medicine services
              with a personal touch. Dedicated to diagnosis, treatment, and
              prevention of adult diseases.
            </p>

            <div className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out delay-300 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <a href="#contact" className="btn-pill btn-pill-primary px-8 py-4 w-full sm:w-auto">
                Schedule Appointment
              </a>
              <a href="#about" className="btn-pill bg-white text-foreground-muted border border-border hover:border-primary/30 px-8 py-4 w-full sm:w-auto shadow-sm">
                Learn More
              </a>
            </div>

            <div className="fade-up opacity-0 translate-y-4 transition-all duration-700 ease-out delay-500 mt-12 grid grid-cols-3 gap-8 border-t border-border/50 pt-8 max-w-lg mx-auto lg:mx-0">
              <div>
                <p className="text-2xl font-bold text-primary">5+</p>
                <p className="text-[10px] text-foreground-subtle uppercase tracking-widest font-semibold">Years Exp.</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">MBBS</p>
                <p className="text-[10px] text-foreground-subtle uppercase tracking-widest font-semibold">Degree</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">100%</p>
                <p className="text-[10px] text-foreground-subtle uppercase tracking-widest font-semibold">Care</p>
              </div>
            </div>
          </div>

          {/* Image Content */}
          <div className="relative order-1 lg:order-2">
            <div className="fade-up opacity-0 translate-y-4 transition-all duration-1000 ease-out relative z-10 max-w-md mx-auto">
              {/* Soft Background Blob */}
              <div className="absolute inset-0 bg-primary/10 blur-[80px] rounded-full -z-10 animate-pulse" />

              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/Girwan.png"
                  alt="Dr. Girwan Kumar Budhathoki"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Floating Info Cards */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-border animate-float max-w-[160px]">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-foreground">Clinic Active</span>
                </div>
                <p className="text-[10px] text-foreground-muted">Trustworthy medical guidance for every patient.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
