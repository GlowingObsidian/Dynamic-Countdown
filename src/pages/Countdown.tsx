import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  CalendarDays,
  Clock,
  PartyPopper,
  Share2,
} from "lucide-react";
import { gradientOptions } from "@/services/palette";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

function FloatingEmojis({ emojis }: { emojis: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const emojiList = Array.from(emojis);
    const particles: Array<{
      x: number;
      y: number;
      emoji: string;
      speed: number;
      angle: number;
      spin: number;
    }> = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        emoji: emojiList[Math.floor(Math.random() * emojiList.length)],
        speed: 0.5 + Math.random() * 2,
        angle: Math.random() * 360,
        spin: (Math.random() - 0.5) * 0.02,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.angle += p.spin;
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed - 0.5; // Slight upward drift

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.font = "40px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.emoji, 0, 0);
        ctx.restore();
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [emojis]);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
  );
}

function Countdown() {
  const { toast } = useToast();

  const deserialize = (str: string) => {
    const [n, de, f, d, mo, y, h, m, s, e, b] = atob(str).split("|");
    return {
      n,
      de,
      f,
      d: +d,
      mo: +mo,
      y: +y,
      h: +h,
      m: +m,
      s: +s,
      e: decodeURIComponent(e),
      b,
    };
  };
  const queryParams = new URLSearchParams(window.location.search);
  const decodedParams = deserialize(queryParams.get("p") || "");

  const event = decodedParams.n;
  const description = decodedParams.de;
  const finish = decodedParams.f;
  const day = decodedParams.d;
  const month = decodedParams.mo;
  const year = decodedParams.y;
  const hour = decodedParams.h || 0;
  const minute = decodedParams.m || 0;
  const second = decodedParams.s || 0;
  const emojis = decodedParams.e;
  const bgColor = Number(decodedParams.b) || 0;

  const targetDate = new Date(year, month - 1, day, hour, minute, second);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      return null; // Countdown over
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor(((difference / 1000) * 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  });

  const handleShare = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        toast({
          title: "Link Copied!",
          description: "The countdown link has been copied to your clipboard.",
        });
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        toast({
          title: "Sharing Failed",
          description: "Unable to copy the link. Please try again.",
          variant: "destructive",
        });
      });
  };

  return (
    <>
      <div
        className={`min-h-screen bg-gradient-to-r ${gradientOptions[bgColor].value} flex items-center justify-center p-4 overflow-hidden relative`}
      >
        <FloatingEmojis emojis={emojis} />

        <Card className="w-full max-w-4xl mx-auto overflow-hidden relative z-10 bg-white bg-opacity-10 backdrop-blur-lg border-0">
          <CardContent className="p-8 sm:p-12">
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                {event}
              </h1>
              <div className="flex items-center justify-center text-white space-x-4">
                <CalendarDays className="w-5 h-5" />
                <span>{targetDate.toLocaleDateString("en-GB")}</span>
                <Clock className="w-5 h-5 ml-4" />
                <span>
                  {targetDate.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>

            {timeLeft === null ? (
              <div className="text-center">
                <PartyPopper className="w-24 h-24 mx-auto text-yellow-300 animate-bounce" />
                <h2 className="text-3xl sm:text-4xl font-bold text-white mt-6 mb-4">
                  The Event Has Started!
                </h2>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mb-12">
                {Object.entries(timeLeft).map(([label, value]) => (
                  <div key={label} className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                    <div className="relative flex flex-col items-center justify-center bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6 h-full">
                      <Sparkles className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-yellow-300 w-6 h-6" />
                      <div className="text-5xl sm:text-6xl font-bold text-white mb-2 drop-shadow-md">
                        {value.toString().padStart(2, "0")}
                      </div>
                      <div className="text-sm text-white uppercase tracking-wide">
                        {label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="text-center">
              <p className="text-xl text-white italic drop-shadow-md mb-6">
                {timeLeft === null ? finish : description}
              </p>
              <Button
                onClick={handleShare}
                variant="secondary"
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Countdown
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Toaster />
    </>
  );
}

export default Countdown;
