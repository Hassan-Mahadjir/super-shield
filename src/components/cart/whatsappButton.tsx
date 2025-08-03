// components/WhatsappButton.tsx
"use client";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsappButton() {
  return (
    <Link
      href="https://wa.me/218918358796"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 bg-red-500 hover:bg-red-600 text-white p-4 rounded-full shadow-lg w-16 h-16 flex items-center justify-center"
    >
      <FaWhatsapp width={40} height={40} className="w-full h-full" />
    </Link>
  );
}
