"use client";

const icons = [
    { id: 1, type: "heart", top: "10%", left: "5%", size: 40, delay: 0 },
    { id: 2, type: "stethoscope", top: "40%", left: "85%", size: 60, delay: 2 },
    { id: 3, type: "dna", top: "70%", left: "10%", size: 50, delay: 4 },
    { id: 4, type: "cross", top: "20%", left: "80%", size: 30, delay: 1 },
    { id: 5, type: "pulse", top: "85%", left: "75%", size: 45, delay: 5 },
    { id: 6, type: "heart", top: "50%", left: "15%", size: 35, delay: 3 },
];

const IconSVG = ({ type }: { type: string }) => {
    switch (type) {
        case "heart":
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
            );
        case "stethoscope":
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4.8 2.3c0-.5-.4-.9-.9-.9-.5 0-.9.4-.9.9v1.8c0 2.6 1.1 5.1 3.1 6.8-.7.8-1.1 1.8-1.1 2.9v1.8c0 1.2.5 2.3 1.4 3.1-.9 1.4-1.4 3.1-1.4 4.8v.5h1.8v-.5c0-1.8.8-3.4 2-4.5.4.3.9.4 1.4.4s1-.1 1.4-.4c1.2 1.1 2 2.7 2 4.5v.5h1.8v-.5c0-1.7-.5-3.4-1.4-4.8.9-.8 1.4-1.9 1.4-3.1v-1.8c0-1.1-.4-2.1-1.1-2.9 2-1.7 3.1-4.2 3.1-6.8V2.3c0-.5-.4-.9-.9-.9-.5 0-.9.4-.9.9v1.8c0 3-1.6 5.8-4.3 7.3V9c0-2.8-2.2-5-5-5s-5 2.2-5 5v2.4c-2.7-1.5-4.3-4.3-4.3-7.3V2.3z" />
                    <path d="M12 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                </svg>
            );
        case "dna":
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M8 3c0 4.4 3.6 8 8 8s8-3.6 8-8" />
                    <path d="M16 21c0-4.4-3.6-8-8-8s-8 3.6-8 8" />
                    <path d="M3 8c4.4 0 8 3.6 8 8s-3.6 8-8 8" />
                    <path d="M21 16c-4.4 0-8-3.6-8-8s3.6-8 8-8" />
                </svg>
            );
        case "cross":
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 5v14M5 12h14" />
                </svg>
            );
        case "pulse":
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
            );
        default:
            return null;
    }
};

export default function MedicalBackground() {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* ECG Line */}
            <div className="ecg-line top-1/4 opacity-[0.05]" />
            <div className="ecg-line top-2/3 opacity-[0.03]" style={{ animationDelay: "-4s" }} />

            {/* Floating Icons */}
            {icons.map((icon) => (
                <div
                    key={icon.id}
                    className="medical-bg-icon"
                    style={{
                        top: icon.top,
                        left: icon.left,
                        width: icon.size,
                        height: icon.size,
                        animationDelay: `${icon.delay}s`,
                        opacity: 0.05,
                    }}
                >
                    <IconSVG type={icon.type} />
                </div>
            ))}

            {/* Subtle Gradients */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-accent/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>
    );
}
