import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => (
  <a
    href="https://wa.me/17322685112"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-24 right-4 md:right-6 z-40 h-12 w-12 md:h-14 md:w-14 rounded-full bg-accent text-accent-foreground shadow-lg flex items-center justify-center hover:scale-110 transition-transform animate-fade-in"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle className="h-6 w-6" />
  </a>
);

export default WhatsAppButton;
