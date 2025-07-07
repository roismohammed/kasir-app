import React from "react";
import Footer from "~/components/footer";
import Navbar from "~/components/navbar";

export default function GuestLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <div className="pt-">
        {children}
      </div>
      <div className="-mt-">
        <Footer />
      </div>
    </div>
  )
}
