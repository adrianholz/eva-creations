import React from "react";

interface CircularRotatingTextProps {
  text: string;
  size?: number;
  className?: string;
  tag?: React.ElementType;
  gradientColors?: {
    start: string;
    end: string;
  };
}

export function CircularRotatingText({
  text,
  size = 200,
  className = "",
  tag: Tag = "div",
  gradientColors = {
    start: "#a855f7", // purple-500
    end: "#3b82f6", // blue-500
  },
}: CircularRotatingTextProps) {
  const radius = size / 2 - 50; // Reduced radius (was -30, now -50)
  const circumference = 2 * Math.PI * radius;

  // Force exactly 3 repetitions with spacing
  const textWithSpacing = `${text}   `; // Three spaces for better separation
  const fullText = textWithSpacing.repeat(3); // Exactly 3 repetitions

  const uniqueId = React.useId();

  return (
    <Tag
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      aria-label={text}
      role={
        Tag === "h1" ||
        Tag === "h2" ||
        Tag === "h3" ||
        Tag === "h4" ||
        Tag === "h5" ||
        Tag === "h6"
          ? undefined
          : "heading"
      }
      aria-level={
        Tag === "h1" ||
        Tag === "h2" ||
        Tag === "h3" ||
        Tag === "h4" ||
        Tag === "h5" ||
        Tag === "h6"
          ? undefined
          : 1
      }
    >
      {/* Invisible text for SEO and screen readers */}
      <span className="sr-only" aria-hidden="false">
        {text}
      </span>

      {/* Visual rotating text */}
      <svg
        width={size}
        height={size}
        className="absolute inset-0"
        aria-hidden="true"
        role="presentation"
      >
        <defs>
          <path
            id={`circle-path-${uniqueId}`}
            d={`M ${size / 2}, ${
              size / 2
            } m -${radius}, 0 a ${radius},${radius} 0 1,1 ${
              radius * 2
            },0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
          />

          {/* Fixed gradient definition */}
          <linearGradient
            id={`fixed-gradient-${uniqueId}`}
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor={gradientColors.start} />
            <stop offset="100%" stopColor={gradientColors.end} />
          </linearGradient>

          {/* Mask using rotating text */}
          <mask id={`text-mask-${uniqueId}`}>
            <rect width={size} height={size} fill="black" />
            <g
              className="animate-spin"
              style={{
                animationDuration: "20s",
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                animationDirection: "reverse",
                transformOrigin: `${size / 2}px ${size / 2}px`,
              }}
            >
              <text
                className="font-lora uppercase font-semibold"
                style={{
                  fontSize: `${size * 0.1025}px`, // Increased from 0.08 to 0.12
                  fill: "white",
                  letterSpacing: `${size * 0.002}px`,
                }}
              >
                <textPath href={`#circle-path-${uniqueId}`} startOffset="0%">
                  {fullText}
                </textPath>
              </text>
            </g>
          </mask>
        </defs>

        {/* Fixed gradient background with text mask */}
        <rect
          width={size}
          height={size}
          fill={`url(#fixed-gradient-${uniqueId})`}
          mask={`url(#text-mask-${uniqueId})`}
        />
      </svg>
    </Tag>
  );
}
