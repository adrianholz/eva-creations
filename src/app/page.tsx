"use client";

import { PageContainer } from "@/components/containers";
import { CircularRotatingText } from "@/components/circular-text";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const calculateScale = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 640) {
        setScale(1); // Full size (550px max-width)
      } else {
        // Scale down proportionally when width < 640px
        const scaleFactor = screenWidth / 640;
        setScale(scaleFactor);
      }
    };

    // Calculate initial scale
    calculateScale();

    // Add resize listener
    window.addEventListener("resize", calculateScale);

    // Cleanup
    return () => window.removeEventListener("resize", calculateScale);
  }, []);

  return (
    <>
      <PageContainer>
        <div className="flex flex-col justify-center items-center w-full max-w-[550px] mx-auto space-y-8">
          {/* Circular rotating text */}

          <div
            className="relative"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "center",
            }}
          >
            <Image
              src="/evas-hair.svg"
              alt="Eva's Hair"
              width={450}
              height={450}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-5"
            />
            <Image
              src="/evas-glasses.svg"
              alt="Eva's Glasses"
              width={275}
              height={275}
              className="absolute top-52 right-10 z-10 animate-float-rotate"
            />
            <CircularRotatingText
              text="EVA CREATIONS"
              size={580}
              tag="h1"
              className="z-[-1]"
              gradientColors={{
                start: "#b9851f", // violet-500
                end: "#674922", // cyan-500
              }}
            />
          </div>
        </div>
      </PageContainer>
    </>
  );
}
