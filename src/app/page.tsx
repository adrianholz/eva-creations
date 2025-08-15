"use client";

import { PageContainer } from "@/components/containers";
import { CircularRotatingText } from "@/components/circular-text";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";

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
        <div className="flex flex-col justify-center items-center w-full max-w-[550px] mx-auto">
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

        <h2 className="text-center text-2xl max-w-[450px] mx-auto leading-relaxed font-medium">
          I make clothes, jewelry, and some other cool things, also commissions
          :)
        </h2>

        <Swiper speed={1200} slidesPerView={1} loop={true}>
          <SwiperSlide>
            <div className="flex w-full items-center justify-center gap-4 flex-col">
              <Image
                src="/clothes/dark-wash-1.webp"
                alt="Dark Wash"
                width={450}
                height={450}
                className="object-contain rounded-2xl"
              />
              <Image
                src="/clothes/dark-wash-2.webp"
                alt="Dark Wash"
                width={450}
                height={450}
                className="object-contain rounded-2xl"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex w-full items-center justify-center gap-4 flex-col">
              <Image
                src="/clothes/cherry-sweater-1.webp"
                alt="Cherry Sweather"
                width={450}
                height={450}
                className="object-contain rounded-2xl"
              />
              <Image
                src="/clothes/cherry-sweater-2.webp"
                alt="Cherry Sweather"
                width={450}
                height={450}
                className="object-contain rounded-2xl"
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flex w-full items-center justify-center gap-4 flex-col">
              <Image
                src="/clothes/greek-myth-1.webp"
                alt="Greek Myth"
                width={450}
                height={450}
                className="object-contain rounded-2xl"
              />
              <Image
                src="/clothes/greek-myth-2.webp"
                alt="Greek Myth"
                width={450}
                height={450}
                className="object-contain rounded-2xl"
              />
            </div>
          </SwiperSlide>
        </Swiper>

        <Link
          href="https://www.instagram.com/eva.s_creations/"
          target="_blank"
          className="flex flex-col items-center justify-center gap-2"
        >
          <Image
            src="/instagram.svg"
            alt="Instagram"
            width={50}
            height={50}
            className="object-contain rounded-2xl mx-auto"
          />
          <p className="text-center">Give me a follow :)</p>
        </Link>

        <p className="text-center text-sm pb-12">
          Copyright © {new Date().getFullYear()}{" "}
          <Link href="https://andrix.design" target="_blank">
            Andrix Design
          </Link>
        </p>
      </PageContainer>
    </>
  );
}
