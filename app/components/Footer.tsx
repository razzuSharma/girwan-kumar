"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-border pt-20 pb-10 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-6">
            <a href="#home" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </div>
              <span className="text-xl font-bold text-foreground tracking-tight">
                Dr. Girwan Kumar
              </span>
            </a>
            <p className="text-foreground-muted text-sm leading-relaxed max-w-sm font-light">
              Providing dedicated medical services at Nobel Medical College.
              Committed to the health and well-being of the Eastern Nepal community
              through clinical excellence and compassionate care.
            </p>
            <div className="flex items-center gap-4">
              {/* Social placeholders could go here */}
              <div className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center text-foreground-subtle hover:text-primary hover:border-primary transition-all cursor-pointer">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </div>
              <div className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center text-foreground-subtle hover:text-primary hover:border-primary transition-all cursor-pointer">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-foreground mb-6 uppercase tracking-widest text-xs">Directory</h4>
            <ul className="space-y-4 text-sm text-foreground-muted">
              <li><a href="#home" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">About Me</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Medical Services</a></li>
              <li><a href="#clinic" className="hover:text-primary transition-colors">Clinic Info</a></li>
            </ul>
          </div>

          {/* Contact Node */}
          <div>
            <h4 className="font-bold text-foreground mb-6 uppercase tracking-widest text-xs">Contact Information</h4>
            <ul className="space-y-4 text-sm text-foreground-muted font-light">
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                +977 9842598431
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                Girwan.kumar@gmail.com
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 text-primary mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                <span>Nobel Medical College,<br />Biratnagar, Nepal</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Banner */}
        <div className="border-t border-border pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-foreground-subtle font-medium uppercase tracking-[0.2em]">
            © {currentYear} Dr. Girwan Kumar Budhathoki. Clinical Portfolio.
          </p>
          <div className="flex items-center gap-8 text-xs text-foreground-subtle font-medium uppercase tracking-widest">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <p className="mt-10 text-[10px] text-foreground-subtle/50 text-center uppercase tracking-tighter leading-tight max-w-2xl mx-auto">
          Medical Disclaimer: The information provided on this website is for general educational purposes only and does not constitute medical advice, diagnosis, or treatment. Always seek the advice of a physician or other qualified health provider with any questions you may have regarding a medical condition.
        </p>
      </div>

      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-1/4 h-full bg-primary/5 blur-[100px] -z-10" />
    </footer>
  );
}
