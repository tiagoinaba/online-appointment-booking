import { Book, Contact, Home, Menu } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

interface CLProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: CLProps) {
  return (
    <div className="flex flex-col">
      <nav className="flex flex-col items-center justify-center gap-2 bg-zinc-800 px-4 py-2 text-white shadow sm:flex-row sm:px-8">
        <Link
          href="/"
          className="select-none text-2xl font-bold tracking-tighter text-zinc-400 sm:mr-auto"
        >
          TIME<span className="text-white">KEEPER</span>
        </Link>
      </nav>
      {children}
      <footer className="flex flex-col items-center justify-center gap-2 bg-zinc-800 px-4 py-4 text-sm text-zinc-300 shadow sm:px-8">
        <p>Gostaria de saber mais?</p>
        <p>Entre em contato!</p>
        <a href="https://wa.me/+5516997082400" target="_blank">
          +55(16)99708-2400
        </a>
        <p>tiago.inaba@gmail.com</p>
      </footer>
      <Toaster position="bottom-center" />
    </div>
  );
}
