"use client";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsappButton() {
  const phoneNumber = "966544136338";
  const message = "السلام عليكم👋 "; // Arabic message
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50"
    >
      <div className="relative w-16 h-16">
        {/* Pulsating glow background */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-400 via-red-500 to-red-600 animate-pulse-glow opacity-75"></div>

        {/* WhatsApp Button */}
        <div className="relative z-10 bg-red-500 hover:bg-red-600 text-white p-4 rounded-full shadow-lg w-16 h-16 flex items-center justify-center">
          <FaWhatsapp className="w-8 h-8" />
        </div>
      </div>
    </Link>
  );
}
