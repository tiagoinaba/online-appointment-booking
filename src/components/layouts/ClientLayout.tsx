import React from "react";

interface CLProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: CLProps) {
  return (
    <div className="flex flex-col">
      <nav className="flex justify-center bg-zinc-800 px-4 py-2 text-white shadow">
        <span className="mr-auto select-none text-lg font-bold tracking-tighter text-zinc-400">
          TIME<span className="text-white">KEEPER</span>
        </span>
        <div className="mr-auto self-center">
          <a href="#" className="font-bold">
            Home
          </a>
          <a href="#" className="font-bold">
            Home
          </a>
          <a href="#" className="font-bold">
            Home
          </a>
        </div>
      </nav>
      {children}
    </div>
  );
}
