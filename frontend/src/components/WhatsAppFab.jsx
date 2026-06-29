export default function WhatsAppFab() {
  const number = "912427255376"; // 02427-255376 in intl format
  const msg = encodeURIComponent("Hello, I have an admission enquiry for Jijamata Private ITI, Bhenda.");
  return (
    <a
      href={`https://wa.me/${number}?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="whatsapp-fab"
      className="fixed bottom-6 right-6 z-50 group flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white pl-4 pr-5 py-3.5 rounded-full shadow-2xl transition-transform hover:scale-105"
      aria-label="Chat on WhatsApp"
    >
      <i className="fa-brands fa-whatsapp text-2xl" />
      <span className="hidden md:inline font-semibold text-sm">Chat on WhatsApp</span>
      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#25D366] rounded-full animate-ping" />
    </a>
  );
}
