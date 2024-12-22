import { useState, useEffect } from "react";

function Countdown({
  event,
  year,
  month,
  day,
  hour,
  minute,
  second,
}: {
  event: string;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}) {
  const targetDate = new Date(year, month - 1, day, hour, minute, second); // Month is 0-indexed
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

  if (!timeLeft) {
    return <h1>Countdown Over!</h1>;
  }

  return (
    <div>
      <p>{event}</p>
      <p>
        {timeLeft.days} Days {timeLeft.hours} Hours {timeLeft.minutes} Minutes{" "}
        {timeLeft.seconds} Seconds
      </p>
    </div>
  );
}

export default Countdown;
