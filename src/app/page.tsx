"use client";
import Image from "next/image";
import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";

interface DecorativeShapeProps {
  type: "heart" | "star";
  className?: string;
}

const DecorativeShape: React.FC<DecorativeShapeProps> = ({
  type,
  className,
}) => {
  if (type === "heart") {
    return (
      <svg
        className={`w-8 h-8 ${className}`}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    );
  }
  return (
    <svg
      className={`w-8 h-8 ${className}`}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
};

const FloatingShapes = () => {
  return Array.from({ length: 20 }).map((_, i) => (
    <DecorativeShape
      key={i}
      type={i % 2 === 0 ? "heart" : "star"}
      className="absolute text-pink-300 opacity-0 floating-shape"
    />
  ));
};

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Helper function to wrap words in spans
    const wrapWords = (selector: string) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        const words = element.textContent?.split(" ") || [];
        element.innerHTML = words
          .map((word) => `<span class="inline-block">${word}&nbsp;</span>`)
          .join("");
      });
    };

    // Wrap words in spans
    wrapWords(".line-0 p, .line-text");

    // Animate decorative shapes
    const shapes = document.querySelectorAll(".floating-shape");
    shapes.forEach((shape) => {
      // Random initial positions
      gsap.set(shape, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * document.documentElement.scrollHeight,
      });

      // Floating animation
      gsap.to(shape, {
        y: `+=${Math.random() * 100 - 50}`,
        x: `+=${Math.random() * 100 - 50}`,
        rotation: Math.random() * 360,
        opacity: 0.6,
        duration: 2 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2,
      });
    });

    // Animate line-0 (Hello Pookie)
    gsap.from(".line-0 p span", {
      scrollTrigger: {
        trigger: ".line-0",
        start: "top center",
        end: "+=200",
        scrub: 1,
        toggleActions: "play none none reverse",
      },
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
    });

    // Animate each line container
    const lines = document.querySelectorAll(
      ".line-1, .line-2, .line-3, .line-4, .line-5"
    );

    lines.forEach((line) => {
      // Animate text words
      gsap.from(line.querySelectorAll(".line-text span"), {
        scrollTrigger: {
          trigger: line,
          start: "top center",
          end: "+=300",
          scrub: 1,
          toggleActions: "play none none reverse",
        },
        x: -100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out",
      });

      // Animate image wrapper
      const imageWrapper = line.querySelector('div[class*="image-wrapper"]');
      gsap.from(imageWrapper, {
        scrollTrigger: {
          trigger: line,
          start: "top center",
          end: "+=300",
          scrub: 1,
          toggleActions: "play none none reverse",
        },
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });
    });

    // Initial page fade in
    gsap.from("section", {
      opacity: 0,
      duration: 1.5,
      ease: "power2.out",
    });
  }, []);

  return (
    <section className="w-full bg-pink-200 text-black relative overflow-hidden">
      <FloatingShapes />
      <div className="container mx-auto px-4 flex flex-col gap-10 md:gap-20 w-full max-w-[800px] overflow-visible">
        <div className="line-0 flex items-center justify-center h-screen">
          <p className="text-4xl md:text-5xl lg:text-7xl m-0">Hello Pookie,</p>
        </div>

        <div className="line-1 flex flex-col md:flex-row items-center justify-center gap-5 md:gap-10 h-screen">
          <p className="line-text text-3xl md:text-4xl lg:text-5xl m-0 text-center md:text-left">
            Roses paint the morning sky,
          </p>
          <div className="line-1-image-wrapper relative w-72 md:w-96 h-44 md:h-56 rounded-full overflow-hidden">
            <Image
              src={"/line1.jpg"}
              className="object-cover"
              fill
              alt="image-1"
            />
          </div>
        </div>

        <div className="line-2 flex flex-col-reverse md:flex-row items-center justify-center gap-5 md:gap-10 h-screen">
          <div className="line-2-image-wrapper relative w-72 md:w-96 h-44 md:h-56 rounded-full overflow-hidden">
            <Image
              src={"/line2.jpg"}
              className="object-cover"
              fill
              alt="image-2"
            />
          </div>
          <p className="line-text text-3xl md:text-4xl lg:text-5xl text-center md:text-left">
            Your smile makes my heart take flight.
          </p>
        </div>

        <div className="line-3 flex flex-col md:flex-row items-center justify-center gap-5 md:gap-10 h-screen">
          <p className="line-text text-3xl md:text-4xl lg:text-5xl text-center md:text-left">
            Every day you catch my eye,
          </p>
          <div className="line-3-image-wrapper relative w-72 md:w-96 h-44 md:h-56 rounded-full overflow-hidden">
            <Image
              src={"/line3.jpg"}
              className="object-cover"
              fill
              alt="image-3"
            />
          </div>
        </div>

        <div className="line-4 flex flex-col-reverse md:flex-row items-center justify-center gap-5 md:gap-10 h-screen">
          <div className="line-4-image-wrapper relative w-72 md:w-96 h-44 md:h-56 rounded-full overflow-hidden">
            <Image
              src={"/line4.jpg"}
              className="object-cover"
              fill
              alt="image-4"
            />
          </div>
          <p className="line-text text-3xl md:text-4xl lg:text-5xl text-center md:text-left">
            In your presence all feels right
          </p>
        </div>

        <div className="line-5 flex flex-col md:flex-row items-center justify-center gap-5 md:gap-10 py-20 h-screen">
          <p className="line-text text-3xl md:text-4xl lg:text-5xl text-center md:text-left">
            Will you be my Valentine
          </p>
          <div className="line-5-image-wrapper relative w-72 md:w-96 h-44 md:h-56 rounded-full overflow-hidden">
            <Image
              src={"/line5.jpg"}
              className="object-cover"
              fill
              alt="image-5"
            />
          </div>
        </div>

        <div className="buttons relative z-10 flex flex-col sm:flex-row gap-3 items-center justify-center py-10">
          <button
            className="rounded-md px-6 md:px-10 py-3 md:py-4 border-2 text-xl md:text-2xl 
            border-pink-300 bg-pink-100 w-full sm:w-auto
            hover:bg-pink-300 hover:border-pink-400 hover:text-white
            active:bg-pink-400 active:scale-95
            focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2"
            onClick={() => router.push("/end")}
          >
            YES
          </button>
          <button
            className="rounded-md px-6 md:px-10 py-3 md:py-4 border-2 text-xl md:text-2xl 
            border-pink-300 bg-pink-100 w-full sm:w-auto
            hover:bg-pink-300 hover:border-pink-400 hover:text-white
            active:bg-pink-400 active:scale-95
            focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2"
            onClick={() => router.push("/end")}
          >
            OFC
          </button>
        </div>
      </div>
    </section>
  );
}
