import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, CalendarDays, Clock, PartyPopper } from "lucide-react";

function Countdown() {
  const queryParams = new URLSearchParams(window.location.search);
  const decodedParams = JSON.parse(atob(queryParams.get("params") || ""));

  const event = decodedParams.name;
  const description = decodedParams.description;
  const finish = decodedParams.finish;
  const day = decodedParams.day;
  const month = decodedParams.month;
  const year = decodedParams.year;
  const hour = decodedParams.hour || 0;
  const minute = decodedParams.minute || 0;
  const second = decodedParams.second || 0;

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
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-4 overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-10 animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 20 + 5}px`,
              height: `${Math.random() * 20 + 5}px`,
              animationDuration: `${Math.random() * 20 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

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
            <p className="text-xl text-white italic drop-shadow-md">
              {timeLeft === null ? finish : description}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Countdown;
