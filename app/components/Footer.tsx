"use client";

import ThemeToggle from "./ThemeToggle";
import { AccentColorPicker } from "@razzusharma/accent-theme";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Doctor Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              {/* Medical cross icon */}
              <div className="relative w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-primary-light"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </div>
              <div>
                <span className="font-semibold text-background">Dr. Girwan Kumar Budhathoki</span>
                <p className="text-[10px] text-background/60 tracking-wide">INTERNAL MEDICINE</p>
              </div>
            </div>
            <p className="text-sm text-background/70 leading-relaxed max-w-sm mb-6">
              Board-certified internal medicine physician providing comprehensive 
              adult healthcare with a focus on preventive medicine and chronic 
              disease management.
            </p>
            
            {/* Theme Settings in Footer - Using v2.0.1 pre-built components */}
            <div className="flex flex-wrap items-center gap-4 p-3 rounded-2xl bg-background/5 border border-background/10">
              {/* Theme Toggle */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-background/50">Mode</span>
                <ThemeToggle />
              </div>
              
              {/* Divider */}
              <div className="w-px h-6 bg-background/20" />
              
              {/* Accent Color Picker - Using the new pre-built dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-background/50">Accent</span>
                <AccentColorPicker 
                  variant="dropdown" 
                  size="sm"
                  label=""
                  showColorName={false}
                />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium mb-4 text-background/90">Quick Links</h4>
            <ul className="space-y-2 text-sm text-background/60">
              <li>
                <a href="#about" className="hover:text-primary-light transition-colors inline-flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-background/40 group-hover:bg-primary-light transition-colors" />
                  About Dr. Budhathoki
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-primary-light transition-colors inline-flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-background/40 group-hover:bg-primary-light transition-colors" />
                  Services
                </a>
              </li>
              <li>
                <a href="#qualifications" className="hover:text-primary-light transition-colors inline-flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-background/40 group-hover:bg-primary-light transition-colors" />
                  Qualifications
                </a>
              </li>
              <li>
                <a href="#clinic" className="hover:text-primary-light transition-colors inline-flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-background/40 group-hover:bg-primary-light transition-colors" />
                  Clinic Information
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-primary-light transition-colors inline-flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-background/40 group-hover:bg-primary-light transition-colors" />
                  Book Appointment
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium mb-4 text-background/90">Contact</h4>
            <address className="not-italic text-sm text-background/60 space-y-2">
              <p>Nobel Medical College & Teaching Hospital</p>
              <p>Kanchanbari, Biratnagar</p>
              <p>Morang District, Nepal</p>
              <p className="pt-2">
                <a href="tel:+9779842598431" className="hover:text-primary-light transition-colors">
                  +977 9842598431
                </a>
              </p>
              <p>
                <a href="mailto:Girwan.kumar@gmail.com" className="hover:text-primary-light transition-colors">
                  Girwan.kumar@gmail.com
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-background/50">
              {currentYear} Dr. Girwan Kumar Budhathoki. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-background/50">
              <a href="#" className="hover:text-primary-light transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary-light transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-primary-light transition-colors">Accessibility</a>
            </div>
          </div>
          <p className="text-xs text-background/40 mt-4 text-center md:text-left">
            This website is for informational purposes only and does not constitute medical advice. 
            Please consult with a healthcare provider for personal medical concerns.
          </p>
        </div>
      </div>
    </footer>
  );
}
