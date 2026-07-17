import React from "react";
import Footer from "~/components/footer";
import Navbar from "~/components/navbar";

export default function GuestLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-0">
      <Navbar />
       {children}
        <Footer />
    </div>
  )
}
