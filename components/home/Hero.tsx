import { ArrowRightIcon } from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import particle from "@/public/particle.png";
import Link from "next/link";

export const Hero = () => {
  return (
    <div
      className="relative md:mt-5 w-full bg-cover bg-no-repeat bg-center flex items-center justify-center px-4"
      style={{
        backgroundImage: `url(${particle.src})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-6xl text-center flex flex-col items-center space-y-8">
        {/* Badge */}
        <div className="flex items-center border border-white/70 rounded-full shadow-[0px_24px_24px_#534ba024] backdrop-blur-md px-2 py-1">
          <div className="bg-blue-700 text-white text-sm px-3 py-1 rounded-full shadow">
            New
          </div>
          <div className="ml-3 text-[#131313] text-xs flex items-center">
            Now live in your city
            <ArrowRightIcon className="ml-2 w-4 h-4" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2f2b43] leading-tight">
          Bringing <span className="text-blue-700">Mobiles & Repairs</span>,
          <br className="hidden sm:block" />
          To Your Local Area
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg text-[#6871a2] max-w-2xl leading-relaxed">
          Search mobile accessories, book repair services, and more with Bhagyawanti Mobile.
          Just ₹5 to lock your item — verified store, 100% availability guaranteed.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center">
          <Link href="/products">
            <Button className="bg-blue-700 px-6 py-3 rounded-full text-white font-semibold text-base w-full sm:w-auto">
              Book Item Now
            </Button>
          </Link>
          <Link href="/stores">
            <Button
              variant="outline"
              className="px-6 py-3 border border-[#D9D9D9] rounded-full text-[#6B7280] font-semibold text-base w-full sm:w-auto"
            >
              Explore Stores
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
